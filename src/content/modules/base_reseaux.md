---
id: "base_reseaux"
title: "Base des réseaux"
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
            <li><a href="#osi">1. Le modèle OSI</a>
                <ol>
                    <li><a href="#osi-logic">Théorie & Pourquoi 7 couches ?</a></li>
                    <li><a href="#encapsulation">Encapsulation & PDU</a></li>
                    <li><a href="#7couches">Les 7 couches en détail</a></li>
                    <li><a href="#diag-osi">Diagnostic par couches</a></li>
                </ol>
            </li>
            <li><a href="#unites">2. Unités informatiques</a>
                <ol>
                    <li><a href="#bit-octet">Bit vs Octet</a></li>
                    <li><a href="#debit-stockage">Débit vs Stockage</a></li>
                </ol>
            </li>
            <li><a href="#ipv4">3. Adressage IPv4</a>
                <ol>
                    <li><a href="#ip-structure">Structure (Réseau + Hôte)</a></li>
                    <li><a href="#masque-cidr">Masque & Notation CIDR</a></li>
                    <li><a href="#adresses-speciales">Adresses spéciales & Privées</a></li>
                </ol>
            </li>
            <li><a href="#calcul">4. Calcul de sous-réseaux</a>
                <ol>
                    <li><a href="#calcul-method">Méthodologie du calcul</a></li>
                    <li><a href="#exemple-calcul">Exemple pas à pas</a></li>
                </ol>
            </li>
            <li><a href="#communication">5. Communication réseau</a>
                <ol>
                    <li><a href="#comm-lan">Communication LAN (MAC/ARP)</a></li>
                    <li><a href="#comm-wan">Communication WAN (Passerelle)</a></li>
                    <li><a href="#routage">Théorie du routage</a></li>
                </ol>
            </li>
            <li><a href="#commandes">6. Commandes réseau</a></li>
            <li><a href="#ipv6">7. IPv6</a>
                <ol>
                    <li><a href="#ipv6-theory">Pourquoi l'IPv6 ?</a></li>
                    <li><a href="#ipv6-format">Format & Simplification</a></li>
                    <li><a href="#ipv6-types">Types d'adresses IPv6</a></li>
                </ol>
            </li>
            <li><a href="#subnet-tool">8. 🧮 Calculateur</a></li>
        </ol>
    </div>
</nav>

<section id="osi-content">
<h2 id="osi">1. Le modèle OSI (Open Systems Interconnection)</h2>

<h3 id="osi-logic">1. Théorie : Pourquoi un modèle en 7 couches ?</h3>

Avant le modèle OSI (créé par l'ISO), chaque constructeur (IBM, Apple, Microsoft) utilisait ses propres protocoles incompatibles. Le modèle OSI a standardisé la communication pour permettre l'interopérabilité.

**L'intérêt majeur :**
- **Abstraire la complexité** : Un développeur web n'a pas besoin de savoir comment la fibre optique transporte les photons (Couche 1) pour coder en HTML (Couche 7).
- **Faciliter le diagnostic** : Isoler si une panne est matérielle (L1/L2) ou applicative (L7).

<h3 id="encapsulation">2. Encapsulation & Notion de PDU</h3>

Chaque couche ajoute ses propres informations (Header) aux données reçues de la couche supérieure. On appelle l'ensemble de la donnée à une couche précise un **PDU (Protocol Data Unit)**.

- **Données** (Couches 5, 6, 7)
- **Segment** (Couche 4 - Transport) : Ajout des Ports (TCP/UDP).
- **Paquet** (Couche 3 - Réseau) : Ajout des adresses IP.
- **Trame** (Couche 2 - Liaison) : Ajout des adresses MAC.
- **Bits** (Couche 1 - Physique) : Conversion en signaux.

<h3 id="7couches">3. Les 7 couches en détail</h3>

> **Moyen mnémotechnique (bas vers haut) :** **P**our **L**es **R**éseaux **T**rès **S**olides, **P**ensez **A**pplication

| Couche | Nom | Unité (PDU) | Rôle Principal | Exemple |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Application** | Données | Interface utilisateur / Services reseau | HTTP, DNS, SMTP |
| **6** | **Présentation** | Données | Traduction, Chiffrement, Compression | SSL/TLS, JPEG |
| **5** | **Session** | Données | Gestion du dialogue entre applications | NetBIOS, RPC |
| **4** | **Transport** | **Segment** | Fiabilité et ports (Source/Dest) | **TCP, UDP** |
| **3** | **Réseau** | **Paquet** | Adressage logique et Routage | **IP, ICMP** |
| **2** | **Liaison** | **Trame** | Accès au média (MAC), Détection erreurs | **Ethernet, Wi-Fi** |
| **1** | **Physique** | **Bits** | Transmission électrique, optique, radio | Câble RJ45, Fibre |

<h3 id="diag-osi">4. Diagnostic par couches (La méthode TSSR)</h3>

| Étape | Question | Couche suspectée |
| :--- | :--- | :--- |
| **1** | Le câble est-il branché ? La LED du switch clignote-t-elle ? | **1 - Physique** |
| **2** | La carte réseau est-elle active ? L'adresse MAC est-elle vue ? | **2 - Liaison** |
| **3** | Puis-je pinguer ma passerelle (Routeur) ? | **3 - Réseau** |
| **4** | Le port (ex: 80) est-il ouvert ? Le service répond-il ? | **4 à 7 - Applicatif** |

</section>

<section id="unites-content">
<h2 id="unites">2. Les unités informatiques</h2>

<h3 id="bit-octet">1. Bit vs Octet</h3>

- **Bit (b)** : L'unité atomique (0 ou 1).
- **Octet (B / Byte)** : Un groupe de **8 bits**. Il permet de coder un caractère (ex: via le code ASCII).

<h3 id="debit-stockage">2. Débit vs Stockage</h3>

C'est l'erreur la plus commune :
- **Débit réseau** : On compte en **Bits par seconde** (b/s). Exemple : Fibre 1 Gb/s.
- **Capacité de stockage** : On compte en **Octets** (B). Exemple : Disque Dur 500 Go.

> **Astuce de calcul rapide :** Pour savoir combien de temps prendra le téléchargement d'un fichier, divisez le débit par 8. (100 Mb/s $\approx$ 12,5 Mo/s).

</section>

<section id="ipv4-content">
<h2 id="ipv4">3. L'adressage IPv4</h2>

<h3 id="ip-structure">1. Structure d'une adresse IP</h3>

Une adresse IPv4 (32 bits) est toujours composée de deux parties :
1. **La partie Réseau (Network ID)** : Identifie la "rue" (le sous-réseau).
2. **La partie Hôte (Host ID)** : Identifie le "numéro de maison" (l'équipement).

<h3 id="masque-cidr">2. Le Masque de sous-réseau & Notation CIDR</h3>

Le masque indique au système où s'arrête le réseau et où commence l'hôte.
- **Format décimal** : 255.255.255.0
- **Format CIDR** : `/24` (signifie que les 24 premiers bits de l'adresse sont occupés par le réseau).

<h3 id="adresses-speciales">3. Adresses spéciales & Adresses privées</h3>

**Adresses réservées :**
- `127.0.0.1` (**Loopback**) : Pour tester sa propre machine.
- `169.254.x.x` (**APIPA**) : Attribuée quand le serveur DHCP ne répond pas (Alerte panne !).

**Adresses Privées (Règle RFC 1918) :**
Ces adresses ne sont pas autorisées sur Internet. Elles s'utilisent uniquement en interne :
- **Classe A** : 10.0.0.0 à 10.255.255.255
- **Classe B** : 172.16.0.0 à 172.31.255.255
- **Classe C** : 192.168.0.0 à 192.168.255.255

</section>

<section id="calcul-content">
<h2 id="calcul">4. Calcul de sous-réseaux</h2>

### 1. Méthodologie : La règle des bits

Pour découper un réseau, on "emprunte" des bits à la partie hôte pour les donner à la partie réseau.
- **Nombre de réseaux créés** : 2 ^ (Nombre de bits empruntés)
- **Nombre d'hôtes par réseau** : 2 ^ (Nombre de bits hôtes restants) - 2 (On retire l'adresse Réseau et le Broadcast).

<h3 id="exemple-calcul">2. Exemple : Découper un /24 en 4 sous-réseaux</h3>

Réseau de départ : `192.168.1.0/24`
1. Pour faire 4 réseaux, j'ai besoin de 2 bits (2² = 4).
2. Mon nouveau masque sera : 24 + 2 = **/26** (ou 255.255.255.192).
3. Nombre d'hôtes : 32 - 26 = 6 bits restants. 2⁶ - 2 = **62** machines par réseau.

| Sous-réseau | Réseau | Plage utilisable | Broadcast |
| :--- | :--- | :--- | :--- |
| **SR 1** | 192.168.1.0/26 | .1 à .62 | 192.168.1.63 |
| **SR 2** | 192.168.1.64/26 | .65 à .126 | 192.168.1.127 |
| **...** | ... | ... | ... |

</section>

<section id="communication-content">
<h2 id="communication">5. La communication réseau</h2>

<h3 id="comm-lan">1. Communication en interne (LAN)</h3>

Dans un LAN, les machines communiquent via leurs **adresses MAC** (Couche 2).
1. PC1 veut parler à PC2 (même IP reseau).
2. PC1 crie en **Broadcast ARP** : "Qui a l'IP 192.168.1.2 ? Donnez-moi votre MAC !".
3. PC2 répond. PC1 enregistre la MAC dans son **cache ARP** et envoie la trame.

<h3 id="comm-wan">2. Communication vers l'extérieur (WAN)</h3>

Si la destination n'est pas dans le même réseau :
1. Le PC envoie son paquet à sa **Passerelle par défaut** (Default Gateway), qui est l'adresse IP du routeur.
2. Le routeur prend le relais pour acheminer le paquet.

<h3 id="routage">3. Théorie : Le Routage Statique vs Dynamique</h3>

- **Routage Statique** : On écrit manuellement la route dans le routeur. Fiable mais fastidieux si le réseau change.
- **Routage Dynamique** : Les routeurs se parlent entre eux (OSPF, RIP) pour mettre à jour leurs chemins automatiquement en cas de panne.

</section>

<section id="commandes-content">
<h2 id="commandes">6. Commandes réseau essentielles</h2>

En tant que technicien, ces outils sont vos yeux :

| Rôle | Windows | Linux / Cisco |
| :--- | :--- | :--- |
| **Afficher sa config IP** | `ipconfig` | `ip addr` / `sh ip int bri` |
| **Tester la route/sauts** | `tracert` | `traceroute` |
| **Vérifier le cache ARP** | `arp -a` | `ip neigh` |
| **DNS Lookup** | `nslookup` | `dig` |

</section>

<section id="ipv6-content">
<h2 id="ipv6">7. IPv6 : Le futur (déjà là)</h2>

<h3 id="ipv6-theory">1. Pourquoi l'IPv6 ?</h3>

Le stock d'adresses IPv4 (4 milliards) est épuisé. IPv6 offre un nombre d'adresses quasi infini ($3,4 \times 10^{38}$).
**Avantages :** Plus de NAT nécessaire, configuration automatique des adresses, sécurité intégrée.

<h3 id="ipv6-format">2. Format & Simplification</h3>

Une adresse IPv6 fait **128 bits** (8 blocs de 16 bits en hexadécimal).
*Exemple : `2001:0db8:0000:0000:0000:0042:0000:0001`*

**Règles de simplification :**
1. On peut supprimer les zéros à gauche d'un bloc (`0db8` $\rightarrow$ `db8`).
2. On peut remplacer une suite de blocs "0000" par `::` (**une seule fois** par adresse).
*Simplifié : `2001:db8::42:0:1`*

<h3 id="ipv6-types">3. Types d'adresses IPv6 à connaître</h3>

- **Unicast Global** (`2000::/3`) : Équivalent de l'IP publique.
- **Lien-Local** (`fe80::/10`) : Utilisée pour la communication interne au segment (ne sort pas du routeur).
- **Multicast** (`ff00::/8`) : Remplace le Broadcast (plus efficace).

</section>

<section id="subnet-tool">
<h2 id="subnet-tool">8. 🧮 Exercice : Calculateur de sous-réseau</h2>
<p>Utilisez cet outil pour vous entraîner au calcul de masques et de plages d'adresses.</p>
<div id="subnet-calculator-container"></div>
</section>
