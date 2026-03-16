/**
 * module1_data.js — Base des réseaux (niveau TSSR Expert)
 * Source : Base_des_reseaux_clean.md — contenu intégral
 */

export const module1 = {
    id: 'base_reseaux',
    title: 'Base des réseaux',
    icon: '🌐',
    lessonHTML: `
        <!-- SOMMAIRE FLOTTANT (hover sur le côté droit) -->
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
                            <li><a href="#encapsulation">Encapsulation</a></li>
                            <li><a href="#7couches">Les 7 couches</a></li>
                            <li><a href="#detail-couches">Détail couche par couche</a></li>
                            <li><a href="#exemple-osi">Exemple complet</a></li>
                            <li><a href="#diag-osi">Astuce diagnostic</a></li>
                        </ol>
                    </li>
                    <li><a href="#unites">2. Unités informatiques</a></li>
                    <li><a href="#ipv4">3. Adressage IPv4</a>
                        <ol>
                            <li><a href="#adresses-speciales">Adresses spéciales</a></li>
                            <li><a href="#adresses-privees">Adresses privées</a></li>
                        </ol>
                    </li>
                    <li><a href="#calcul">4. Calcul de sous-réseaux</a></li>
                    <li><a href="#communication">5. Communication réseau</a>
                        <ol>
                            <li><a href="#broadcast">Domaine broadcast</a></li>
                            <li><a href="#lan">Communication LAN</a></li>
                            <li><a href="#routage">Le routage</a></li>
                            <li><a href="#surreseau">Le surréseau</a></li>
                        </ol>
                    </li>
                    <li><a href="#commandes">6. Commandes réseau</a></li>
                    <li><a href="#ipv6">7. IPv6</a></li>
                    <li><a href="#subnet-tool">8. 🧮 Calculateur</a></li>
                </ol>
            </div>
        </nav>

        <!-- ==================== SECTION 1 : OSI ==================== -->
        <h2 id="osi">1. Le modèle OSI</h2>
        <p>Le modèle OSI (<em>Open Systems Interconnection</em>) est un modèle théorique créé par l'ISO. Il décrit comment deux systèmes communiquent à travers un réseau en divisant la communication en <strong>7 couches indépendantes mais coopérantes</strong>.</p>
        <p>Chaque couche a un rôle bien défini, utilise des protocoles spécifiques, et ne communique qu'avec la couche directement au-dessus et en dessous d'elle.</p>
        <blockquote><strong>But :</strong> standardiser la communication entre ordinateurs, quel que soit le fabricant ou le système d'exploitation.</blockquote>

        <h3 id="encapsulation">Encapsulation / Désencapsulation</h3>
        <p>Quand un PC <strong>envoie</strong> des données, chaque couche ajoute ses propres informations (en-têtes, ports, adresses...). C'est l'<strong>encapsulation</strong>.</p>
        <p>Quand le destinataire <strong>reçoit</strong> les données, il fait le processus inverse couche par couche. C'est la <strong>désencapsulation</strong>.</p>
        <pre><code>Encapsulation (envoi) :
Données → Segment (Transport) → Paquet (Réseau) → Trame (Liaison) → Bits (Physique)

Désencapsulation (réception) :
Bits → Trame → Paquet → Segment → Données</code></pre>

        <p><strong>Exemple — envoi d'un e-mail :</strong></p>
        <ul>
            <li><strong>Application</strong> : le message rédigé par l'utilisateur</li>
            <li><strong>Transport</strong> : TCP ajoute le port SMTP (25)</li>
            <li><strong>Réseau</strong> : IP ajoute l'adresse IP du serveur mail</li>
            <li><strong>Liaison</strong> : ajout des adresses MAC source et destination</li>
            <li><strong>Physique</strong> : conversion en signaux électriques ou ondes radio</li>
        </ul>

        <h3 id="7couches">Les 7 couches OSI</h3>
        <blockquote><strong>Moyen mnémotechnique (de bas en haut) :</strong> <em>«&nbsp;Pour Les Réseaux Très Solides, Pensez Application&nbsp;»</em></blockquote>
        <table>
            <thead>
                <tr><th>Couche</th><th>Nom</th><th>Rôle</th><th>Matériel</th><th>Protocoles</th></tr>
            </thead>
            <tbody>
                <tr><td>7</td><td>Application</td><td>Interface avec l'utilisateur et les services réseau</td><td>PC, serveur applicatif</td><td>HTTP, HTTPS, FTP, SMTP, DNS</td></tr>
                <tr><td>6</td><td>Présentation</td><td>Formatage, chiffrement, compression</td><td>(logiciel)</td><td>SSL/TLS, JPEG, MPEG, ASCII</td></tr>
                <tr><td>5</td><td>Session</td><td>Établissement, gestion et fermeture des sessions</td><td>(logiciel)</td><td>NetBIOS, RPC, RDP</td></tr>
                <tr><td>4</td><td>Transport</td><td>Fiabilité, segmentation, ports</td><td>Routeur, firewall</td><td>TCP, UDP</td></tr>
                <tr><td>3</td><td>Réseau</td><td>Routage, adressage logique (IP)</td><td>Routeur, pare-feu L3</td><td>IPv4, IPv6, ICMP, OSPF, RIP</td></tr>
                <tr><td>2</td><td>Liaison de données</td><td>Transmission entre machines d'un même LAN (MAC, trames)</td><td>Switch, carte réseau</td><td>Ethernet, Wi-Fi, ARP, PPP</td></tr>
                <tr><td>1</td><td>Physique</td><td>Transmission brute des bits (signaux électriques, optiques, radio)</td><td>Câbles, hub, répéteur</td><td>RJ45, fibre optique, DSL</td></tr>
            </tbody>
        </table>
        <ul>
            <li>Couches 1–3 → communication <strong>réseau</strong> (physique, liaison, routage)</li>
            <li>Couches 4–7 → communication <strong>applicative</strong> (transport, session, présentation, application)</li>
            <li>TCP/UDP = couche Transport &nbsp;|&nbsp; IP = couche Réseau &nbsp;|&nbsp; MAC = couche Liaison</li>
        </ul>

        <h3 id="detail-couches">Détail de chaque couche</h3>

        <p><strong>Couche 1 — Physique :</strong> convertit les données en bits transmis sous forme de signaux. Matériel : câbles RJ45, fibre optique, hub.</p>
        <ul>
            <li><strong>U/UTP</strong> : non blindé, le plus courant en entreprise</li>
            <li><strong>S/FTP</strong> : double blindage, haute protection contre les interférences EM</li>
        </ul>
        <blockquote>Exemple : une panne de câble est un problème de couche 1.</blockquote>

        <p><strong>Couche 2 — Liaison :</strong> connexion fiable entre deux nœuds adjacents dans un même LAN. Utilise les adresses <strong>MAC</strong> et gère la détection d'erreurs (CRC). Protocoles : Ethernet, ARP, DHCP, VLAN. Matériel : switch, carte réseau.</p>
        <blockquote>Exemple : si ton PC ne connaît pas l'adresse MAC de la box, il envoie une requête ARP en broadcast.</blockquote>

        <p><strong>Couche 3 — Réseau :</strong> adressage logique (IP) et routage entre réseaux différents. Protocoles : IPv4, IPv6, ICMP (utilisé par ping), OSPF, RIP. Matériel : routeur.</p>
        <blockquote>Exemple : ton PC (192.168.1.10) contacte Google (8.8.8.8) → le routeur décide du meilleur chemin.</blockquote>

        <p><strong>Couche 4 — Transport :</strong> communication de bout en bout entre applications.</p>
        <table>
            <thead><tr><th>Protocole</th><th>Caractéristique</th><th>Usage typique</th></tr></thead>
            <tbody>
                <tr><td>TCP</td><td>Fiable — accusé de réception, retransmission</td><td>HTTPS (443), SMTP (25), FTP (21)</td></tr>
                <tr><td>UDP</td><td>Rapide, sans garantie de livraison</td><td>DNS (53), streaming, VoIP</td></tr>
            </tbody>
        </table>

        <p><strong>Couche 5 — Session :</strong> ouverture, synchronisation et fermeture des sessions. Protocoles : NetBIOS, RPC, RDP.</p>
        <blockquote>Exemple : lors d'une connexion Bureau à distance (RDP), la couche session maintient la connexion ouverte.</blockquote>

        <p><strong>Couche 6 — Présentation :</strong> traduit, compresse et chiffre les données. Protocoles : SSL/TLS, JPEG, MPEG, ASCII/Unicode.</p>
        <blockquote>Exemple : HTTPS chiffre les données grâce à TLS avant leur envoi.</blockquote>

        <p><strong>Couche 7 — Application :</strong> interface entre l'utilisateur et les services réseau. Protocoles : HTTP (80), HTTPS (443), FTP (21), SMTP (25), SSH (22), DNS (53).</p>

        <h3 id="exemple-osi">Exemple complet — Accès à www.qwant.com</h3>
        <ol>
            <li><strong>Application</strong> : le navigateur envoie une requête HTTPS</li>
            <li><strong>Présentation</strong> : chiffrement des données via TLS</li>
            <li><strong>Session</strong> : établissement d'une session entre client et serveur</li>
            <li><strong>Transport</strong> : création d'un segment TCP avec le port destination 443</li>
            <li><strong>Réseau</strong> : ajout des adresses IP source (ton PC) et destination (serveur Qwant)</li>
            <li><strong>Liaison</strong> : ajout des adresses MAC du PC et de la box</li>
            <li><strong>Physique</strong> : conversion en signaux électriques ou ondes Wi-Fi</li>
        </ol>
        <p>À la réception, le serveur effectue la <strong>désencapsulation inverse</strong> pour traiter la requête.</p>

        <h3 id="diag-osi">Astuce diagnostic réseau (TSSR)</h3>
        <table>
            <thead><tr><th>Symptôme</th><th>Couche suspectée</th></tr></thead>
            <tbody>
                <tr><td>Pas de signal, câble débranché</td><td>Couche 1 — Physique</td></tr>
                <tr><td>Problème ARP ou VLAN</td><td>Couche 2 — Liaison</td></tr>
                <tr><td>Mauvais routage IP</td><td>Couche 3 — Réseau</td></tr>
                <tr><td>Ping OK mais pas de page web</td><td>Couches 4 à 7</td></tr>
            </tbody>
        </table>

        <!-- ==================== SECTION 2 : UNITÉS ==================== -->
        <h2 id="unites">2. Les unités informatiques</h2>

        <p><strong>Le bit (b)</strong> est la plus petite unité d'information. Il ne peut valoir que <strong>0</strong> ou <strong>1</strong> (état logique OFF/ON). C'est l'unité de base pour mesurer les débits réseau.</p>
        <blockquote>Exemple : une trame réseau est transmise bit par bit sur un câble Ethernet.</blockquote>

        <p><strong>L'octet (B)</strong> est un groupe de <strong>8 bits</strong>. Il permet de représenter un caractère.</p>
        <blockquote>Exemple : le caractère 'A' = 01000001 en binaire = 1 octet.</blockquote>
        <blockquote><strong>Règle importante :</strong> les débits réseau s'expriment en <strong>bits/s</strong> (ex : 100 Mb/s), les capacités de stockage en <strong>octets</strong> (ex : 500 Go).</blockquote>

        <h3>Unités décimales vs binaires</h3>
        <p>Les constructeurs de disques durs utilisent les unités <strong>décimales</strong> (base 10), tandis que les OS utilisent les unités <strong>binaires</strong> (base 2). C'est la source du décalage affiché.</p>
        <table>
            <thead><tr><th>Unité décimale (constructeurs)</th><th>Valeur</th><th>Unité binaire (OS)</th><th>Valeur</th></tr></thead>
            <tbody>
                <tr><td>1 Ko</td><td>1 000 octets</td><td>1 Kio</td><td>1 024 octets</td></tr>
                <tr><td>1 Mo</td><td>1 000 000 octets</td><td>1 Mio</td><td>1 048 576 octets</td></tr>
                <tr><td>1 Go</td><td>1 000 000 000 octets</td><td>1 Gio</td><td>1 073 741 824 octets</td></tr>
            </tbody>
        </table>
        <blockquote>Exemple concret : un disque vendu «&nbsp;500 Go&nbsp;» affiche 465 Gio dans Windows — c'est normal, pas un bug.</blockquote>

        <!-- ==================== SECTION 3 : IPv4 ==================== -->
        <h2 id="ipv4">3. L'adressage IPv4</h2>
        <p>Une adresse IPv4 identifie chaque interface réseau. C'est une <strong>adresse logique</strong> (non physique, contrairement à l'adresse MAC).</p>
        <ul>
            <li>Format : <strong>32 bits</strong> répartis en <strong>4 octets</strong> séparés par des points</li>
            <li>Exemple : <code>192.168.1.10</code></li>
            <li>Composée d'une <strong>partie réseau</strong> et d'une <strong>partie hôte</strong></li>
        </ul>
        <p>Le <strong>masque de sous-réseau</strong> (ou notation CIDR <code>/xx</code>) détermine où s'arrête la partie réseau.</p>

        <h3 id="adresses-speciales">Adresses spéciales</h3>
        <table>
            <thead><tr><th>Type</th><th>Adresse</th><th>Usage</th><th>Utilité pratique</th></tr></thead>
            <tbody>
                <tr><td>Adresse réseau</td><td>192.168.1.0 (ex)</td><td>Identifie le réseau lui-même</td><td>Apparaît dans les tables de routage</td></tr>
                <tr><td>Broadcast</td><td>192.168.1.255 (ex)</td><td>Envoi à tous les hôtes du réseau</td><td>Utilisé par ARP, DHCP, Wake-on-LAN</td></tr>
                <tr><td>Loopback</td><td>127.0.0.1</td><td>Adresse de test local (localhost)</td><td>Tester la pile réseau sans carte ni câble</td></tr>
                <tr><td>APIPA</td><td>169.254.x.x /16</td><td>Attribuée auto si le DHCP échoue</td><td>Un poste en 169.254.x.x = problème DHCP !</td></tr>
            </tbody>
        </table>

        <h3 id="adresses-privees">Adresses privées (non routables sur Internet)</h3>
        <table>
            <thead><tr><th>Plage</th><th>Classe</th><th>Usage typique</th></tr></thead>
            <tbody>
                <tr><td>10.0.0.0 — 10.255.255.255 /8</td><td>A</td><td>Grandes entreprises</td></tr>
                <tr><td>172.16.0.0 — 172.31.255.255 /12</td><td>B</td><td>Entreprises moyennes</td></tr>
                <tr><td>192.168.0.0 — 192.168.255.255 /16</td><td>C</td><td>Réseaux domestiques, petites structures</td></tr>
            </tbody>
        </table>
        <blockquote>Ces adresses ne sont pas routées sur Internet. Un routeur avec NAT est nécessaire pour permettre aux machines internes d'accéder à Internet.</blockquote>

        <!-- ==================== SECTION 4 : CALCUL ==================== -->
        <h2 id="calcul">4. Calcul d'adresses et sous-réseaux</h2>

        <h3>Structure d'une adresse IPv4 en binaire</h3>
        <p>Prenons l'adresse <code>192.168.1.10</code> avec le masque <code>/24</code> :</p>
        <pre><code>Adresse IP  : 11000000.10101000.00000001.00001010
Masque /24  : 11111111.11111111.11111111.00000000

Partie réseau : 192.168.1   (les 24 premiers bits)
Partie hôte   : .10         (les 8 derniers bits)

Adresse réseau  : tous les bits hôte à 0 → 192.168.1.0
Adresse broadcast: tous les bits hôte à 1 → 192.168.1.255
Plage d'hôtes   : 192.168.1.1 à 192.168.1.254
Nombre d'hôtes  : 2⁸ - 2 = 254</code></pre>

        <h3>Exemple 1 — Créer des sous-réseaux (emprunt de bits)</h3>
        <p><strong>Objectif :</strong> diviser le réseau <code>192.168.1.0/24</code> en <strong>4 sous-réseaux</strong>.</p>
        <p><strong>Raisonnement :</strong> pour 4 sous-réseaux, il faut 2 bits (2² = 4). On passe de /24 à <strong>/26</strong> (24 + 2). Chaque sous-réseau a 2⁶ - 2 = <strong>62 hôtes</strong>.</p>
        <table>
            <thead><tr><th>Sous-réseau</th><th>Adresse réseau</th><th>Plage hôtes</th><th>Broadcast</th></tr></thead>
            <tbody>
                <tr><td>SR 1</td><td>192.168.1.0/26</td><td>.1 à .62</td><td>192.168.1.63</td></tr>
                <tr><td>SR 2</td><td>192.168.1.64/26</td><td>.65 à .126</td><td>192.168.1.127</td></tr>
                <tr><td>SR 3</td><td>192.168.1.128/26</td><td>.129 à .190</td><td>192.168.1.191</td></tr>
                <tr><td>SR 4</td><td>192.168.1.192/26</td><td>.193 à .254</td><td>192.168.1.255</td></tr>
            </tbody>
        </table>

        <h3>Exemple 2 — Partir du nombre d'hôtes souhaité</h3>
        <p><strong>Objectif :</strong> au moins <strong>20 hôtes</strong> par sous-réseau dans <code>192.168.1.0/24</code>.</p>
        <p><strong>Raisonnement :</strong> 2⁵ = 32 → 32 - 2 = <strong>30 hôtes</strong>. 5 bits pour la partie hôte → masque = 32 - 5 = <strong>/27</strong>. On obtient 2³ = <strong>8 sous-réseaux</strong>.</p>
        <table>
            <thead><tr><th>Sous-réseau</th><th>Adresse réseau</th><th>Plage hôtes</th><th>Broadcast</th></tr></thead>
            <tbody>
                <tr><td>SR 1</td><td>192.168.1.0/27</td><td>.1 à .30</td><td>192.168.1.31</td></tr>
                <tr><td>SR 2</td><td>192.168.1.32/27</td><td>.33 à .62</td><td>192.168.1.63</td></tr>
                <tr><td>SR 3</td><td>192.168.1.64/27</td><td>.65 à .94</td><td>192.168.1.95</td></tr>
                <tr><td>SR 8</td><td>192.168.1.224/27</td><td>.225 à .254</td><td>192.168.1.255</td></tr>
            </tbody>
        </table>

        <!-- ==================== SECTION 5 : COMMUNICATION ==================== -->
        <h2 id="communication">5. La communication réseau</h2>

        <h3 id="broadcast">Le domaine de diffusion (Broadcast)</h3>
        <p>Le domaine de diffusion est l'ensemble des machines qui reçoivent une trame broadcast (<code>FF:FF:FF:FF:FF:FF</code>). Utilisé par : ARP, DHCP, Wake-on-LAN.</p>
        <blockquote><strong>Important :</strong> le broadcast <strong>ne traverse pas un routeur</strong>. Le routeur est la frontière du domaine de diffusion. 1 réseau IP = 1 domaine de diffusion.</blockquote>

        <h3 id="lan">Communication dans un même réseau (LAN)</h3>
        <p>Si deux machines sont dans le <strong>même réseau logique</strong>, elles communiquent directement sans passer par un routeur.</p>
        <ol>
            <li>La machine source vérifie que la destination est dans le même réseau</li>
            <li>Elle envoie une requête ARP pour obtenir l'adresse MAC de la destination</li>
            <li>La trame Ethernet est envoyée directement via le switch</li>
        </ol>
        <blockquote>PC A (192.168.1.10) vers PC B (192.168.1.20) → communication directe via switch, pas de routeur.</blockquote>

        <p><strong>Communication entre réseaux différents :</strong> la machine source envoie les données à sa <strong>passerelle par défaut</strong> (l'adresse IP du routeur local), qui route le paquet vers le réseau destination.</p>

        <h3 id="routage">Le routage</h3>
        <p>Le routage achemine un paquet IP d'un réseau source vers un réseau destination via un <strong>routeur</strong> qui s'appuie sur une <strong>table de routage</strong>.</p>

        <p><strong>Route statique</strong> — configurée manuellement, fixe, ne s'adapte pas aux pannes.</p>
        <pre><code>! Syntaxe Cisco
ip route [réseau destination] [masque] [passerelle]

! Exemple — 4 routeurs en série (R1 → R2 → R3 → R4)
! R1 pour atteindre LAN D (10.0.4.0/24) via R2
ip route 10.0.4.0 255.255.255.0 10.0.12.2

! R4 route de retour vers LAN A (10.0.1.0/24)
ip route 10.0.1.0 255.255.255.0 10.0.34.1</code></pre>

        <p><strong>Route dynamique (RIP v2)</strong> — apprise automatiquement. Maximum 15 sauts.</p>
        <pre><code>router rip
 version 2
 no auto-summary
 network 10.0.0.0</code></pre>

        <table>
            <thead><tr><th>Critère</th><th>Route statique</th><th>Route dynamique</th></tr></thead>
            <tbody>
                <tr><td>Configuration</td><td>Manuelle</td><td>Automatique</td></tr>
                <tr><td>Adaptation aux pannes</td><td>Non</td><td>Oui</td></tr>
                <tr><td>Scalabilité</td><td>Faible</td><td>Élevée</td></tr>
                <tr><td>Usage</td><td>Petit réseau</td><td>Réseau d'entreprise</td></tr>
            </tbody>
        </table>

        <h3 id="surreseau">Le surréseau (supernetting)</h3>
        <p>Le surréseau regroupe plusieurs réseaux IP contigus sous une seule route avec un masque moins restrictif. Objectif : simplifier le routage.</p>
        <pre><code>192.168.0.0/24 + 192.168.1.0/24
→ Regroupement : 192.168.0.0/23

Adresse réseau : 192.168.0.0 | Broadcast : 192.168.1.255 | Hôtes : 510</code></pre>
        <blockquote>Utilisé principalement sur les backbones, chez les FAI et dans les grandes entreprises.</blockquote>

        <!-- ==================== SECTION 6 : COMMANDES ==================== -->
        <h2 id="commandes">6. Commandes réseau essentielles</h2>
        <table>
            <thead><tr><th>Rôle</th><th>Windows</th><th>Linux</th><th>Utilité</th></tr></thead>
            <tbody>
                <tr><td>Résolution IP → MAC</td><td>arp -a</td><td>arp -n / ip neigh</td><td>Afficher le cache ARP</td></tr>
                <tr><td>Tester la connectivité</td><td>ping</td><td>ping</td><td>Vérifier qu'une machine est joignable (ICMP)</td></tr>
                <tr><td>Afficher la config IP</td><td>ipconfig</td><td>ip addr</td><td>Vérifier l'adresse IP, le masque et les interfaces</td></tr>
                <tr><td>Config IP complète</td><td>ipconfig /all</td><td>ip addr show</td><td>Vérifier DHCP, DNS, adresse MAC</td></tr>
                <tr><td>Connexions réseau</td><td>netstat -an</td><td>ss -an</td><td>Voir connexions actives et ports ouverts</td></tr>
                <tr><td>Chemin réseau</td><td>tracert</td><td>traceroute</td><td>Identifier les routeurs traversés</td></tr>
            </tbody>
        </table>

        <!-- ==================== SECTION 7 : IPv6 ==================== -->
        <h2 id="ipv6">7. IPv6</h2>

        <h3>Pourquoi IPv6 ?</h3>
        <p>IPv4 offre environ 4,3 milliards d'adresses (2³²). Avec la multiplication des objets connectés, ce pool est épuisé. IPv6 répond à cet épuisement.</p>
        <table>
            <thead><tr><th>Critère</th><th>IPv4</th><th>IPv6</th></tr></thead>
            <tbody>
                <tr><td>Taille de l'adresse</td><td>32 bits</td><td>128 bits</td></tr>
                <tr><td>Nombre d'adresses</td><td>~4,3 milliards</td><td>~340 undécillions</td></tr>
                <tr><td>Notation</td><td>Décimale pointée</td><td>Hexadécimale</td></tr>
                <tr><td>NAT nécessaire</td><td>Souvent</td><td>Rarement</td></tr>
            </tbody>
        </table>

        <h3>Structure d'une adresse IPv6</h3>
        <p>Une adresse IPv6 est composée de <strong>128 bits</strong>, soit <strong>8 blocs de 16 bits</strong> en hexadécimal séparés par <code>:</code>.</p>
        <pre><code>Exemple complet : 2001:0db8:0000:0000:0000:0042:0000:0001</code></pre>

        <h3>Règles de simplification</h3>
        <p><strong>Règle 1</strong> — Supprimer les zéros non significatifs à gauche de chaque bloc :</p>
        <pre><code>0db8 → db8  |  0042 → 42  |  0000 → 0</code></pre>
        <p><strong>Règle 2</strong> — Remplacer une suite de blocs entièrement à zéro par <code>::</code> (une seule fois par adresse) :</p>
        <pre><code>2001:0db8:0000:0000:0000:0042:0000:0001
         \_________________/
              3 blocs à 0
→ 2001:db8::42:0:1</code></pre>

        <table>
            <thead><tr><th>Adresse complète</th><th>Adresse simplifiée</th></tr></thead>
            <tbody>
                <tr><td>2001:0db8:0000:0000:0000:0000:0000:0001</td><td>2001:db8::1</td></tr>
                <tr><td>fe80:0000:0000:0000:0a00:27ff:fe4e:66a1</td><td>fe80::a00:27ff:fe4e:66a1</td></tr>
                <tr><td>0000:0000:0000:0000:0000:0000:0000:0001</td><td>::1 (loopback IPv6)</td></tr>
            </tbody>
        </table>

        <h3>Types d'adresses IPv6 courants</h3>
        <table>
            <thead><tr><th>Type</th><th>Préfixe</th><th>Équivalent IPv4</th><th>Usage</th></tr></thead>
            <tbody>
                <tr><td>Unicast global</td><td>2000::/3</td><td>Adresse publique</td><td>Communication sur Internet</td></tr>
                <tr><td>Unicast lien-local</td><td>fe80::/10</td><td>169.254.x.x</td><td>Communication sur le lien local uniquement</td></tr>
                <tr><td>Loopback</td><td>::1</td><td>127.0.0.1</td><td>Test local</td></tr>
                <tr><td>Multicast</td><td>ff00::/8</td><td>Broadcast (approx.)</td><td>Envoi à un groupe de machines</td></tr>
            </tbody>
        </table>
        <blockquote>En IPv6, il n'y a plus de broadcast. Il est remplacé par le <strong>multicast</strong>, plus efficace car seules les machines concernées reçoivent le message.</blockquote>

        <h3>Points clés IPv6 à retenir</h3>
        <ul>
            <li>IPv4 = 32 bits | IPv6 = 128 bits</li>
            <li>Une adresse IPv6 = 8 blocs hexadécimaux de 16 bits</li>
            <li>Simplification : supprimer les zéros gauches + <code>::</code> pour une suite de blocs nuls</li>
            <li>IPv6 supprime le besoin de NAT (chaque équipement a une adresse publique unique)</li>
            <li>Le broadcast est remplacé par le multicast en IPv6</li>
        </ul>

        <!-- ==================== SECTION 8 : SUBNET CALCULATOR ==================== -->
        <h2 id="subnet-tool">8. 🧮 Exercice : Calculateur de sous-réseau</h2>
        <p>Une IP et un masque aléatoires sont générés. Calculez mentalement l'adresse réseau, le broadcast et le nombre d'hôtes, puis vérifiez vos réponses.</p>
        <div id="subnet-calculator" class="subnet-calc">
            <div class="subnet-calc__question" id="subnet-question">
                <p>Cliquez sur «&nbsp;Générer&nbsp;» pour démarrer un exercice.</p>
            </div>
            <div class="subnet-calc__fields" id="subnet-fields" style="display:none;">
                <div class="subnet-calc__field">
                    <label for="sc-network">Adresse réseau</label>
                    <input type="text" id="sc-network" placeholder="ex: 192.168.1.0" autocomplete="off" spellcheck="false">
                </div>
                <div class="subnet-calc__field">
                    <label for="sc-broadcast">Adresse broadcast</label>
                    <input type="text" id="sc-broadcast" placeholder="ex: 192.168.1.255" autocomplete="off" spellcheck="false">
                </div>
                <div class="subnet-calc__field">
                    <label for="sc-hosts">Nombre d'hôtes (max)</label>
                    <input type="text" id="sc-hosts" placeholder="ex: 254" autocomplete="off" spellcheck="false">
                </div>
                <div class="subnet-calc__actions">
                    <button class="btn btn-primary" id="sc-validate">Valider mes réponses</button>
                    <button class="btn btn-outline" id="sc-generate">Nouvelle IP</button>
                </div>
            </div>
            <div id="subnet-result" class="subnet-calc__result" aria-live="polite" style="display:none;"></div>
            <button class="btn btn-primary" id="sc-start" style="margin-top: var(--space-4);">Générer un exercice</button>
        </div>
    `,

    quiz: [
        {
            question: "Quel est le moyen mnémotechnique pour retenir les 7 couches OSI de bas en haut ?",
            options: [
                "Application, Présentation, Session, Transport, Réseau, Liaison, Physique",
                "\"Pour Les Réseaux Très Solides, Pensez Application\"",
                "\"Apprenons Progressivement Si Tu Resumes La Physique\"",
                "\"Physique Liaison Réseau Transport Session Présentation Application\""
            ],
            correctIndex: 1,
            explanation: "Le moyen mnémotechnique officiel est \"Pour Les Réseaux Très Solides, Pensez Application\" (P=Physique, L=Liaison, R=Réseau, T=Transport, S=Session, P=Présentation, A=Application)."
        },
        {
            question: "Une machine a l'adresse 169.254.0.15. Que cela indique-t-il immédiatement ?",
            options: [
                "La machine est configurée en adresse statique de classe B",
                "L'adresse loopback est active et le réseau fonctionne",
                "Le serveur DHCP n'a pas répondu — la machine s'est auto-configurée (APIPA)",
                "La machine est connectée à Internet via IPv6"
            ],
            correctIndex: 2,
            explanation: "169.254.0.0/16 est la plage APIPA (Automatic Private IP Addressing). Un poste en 169.254.x.x signifie que le serveur DHCP est inaccessible. C'est une alerte de diagnostic immédiate en TSSR."
        },
        {
            question: "Pour avoir au moins 50 hôtes dans un sous-réseau, quel masque CIDR utiliser ?",
            options: ["/27 (30 hôtes)", "/26 (62 hôtes)", "/25 (126 hôtes)", "/28 (14 hôtes)"],
            correctIndex: 1,
            explanation: "2⁵ - 2 = 30 hôtes (trop peu). 2⁶ - 2 = 62 hôtes ✅ (suffisant). Le masque /26 (255.255.255.192) est le plus adapté pour avoir au moins 50 hôtes."
        },
        {
            question: "Quelle est la différence fondamentale entre TCP et UDP ?",
            options: [
                "TCP fonctionne en couche 3, UDP en couche 4",
                "TCP garantit la livraison avec accusé de réception ; UDP est rapide mais sans garantie",
                "TCP est plus rapide qu'UDP car il compresse les données",
                "UDP est chiffré par défaut, TCP ne l'est pas"
            ],
            correctIndex: 1,
            explanation: "TCP (Transmission Control Protocol) établit une connexion avec accusé de réception et retransmission en cas de perte. UDP (User Datagram Protocol) envoie sans confirmation — plus rapide mais non fiable. TCP = HTTPS, SMTP. UDP = DNS, VoIP, streaming."
        },
        {
            question: "Réseau 10.0.0.0/24 — quelle est l'adresse de broadcast ?",
            options: ["10.0.0.0", "10.0.0.127", "10.0.0.254", "10.0.0.255"],
            correctIndex: 3,
            explanation: "Pour un /24, les 24 premiers bits sont la partie réseau, les 8 derniers sont la partie hôte. Le broadcast = tous les bits hôte à 1 = 255. Réponse : 10.0.0.255."
        },
        {
            question: "Pourquoi le broadcast ne traverse-t-il pas un routeur ?",
            options: [
                "Parce que les routeurs ne comprennent que les adresses IPv6",
                "Parce que le routeur est la frontière du domaine de diffusion — il segmente les broadcasts",
                "Parce que le broadcast est filtré par le pare-feu",
                "Parce que les trames broadcast sont envoyées uniquement en UDP"
            ],
            correctIndex: 1,
            explanation: "Un routeur délimite un domaine de diffusion. Chaque interface d'un routeur = un réseau IP différent = un domaine de diffusion indépendant. Les broadcasts restent confinés au réseau local."
        },
        {
            question: "Quelle commande Windows permet de voir les associations IP ↔ MAC du cache ARP ?",
            options: ["ipconfig /all", "netstat -an", "arp -a", "ping -t"],
            correctIndex: 2,
            explanation: "La commande 'arp -a' affiche le cache ARP (table des associations IP ↔ adresse MAC). C'est utile pour diagnostiquer des problèmes de communication dans un LAN."
        },
        {
            question: "Quelle est la particularité principale de l'IPv6 par rapport au broadcast ?",
            options: [
                "IPv6 utilise un broadcast amélioré sur 256 bits",
                "IPv6 n'a pas de broadcast — il est remplacé par le multicast",
                "IPv6 utilise l'adresse 255.255.255.255 pour le broadcast",
                "IPv6 utilise le broadcast uniquement pour ARP"
            ],
            correctIndex: 1,
            explanation: "En IPv6, le broadcast est supprimé et remplacé par le multicast. Le multicast est plus efficace : seules les machines faisant partie du groupe concerné reçoivent le message."
        },
        {
            question: "Un disque dur est vendu \"1 To\". Windows l'affiche à environ 931 Gio. Pourquoi ?",
            options: [
                "Windows retire 7% pour le système de fichiers NTFS",
                "Le disque est partiellement défectueux",
                "Les constructeurs utilisent des unités décimales (10³), les OS des unités binaires (2¹⁰)",
                "La partition de récupération occupe l'espace manquant"
            ],
            correctIndex: 2,
            explanation: "1 To constructeur = 1 000 000 000 000 octets. Converti en binaire : 1 000 000 000 000 / 1 073 741 824 ≈ 931 Gio. C'est purement une différence de base de calcul, pas un défaut."
        },
        {
            question: "Qu'est-ce qu'une adresse loopback (127.0.0.1) et à quoi sert-elle ?",
            options: [
                "L'adresse par défaut attribuée par le DHCP quand aucun réseau n'est disponible",
                "L'adresse MAC de la carte réseau en notation IP",
                "Une adresse de test local permettant de tester la pile réseau sans carte réseau ni câble",
                "L'adresse de la passerelle par défaut sur les réseaux /8"
            ],
            correctIndex: 2,
            explanation: "127.0.0.1 (loopback) est une adresse virtuelle qui désigne la machine elle-même. Taper 'ping 127.0.0.1' permet de vérifier que la pile TCP/IP fonctionne correctement, sans avoir besoin d'un câble ou d'une connexion réseau."
        }
    ],

    flashcards: [
        {
            front: "Mnémotechnique OSI de bas en haut ?",
            back: "\"Pour Les Réseaux Très Solides, Pensez Application\"\n\nP=Physique | L=Liaison | R=Réseau | T=Transport | S=Session | P=Présentation | A=Application"
        },
        {
            front: "Qu'est-ce que l'encapsulation ?",
            back: "Lors de l'envoi, chaque couche OSI ajoute ses propres en-têtes aux données :\n\nDonnées → Segment (Transport) → Paquet (Réseau) → Trame (Liaison) → Bits (Physique)\n\nLa réception fait l'inverse : désencapsulation."
        },
        {
            front: "À quoi reconnaît-on qu'un poste a un problème DHCP ?",
            back: "Son adresse IP est dans la plage 169.254.x.x /16 (APIPA).\n\nL'OS s'auto-attribue cette adresse quand il ne reçoit aucune réponse du serveur DHCP.\nAction : vérifier la connectivité réseau et l'état du serveur DHCP."
        },
        {
            front: "Formule pour calculer le nombre d'hôtes d'un sous-réseau ?",
            back: "Nombre d'hôtes = 2ⁿ - 2\n\nn = nombre de bits de la partie hôte = (32 - préfixe CIDR)\n\nExemple /26 : n = 32 - 26 = 6 → 2⁶ - 2 = 62 hôtes\n(-2 car : adresse réseau et broadcast non utilisables)"
        },
        {
            front: "Quelle est la différence entre bit et octet ?",
            back: "1 bit = l'unité la plus petite (0 ou 1)\n1 octet = 8 bits\n\nDébits réseau → en bits/s (ex: 100 Mb/s)\nCapacité de stockage → en octets (ex: 500 Go)\n\nAttention à la casse : bit = 'b' minuscule | octet = 'B' majuscule"
        },
        {
            front: "Quelle est la grande différence IPv6 vs IPv4 concernant le broadcast ?",
            back: "IPv6 n'a PAS de broadcast.\nIl est remplacé par le multicast (ff00::/8) : seules les machines du groupe ciblé reçoivent le message.\n\nAutres différences clés :\n• IPv4 = 32 bits | IPv6 = 128 bits\n• IPv6 supprime le besoin de NAT"
        },
        {
            front: "Comment simplifier l'adresse IPv6 2001:0db8:0000:0000:0042:0000:0000:0001 ?",
            back: "Étape 1 — Supprimer les zéros gauches de chaque bloc :\n2001:db8:0:0:42:0:0:1\n\nÉtape 2 — Remplacer la plus longue suite de blocs nuls par :: :\n2001:db8:0:0:42::1\n\n(Le :: remplace les deux derniers blocs :0:0 — ou les premiers :0:0 selon la longueur)"
        },
        {
            front: "Tableau de diagnostic OSI : quel symptôme → quelle couche ?",
            back: "• Câble débranché / pas de signal → Couche 1 (Physique)\n• Problème ARP, VLAN → Couche 2 (Liaison)\n• Mauvais routage IP → Couche 3 (Réseau)\n• Ping OK mais page web inaccessible → Couches 4-7\n\nMéthode : toujours diagnostiquer de bas en haut."
        },
        {
            front: "À quoi sert l'adresse 127.0.0.1 ?",
            back: "C'est l'adresse de loopback (interface virtuelle).\n\nElle représente la machine elle-même. Permet de tester la pile TCP/IP sans carte réseau ni câble.\n\n'ping 127.0.0.1' = test interne de la stack réseau locale.\nÉquivalent IPv6 : ::1"
        },
        {
            front: "Qu'est-ce que le surréseau (supernetting) et quand l'utilise-t-on ?",
            back: "Le surréseau regroupe plusieurs réseaux contigus sous un masque moins restrictif pour simplifier les tables de routage.\n\nExemple :\n192.168.0.0/24 + 192.168.1.0/24 → 192.168.0.0/23\n(510 hôtes, broadcast 192.168.1.255)\n\nUsage : FAI, backbone, grandes entreprises."
        }
    ]
};
