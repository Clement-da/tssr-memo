---
id: "infra_reseaux"
title: "Infrastructure Réseaux"
icon: "🔧"
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
            <li><a href="#unite1">1. Configuration initiale (Cisco)</a>
                <ol>
                    <li><a href="#ios-modes">Les modes de l'IOS</a></li>
                    <li><a href="#basic-config">Sécurisation de base</a></li>
                    <li><a href="#save-config">Sauvegarde</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Commutation (Switching) & VLANs</a>
                <ol>
                    <li><a href="#vlan-theory">Théorie des VLANs</a></li>
                    <li><a href="#vlan-8021q">Le Tagging 802.1Q</a></li>
                    <li><a href="#mode-ports">Modes Access vs Trunk</a></li>
                    <li><a href="#vlan-inter-routing">Routage Inter-VLAN</a></li>
                    <li><a href="#config-vlan">Pratique & Commandes</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Routage IP</a>
                <ol>
                    <li><a href="#routing-logic">Théorie du routage</a></li>
                    <li><a href="#static-routing">Routage Statique</a></li>
                    <li><a href="#dynamic-routing">Routage Dynamique (OSPF)</a></li>
                    <li><a href="#diag-routing">Outils de diagnostic</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Réseaux Wi-Fi</a>
                <ol>
                    <li><a href="#wifi-theory">Principes du Wi-Fi</a></li>
                    <li><a href="#wifi-standards">Normes & Débits</a></li>
                    <li><a href="#wifi-security">Chiffrement (WPA2/WPA3)</a></li>
                    <li><a href="#wifi-arch">Architectures AP & WLC</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Sécurité : ACLs</a>
                <ol>
                    <li><a href="#acl-theory">Théorie du filtrage</a></li>
                    <li><a href="#acl-types">Standard vs Étendue</a></li>
                    <li><a href="#acl-rules">Règles & Application</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. NAT (Network Address Translation)</a>
                <ol>
                    <li><a href="#nat-purpose">Théorie du NAT</a></li>
                    <li><a href="#pat">Concept du PAT (Overload)</a></li>
                    <li><a href="#nat-config">Pratique & Commandes</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">Unité 1 : Configuration initiale & Fondamentaux Cisco</h2>

<h3 id="ios-modes">1. Les modes de l'IOS Cisco</h3>

L'administration d'un équipement Cisco se fait via une hiérarchie de modes de commande. Chaque mode offre des privilèges croissants :

- **Mode Utilisateur (User EXEC)** : `Router>` — Consultation limitée (stats basiques).
- **Mode Privilégié (Privileged EXEC)** : `Router#` — Vision complète du système et diagnostic. Nécessaire pour lancer la configuration. *Commande : `enable`*.
- **Mode Configuration Globale** : `Router(config)#` — Modification des paramètres qui impactent l'ensemble du châssis. *Commande : `configure terminal`*.
- **Sous-modes de configuration** : `Router(config-if)#` (spécifique à une interface), `Router(config-line)#` (spécifique aux lignes console ou virtuelles).

<h3 id="basic-config">2. Configuration de base (Sécurisation)</h3>

La première étape sur un équipement "neuf" est de le nommer et de verrouiller ses accès.

```cisco
Router> enable
Router# configure terminal
Router(config)# hostname R1-SITES-PROD
R1-SITES-PROD(config)# enable secret password123  ! Protège l'accès au mode Privilégié (hashé)
R1-SITES-PROD(config)# line console 0             ! Accès physique par câble console
R1-SITES-PROD(config-line)# password consolepwd
R1-SITES-PROD(config-line)# login
R1-SITES-PROD(config-line)# exit
R1-SITES-PROD(config)# service password-encryption ! Chiffre les mots de passe visibles en texte clair
```

<h3 id="save-config">3. Gestion de la configuration</h3>

Un équipement Cisco possède deux fichiers de configuration :
- **Running-config** : La configuration "en direct" stockée en RAM. Elle est **volantile** (perdue si le courant saute).
- **Startup-config** : La configuration de démarrage stockée en NVRAM.
- **Sauvegarder :** Pour pérenniser vos modifications, il faut copier la RAM vers la NVRAM : `copy running-config startup-config` (ou `write memory`).

</section>

<section id="unite2-content">
<h2 id="unite2">Unité 2 : Commutation (Switching) et VLANs</h2>

<h3 id="vlan-theory">1. Théorie : Pourquoi les VLANs ?</h3>

Un **VLAN (Virtual Local Area Network)** est un réseau local logique indépendant au sein d'une même infrastructure physique. Sans VLAN, tous les ports d'un switch appartiennent au même domaine de diffusion (Broadcast).

**Les enjeux majeurs :**
1. **Sécurité** : Isoler les flux sensibles (Comptabilité) des flux généraux (Visiteurs).
2. **Performance** : Réduire la taille des domaines de broadcast. Trop de diffusion ralentit le réseau (tempêtes de broadcast).
3. **Organisation** : Regrouper les utilisateurs par service métier plutôt que par emplacement géographique.

<h3 id="vlan-8021q">2. Le Tagging 802.1Q</h3>

Lorsqu'une trame doit passer d'un switch à un autre tout en conservant son identité VLAN, on utilise le protocole **IEEE 802.1Q**. 
Le switch ajoute une "étiquette" (Tag) de 4 octets dans l'en-tête Ethernet contenant le **VLAN ID** (de 1 à 4094).

<h3 id="mode-ports">3. Modes Access vs Trunk</h3>

- **Mode Access** : Utilisé pour connecter les stations de travail (PC, Imprimante, IP Phone). Le port appartient à **un seul VLAN**. La trame qui sort vers le PC n'est pas taguée.
- **Mode Trunk** : Utilisé pour les liaisons "inter-switch" ou "switch-routeur". Il permet de faire transiter **plusieurs VLANs** sur un seul câble physique grâce au tagging 802.1Q.

<h3 id="vlan-inter-routing">4. Routage Inter-VLAN (Router-on-a-Stick)</h3>

Par nature, deux VLANs ne peuvent pas communiquer entre eux (couche 2). Pour que la "Compta" parle à la "RH", il faut passer par un équipement de **couche 3** (Routeur ou Switch L3).
Le **Router-on-a-Stick** consiste à utiliser une seule interface physique sur le routeur, que l'on découpe en **sous-interfaces logiques** (ex: g0/0.10 pour le VLAN 10). Chaque sous-interface devient la passerelle par défaut de son VLAN.

<h3 id="config-vlan">5. Pratique : Commandes de configuration</h3>

```cisco
! 1. Création du VLAN dans la base de données
SW1(config)# vlan 10
SW1(config-vlan)# name COMPTABILITE

! 2. Affectation d'un port à un utilisateur (Mode Access)
SW1(config)# interface f0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10

! 3. Configuration de la liaison vers un autre Switch (Mode Trunk)
SW1(config)# interface g0/1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20

! 4. Configuration du routage sur le Routeur (Sous-interface)
R1(config)# interface g0/0.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.254 255.255.255.0
```

</section>

<section id="unite3-content">
<h2 id="unite3">Unité 3 : Routage IP</h2>

<h3 id="routing-logic">1. Théorie : Le rôle du routeur</h3>

Contrairement au switch (qui regarde les adresses MAC), le routeur travaille en **Couche 3** et utilise les **adresses IP**.
Son rôle est de déterminer le meilleur chemin pour acheminer un paquet vers un réseau distant. Pour cela, il dispose d'une **Table de Routage**.

**Logique de décision :**
1. Réception du paquet.
2. Lecture de l'IP Destination.
3. Correspondance avec la table de routage (recherche du masque le plus précis).
4. Réexpédition vers le **Next Hop** (prochain saut) ou l'interface de sortie.

<h3 id="static-routing">2. Routage Statique</h3>

L'administrateur définit manuellement les routes.
- **Avantages** : Très peu de ressources CPU, sécurité totale (pas d'échange de tables).
- **Inconvénient** : Aucune adaptation automatique en cas de coupure d'un lien.

```cisco
! ip route [Réseau_Distant] [Masque] [Adresse_IP_du_prochain_routeur]
R1(config)# ip route 10.0.2.0 255.255.255.0 192.168.1.2
```

<h3 id="dynamic-routing">3. Routage Dynamique (OSPF)</h3>

Les routeurs utilisent des protocoles (OSPF, RIP, EIGRP) pour construire et mettre à jour leurs tables automatiquement.
**OSPF (Open Shortest Path First)** est un protocole à "état de lien" : il cartographie tout le réseau et choisit le chemin le plus rapide.

```cisco
R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
```

<h3 id="diag-routing">4. Outils de diagnostic</h3>

- `show ip route` : Indispensable pour voir si la route est apprise (C=Connecté, S=Statique, O=OSPF).
- `ping` : Teste la connectivité de bout en bout (ICMP).
- `traceroute` : Affiche chaque saut (routeur) traversé pour atteindre la cible.

</section>

<section id="unite4-content">
<h2 id="unite4">Unité 4 : Réseaux Sans-Fil (Wi-Fi)</h2>

<h3 id="wifi-theory">1. Principes et Ondes</h3>

Le Wi-Fi (IEEE 802.11) transforme les données binaires en ondes radio. Contrairement au câble, le Wi-Fi est un média **partagé** et **Half-Duplex** (une seule personne parle à la fois sur une fréquence donnée).

**Fréquences principales :**
- **2.4 GHz** : Longue portée, traverse mieux les murs, mais très saturée (Bluetooth, micro-ondes, peu de canaux).
- **5 GHz** : Portée plus courte, mais débits bien plus élevés et beaucoup plus de canaux disponibles (moins d'interférences).
- **6 GHz** : Introduit avec le Wi-Fi 6E, offre une "autoroute" vide pour des débits extrêmes.

<h3 id="wifi-standards">2. Normes & Débits</h3>

| Norme | Nom commercial | Fréquences | Débit Max |
| :--- | :--- | :--- | :--- |
| **802.11n** | Wi-Fi 4 | 2.4 / 5 GHz | 600 Mbps |
| **802.11ac** | Wi-Fi 5 | 5 GHz | 3.4 Gbps |
| **802.11ax** | Wi-Fi 6 | 2.4 / 5 / 6 GHz | 9.6 Gbps |

<h3 id="wifi-security">3. Chiffrement et Sécurité</h3>

Puisque les ondes s'arrêtent rarement aux murs de l'entreprise, le chiffrement est **obligatoire**.
- **WPA2** : Utilise l'algorithme AES. C'est le standard actuel.
- **WPA3** : Plus sécurisé, remplace le handshake vulnérable de WPA2 et impose un chiffrement plus fort.
- **Mode Personnel (PSK)** : Une seule clé pour tout le monde (maison/petits bureaux).
- **Mode Enterprise (802.1X)** : Chaque utilisateur utilise son propre identifiant (via un serveur **RADIUS** lié à l'Active Directory).

<h3 id="wifi-arch">4. Architectures AP & WLC</h3>

- **AP Autonome (Fat AP)** : La borne gère tout (chiffrement, auth). Difficile à administrer si on a 50 bornes.
- **AP Légère (LAP) + WLC** : Les bornes ne font que transmettre. Toute l'intelligence et la configuration sont centralisées dans un **WLC (Wireless LAN Controller)**. C'est le standard en entreprise.

</section>

<section id="unite5-content">
<h2 id="unite5">Unité 5 : Sécurité : Listes de Contrôle d'Accès (ACL)</h2>

<h3 id="acl-theory">1. Théorie du filtrage</h3>

Une ACL est une suite de règles de type "Si / Alors" appliquée à une interface réseau. Elle permet d'autoriser ou d'interdire le passage de certains paquets.

**Fonctionnement critique :**
1. **Lecture séquentielle** : Le routeur lit la liste du haut vers le bas.
2. **First Match** : Dès qu'une règle correspond au paquet, on applique l'action et on s'arrête de lire.
3. **Implicit Deny Any** : Si aucune règle ne correspond, le paquet est **jeté** par défaut (règle invisible à la fin).

<h3 id="acl-types">2. Standard vs Étendue</h3>

- **ACL Standard (1-99)** : Ne regarde que l'**IP Source**. Très basique.
  - *Règle de placement* : Au plus près de la destination.
- **ACL Étendue (100-199)** : Regarde l'**IP Source**, l'**IP Destination**, le **Protocole** (TCP/UDP/ICMP) et le **Port** (80, 443, etc.).
  - *Règle de placement* : Au plus près de la source (pour ne pas faire circuler du trafic inutilement).

<h3 id="acl-rules">3. Exemple et Commandes</h3>

```cisco
! Bloquer l'accès au serveur Web (port 80) uniquement pour le PC de maintenance 1.10
access-list 101 deny tcp host 192.168.1.10 host 192.168.2.50 eq 80
access-list 101 permit ip any any  ! OBLIGATOIRE sinon tout est bloqué (Implicit Deny)

! Application sur l'interface (IN ou OUT)
interface g0/0
 ip access-group 101 in
```

</section>

<section id="unite6-content">
<h2 id="unite6">Unité 6 : NAT (Network Address Translation)</h2>

<h3 id="nat-purpose">1. Théorie : Pourquoi traduire ?</h3>

Il n'y a pas assez d'adresses IPv4 publiques pour chaque objet connecté au monde. Le NAT permet d'utiliser des **adresses privées** (192.168.x.x, 10.x.x.x) à l'intérieur de l'entreprise et de les "transformer" en une seule **IP publique** pour sortir sur Internet.

**Le rôle du Routeur NAT :**
Il maintient une table de correspondance pour savoir quel PC interne a demandé quel site internet, afin de lui retourner la réponse correctement.

<h3 id="pat">2. Le PAT (Port Address Translation / Overload)</h3>

C'est l'évolution du NAT. Pour que 200 PC puissent sortir avec une seule IP publique simultanément, le routeur change non seulement l'IP mais aussi le **port source** du paquet. On appelle cela le **NAT Overload**.

<h3 id="nat-config">3. Pratique : Commandes NAT</h3>

```cisco
! 1. Identifier les réseaux internes autorisés à sortir
access-list 1 permit 192.168.1.0 0.0.0.255

! 2. Désigner les rôles des interfaces
interface g0/0
 ip nat inside  ! Interface côté LAN
interface g0/1
 ip nat outside ! Interface côté Internet

! 3. Activer la translation avec surcharge
ip nat inside source list 1 interface g0/1 overload
```

</section>
