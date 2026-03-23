---
id: "services-reseaux-linux"
title: "Services Réseaux Linux"
icon: "🌐"
---

<!-- SOMMAIRE FLOTTANT -->
<nav class="lesson-toc" aria-label="Sommaire de la leçon">
    <div class="lesson-toc__tab" aria-hidden="true">
        <span class="lesson-toc__tab-icon">📋</span>
        Plan
    </div>
    <div class="lesson-toc__body">
        <h3 class="lesson-toc__title">Sommaire</h3>
        <ol class="lesson-toc__list">
            <li><a href="#unite1">1. Interfaces Réseau</a>
                <ol>
                    <li><a href="#net-theory">Nommage prévisible</a></li>
                    <li><a href="#net-config">Configuration nmcli</a></li>
                    <li><a href="#net-context">Le double attachement</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Résolution Locale & Routage</a>
                <ol>
                    <li><a href="#route-theory">nsswitch, hostname et hosts</a></li>
                    <li><a href="#route-config">Manipulation de la table</a></li>
                    <li><a href="#route-context">Activation de l'ip_forward</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. NAT sous Linux</a>
                <ol>
                    <li><a href="#nat-theory">Translation d'adresses</a></li>
                    <li><a href="#nat-types">SNAT, DNAT et NAT 1:1</a></li>
                    <li><a href="#nat-context">Publication de services</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Administration Sécurisée (SSH)</a>
                <ol>
                    <li><a href="#ssh-theory">Séparation Client/Serveur</a></li>
                    <li><a href="#ssh-keys">Authentification par clés</a></li>
                    <li><a href="#ssh-context">Durcissement du service</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Infrastructure DHCP</a>
                <ol>
                    <li><a href="#dhcp-theory">Le protocole et ses ports</a></li>
                    <li><a href="#dhcp-config">isc-dhcp-server</a></li>
                    <li><a href="#dhcp-context">L'importance du Relay</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. Infrastructure DNS (BIND9)</a>
                <ol>
                    <li><a href="#dns-theory">Résolveur vs Autoritaire</a></li>
                    <li><a href="#dns-config">Configuration de zone</a></li>
                    <li><a href="#dns-context">Architecture de redondance</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Interfaces Réseau</h2>

<h3 id="net-theory">Théorie : Nommage prévisible</h3>
<p>Depuis Debian 9, Linux utilise un nommage prévisible des interfaces. Ce système garantit qu'une interface matérielle conservera toujours le même nom, qu'importe le moment où elle est branchée.</p>

| Préfixe | Type de connexion | Exemple |
| :--- | :--- | :--- |
| `en*` | Filaire (Ethernet) | `ens33` (PCI slot), `enp2s0` (PCI bus) |
| `wl*` | Sans fil (Wi-Fi) | `wlan0`, `wlp3s0` |
| `lo` | Boucle locale | `lo` (127.0.0.1) - Ne jamais modifier |

<h3 id="net-config">Concepts : nmcli vs /etc/network/interfaces</h3>
<p>Il existe deux philosophies pour gérer le réseau sous Debian/Ubuntu. Le choix de l'une impose de désactiver l'autre pour cette interface précise.</p>

#### Comparatif des méthodes

| Caractéristique | NetworkManager (nmcli) | /etc/network/interfaces |
| :--- | :--- | :--- |
| **Type** | Démon dynamique (service logiciel) | Configuration statique (fichier système) |
| **Usage cible** | Postes de travail et serveurs modernes. | Serveurs minimalistes ou architectures "old school". |
| **Avantage** | Gestion à chaud, détection automatique, CLI puissante. | Très léger, aucun service complexe en fond. |
| **Inconvénient** | Plus lourd en ressources. | Nécessite un redémarrage du service `networking`. |

> **Règle d'or du TSSR : Ne jamais mélanger les méthodes.**
> Si vous configurez une interface dans `/etc/network/interfaces`, NetworkManager doit l'ignorer. Si vous utilisez `nmcli`, le fichier interfaces doit rester vide pour cette carte. Mélanger les deux provoque des conflits d'IP, des pertes de routes et des comportements aléatoires indétectables. **Choisissez une méthode et tenez-vous-y jusqu'au bout.**

#### Option A : Modernité avec NetworkManager (nmcli)
C'est la méthode recommandée aujourd'hui. Elle permet de modifier la configuration sans couper l'intégralité du réseau.

```bash
# 1. Vérifier l'état des interfaces gérées
nmcli device status

# 2. Configurer une IP statique (Ex: 192.168.10.50/24)
nmcli connection modify "ens33" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.50/24 \
  ipv4.gateway 192.168.10.1 \
  ipv4.dns "192.168.10.3 8.8.8.8"

# 3. Appliquer immédiatement
nmcli connection up "ens33"
```

#### Option B : Classique avec /etc/network/interfaces
Utilisé sur les installations "Netinstall" ou minimales. La configuration est inscrite en dur.

```bash
# Édition du fichier : nano /etc/network/interfaces
auto ens33
iface ens33 inet static
    address 192.168.10.50
    netmask 255.255.255.0
    gateway 192.168.10.1
    dns-nameservers 192.168.10.3 8.8.8.8

# Appliquer (coupe et relance tout le service networking)
systemctl restart networking
```

<h3 id="net-context">Expertise : Le double attachement</h3>
<p>En entreprise, un routeur ou un proxy Linux possède généralement au minimum deux interfaces réseau ("double attachement"). L'une est tournée vers le réseau interne (LAN) et l'autre vers l'extérieur (WAN). Une erreur fatale courante est de configurer une <code>gateway</code> sur le réseau interne. <strong>Seule l'interface pointant vers Internet doit posséder une passerelle (gateway) par défaut.</strong></p>

</section>

<section id="unite2-content">
<h2 id="unite2">2. Résolution Locale & Routage</h2>

<h3 id="route-theory">Théorie : La table de résolution et de routage</h3>
<p>Avant d'interroger un serveur DNS, un système Linux vérifie toujours son fichier <code>/etc/hosts</code> pour la résolution de nom locale (suite logique définie dans <code>/etc/nsswitch.conf</code> avec "files dns"). Ensuite, pour envoyer les données, l'OS consulte sa <strong>table de routage</strong>.</p>

<h3 id="route-config">Concepts : Manipulation du routage</h3>
<p>La commande `ip route` supplante l'ancien utilitaire `route`.</p>

| Type de route | Outil technique | Rôle |
| :--- | :--- | :--- |
| **Par défaut** | `default via 192.168.10.1` | Le dernier recours pour quitter le réseau local. |
| **Réseau** | `10.56.0.0/16 via 192.168.10.254` | Axe les flux vers un autre VLAN interne connu. |

```bash
# Ajouter une route statique temporaire vers le réseau 10.56
ip route add 10.56.0.0/16 via 192.168.10.254

# Vérifier la table
ip route show
# Sortie attendue :
# default via 192.168.10.1 dev ens33 
# 10.56.0.0/16 via 192.168.10.254 dev ens33
```

<h3 id="route-context">Expertise : L'activation de l'ip_forward</h3>
<p>Un serveur Linux ordinaire jette les paquets qui ne lui sont pas explicitement destinés. Pour faire office de routeur et relayer le trafic entre ses interfaces, l'administrateur doit activer de manière persistante <code>net.ipv4.ip_forward=1</code> dans <code>/etc/sysctl.conf</code>. Une ligne souvent oubliée, source majeure des problèmes de joignabilité inter-sites.</p>

</section>

<section id="unite3-content">
<h2 id="unite3">3. NAT sous Linux</h2>

<h3 id="nat-theory">Théorie : Translation d'adresses</h3>
<p>Le NAT sert à traduire des adresses IP privées isolées en adresses IP publiques, afin de pouvoir naviguer sur le grand Internet. Cette technologie a sauvé l'IPv4 de la pénurie. Sa place est <strong>sur le pare-feu ou le routeur de l'entreprise</strong>.</p>

<h3 id="nat-types">Concepts : SNAT et DNAT via iptables</h3>

| Type | Chaîne iptables | Cas applicatif |
| :--- | :--- | :--- |
| **SNAT (Source)** | `POSTROUTING -j MASQUERADE` | Le réseau LAN sort sur Internet avec l'IP publique dynamique du routeur. |
| **DNAT (Destination)** | `PREROUTING -j DNAT` | Redirection d'un port public (80) vers un serveur privé. |
| **NAT 1:1** | Bidirectionnel | Un serveur qui nécessite de communiquer librement sur tous ses ports utilise une IP publique dédiée. |

<h3 id="nat-context">Expertise : Publication de DMZ</h3>
<p>Le proxy inverse ou le serveur Web est souvent confiné dans une zone démilitarisée (DMZ). Pour l'atteindre depuis le net, une règle DNAT est ajoutée au firewall Linux :<br><code>iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 172.16.0.50:80</code>.<br>L'internaute naviguera sur l'IP publique en toute transparence, et la base de données de l'entreprise restera intouchable, cachée derrière le NAT.</p>

</section>

<section id="unite4-content">
<h2 id="unite4">4. Administration Sécurisée (SSH)</h2>

<h3 id="ssh-theory">Théorie : La séparation Client/Serveur</h3>
<p>Le remplacement légitime de l'insécurisé protocole Telnet, SSH, crée un tunnel de commande entièrement chiffré de bout en bout. Sur Debian, la distinction de paquet est claire entre le listener réseau <code>openssh-server</code> (port 22) et l'outil natif de connexion <code>openssh-client</code>.</p>

<h3 id="ssh-keys">Concepts : Authentification par clés</h3>
<p>L'utilisation de paires de clés (publique/privée) contourne la majority des failles d'ingénierie sociale (brute force) :</p>

```bash
# 1. Génération de clé sur la machine technicien (client)
ssh-keygen -t ed25519 -C "admin@bureau"
# (Génère une clé id_ed25519 privée et id_ed25519.pub publique, dans ~/.ssh)

# 2. Exportation de la clé publique vers le conteneur cible "authorized_keys"
ssh-copy-id admin@192.168.10.10
# Sortie : "Number of key(s) added: 1"

# 3. Connexion au serveur (sans mot de passe si le daemon valide l'empreinte)
ssh admin@192.168.10.10
```

<h3 id="ssh-context">Expertise : Le durcissement du service (Hardening)</h3>
<p>Dans un schéma de production, l'accès direct en shell est votre plus grande porte dérobée. L'audit du <code>/etc/ssh/sshd_config</code> impose : l'interdiction de connexion pour le super-administrateur (<code>PermitRootLogin no</code>), le blocage radical des mots de passe triviaux en forçant la clé (<code>PasswordAuthentication no</code>) ainsi que la validation stricte des entrants via le paramètre décisif <code>AllowUsers</code>.</p>

</section>

<section id="unite5-content">
<h2 id="unite5">5. Infrastructure DHCP</h2>

<h3 id="dhcp-theory">Théorie : Le protocole et ses ports</h3>
<p>Pour l'attribution d'informations TCP/IP à son boot, un client envoie une sonde à l'aveugle, sous forme de Broadcast réseau. Ce protocole se formalise dans la fameuse équation DORA (Discover, Offer, Request, Acknowledge) pilotée en UDP par le port <strong>67</strong> (écoute sur serveur) et <strong>68</strong> (client).</p>

#### Schéma d'infrastructure DHCP Relay
<p>Le routeur bloque les broadcasts. Le relais permet de faire le pont entre un VLAN Client et un VLAN Serveur.</p>

```text
[ VLAN 20 : CLIENTS ]          [ VLAN 10 : SERVEURS ]
      (Broadcast)                    (Unicast)
   Client DHCP ----> [ RELAIS ] ----> Serveur DHCP
   192.168.20.x      (Routeur)        192.168.10.3
```

<h3 id="dhcp-config">Concepts : Installation et Configuration</h3>

#### Part 1 : Le Serveur (`isc-dhcp-server`)
```bash
# 1. Installation
apt install isc-dhcp-server

# 2. Définir l'interface d'écoute dans /etc/default/isc-dhcp-server
INTERFACESv4="ens33"

# 3. Éditer /etc/dhcp/dhcpd.conf
subnet 192.168.10.0 netmask 255.255.255.0 {
    range 192.168.10.100 192.168.10.200;
    option routers 192.168.10.1;
    option domain-name-servers 192.168.10.3;
    authoritative;
}
```

#### Part 2 : Le Relais (`isc-dhcp-relay`)
À installer sur la machine qui voit les deux réseaux (le routeur).
```bash
# 1. Installation
apt install isc-dhcp-relay

# 2. Configurer /etc/default/isc-dhcp-relay
SERVERS="192.168.10.3"         # IP du serveur DHCP réel
INTERFACES="ens33 ens34"       # Int. côté clients et int. côté serveur
```

<h3 id="dhcp-context">Expertise : Le diagnostic DHCP</h3>
<p>En production, si un client ne reçoit pas d'IP, le premier réflexe est de consulter les baux actifs sur le serveur : <code>cat /var/lib/dhcp/dhcpd.leases</code>. Si le fichier est vide malgré les requêtes, vérifiez que le firewall du serveur autorise bien l'UDP 67.</p>

</section>

<section id="unite6-content">
<h2 id="unite6">6. Infrastructure DNS (BIND9)</h2>

<h3 id="dns-theory">Théorie : Résolveur vs Autoritaire</h3>
<p>BIND9 peut endosser deux rôles radicalement différents selon sa configuration.</p>

#### Comparatif des Rôles

| Rôle | Fichier Clé | Usage |
| :--- | :--- | :--- |
| **Résolveur / Cache** | `named.conf.options` | Interroge le web (Root Hints) ou des forwarders pour le LAN. |
| **Autoritaire (Master)** | `named.conf.local` | Héberge la source de vérité pour un domaine (ex: demo.lan). |

<h3 id="dns-config">Concepts : Mise en place de zone</h3>

#### Étape 1 : Déclaration de la zone (Master)
Dans `/etc/bind/named.conf.local` :
```text
zone "demo.lan" {
    type master;
    file "/var/cache/bind/db.demo.lan";
};
```

#### Étape 2 : Création du fichier de zone
Exemple de `/var/cache/bind/db.demo.lan` :
```text
$TTL 86400
@   IN  SOA  ns1.demo.lan. admin.demo.lan. (2024032301 3600 900 604800 86400)
@   IN  NS   ns1.demo.lan.
ns1 IN  A    192.168.10.3
srv IN  A    192.168.10.20
www IN  CNAME srv.demo.lan.
```

#### Étape 3 : Zone Inverse (Reverse)
Permet de traduire 192.168.10.20 -> srv.demo.lan. Incontournable pour la sécurité des logs.
```text
zone "10.168.192.in-addr.arpa" {
    type master;
    file "/var/cache/bind/db.192.168.10";
};
```

<h3 id="dns-context">Expertise : Architecture de redondance</h3>
<p>Pour assurer la haute disponibilité, on déploie un serveur <strong>Secondaire (Slave)</strong>. Sur le Maître, on ajoute <code>allow-transfer { IP_ESCLAVE; };</code>. Sur l'Esclave, on définit <code>type slave; masters { IP_MAITRE; };</code>. BIND se chargera alors de synchroniser les zones automatiquement à chaque modification du numéro de série ("Serial") dans le fichier de zone.</p>

</section>
