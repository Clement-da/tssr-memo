/**
 * module2_data.js — Infrastructure Réseaux (Cisco IOS)
 * Source : INFRASTRUCTURE_RESEAUX_clean.md — contenu intégral
 * Niveau expert TSSR — tous les schémas de configuration inclus
 */

export const module2 = {
    id: 'infra_reseaux',
    title: 'Infrastructure Réseaux',
    icon: '🔧',
    lessonHTML: `
        <!-- SOMMAIRE FLOTTANT CÔTÉ DROIT — hover pour ouvrir -->
        <nav class="lesson-toc" aria-label="Sommaire de la leçon">
            <div class="lesson-toc__tab" aria-hidden="true">
                <span class="lesson-toc__tab-icon">📋</span>
                Plan
            </div>
            <div class="lesson-toc__body">
                <h3 class="lesson-toc__title">Sommaire</h3>
                <ol class="lesson-toc__list">
                    <li><a href="#m1-console">1. Config initiale</a>
                        <ol>
                            <li><a href="#m1-modes">Modes IOS</a></li>
                            <li><a href="#m1-config">Config minimale</a></li>
                            <li><a href="#m1-save">Sauvegarde</a></li>
                        </ol>
                    </li>
                    <li><a href="#m2-switch">2. Commutation Ethernet</a>
                        <ol>
                            <li><a href="#m2-mac">Table MAC</a></li>
                            <li><a href="#m2-vlan">Les VLAN</a></li>
                            <li><a href="#m2-toip">VLAN Voix (ToIP)</a></li>
                            <li><a href="#m2-ssh">Administration SSH</a></li>
                            <li><a href="#m2-portsec">Port Security</a></li>
                        </ol>
                    </li>
                    <li><a href="#m3-routage">3. Routage IP</a>
                        <ol>
                            <li><a href="#m3-statique">Routage statique</a></li>
                            <li><a href="#m3-rip">RIP v2</a></li>
                            <li><a href="#m3-ospf">OSPF</a></li>
                            <li><a href="#m3-inter-vlan">Inter-VLAN (Router-on-a-stick)</a></li>
                        </ol>
                    </li>
                    <li><a href="#m4-wifi">4. Réseaux Wi-Fi</a>
                        <ol>
                            <li><a href="#m4-normes">Normes 802.11</a></li>
                            <li><a href="#m4-freq">Bandes de fréquences</a></li>
                            <li><a href="#m4-secu">Sécurité Wi-Fi</a></li>
                        </ol>
                    </li>
                    <li><a href="#m5-acl">5. Listes de contrôle ACL</a>
                        <ol>
                            <li><a href="#m5-standard">ACL standard</a></li>
                            <li><a href="#m5-etendue">ACL étendue</a></li>
                            <li><a href="#m5-matrice">Matrice de flux</a></li>
                        </ol>
                    </li>
                    <li><a href="#m6-nat">6. NAT</a>
                        <ol>
                            <li><a href="#m6-pat">S-NAT dynamique (PAT)</a></li>
                            <li><a href="#m6-statique">S-NAT statique</a></li>
                            <li><a href="#m6-dnat">D-NAT (Port Forwarding)</a></li>
                        </ol>
                    </li>
                </ol>
            </div>
        </nav>

        <!-- ==================== MODULE 1 : CONFIG INITIALE ==================== -->
        <h2 id="m1-console">1. Configuration initiale des équipements</h2>

        <h3>Le port console</h3>
        <p>Un équipement Cisco démarre <strong>sans adresse IP, sans SSH, sans accès réseau</strong>. Le port console est le seul moyen d'accès initial : câble console (RJ45 → USB) + émulateur PuTTY. Il opère à la <strong>couche 1 OSI</strong>.</p>
        <blockquote>Réflexe pro : si le réseau est inaccessible, le port console reste le dernier recours.</blockquote>

        <h3 id="m1-modes">Les modes hiérarchiques Cisco IOS</h3>
        <p>Cisco IOS fonctionne par modes hiérarchiques. On ne peut pas modifier la configuration sans être dans le bon mode.</p>
        <table>
            <thead><tr><th>Invite</th><th>Mode</th><th>Ce qu'on peut faire</th></tr></thead>
            <tbody>
                <tr><td><code>Switch&gt;</code></td><td>Utilisateur</td><td>Consultation basique uniquement</td></tr>
                <tr><td><code>Switch#</code></td><td>Privilégié</td><td>Diagnostic, visualisation complète, accès à la config</td></tr>
                <tr><td><code>Switch(config)#</code></td><td>Configuration globale</td><td>Modification réelle du périphérique</td></tr>
            </tbody>
        </table>
        <pre><code>Switch&gt;  enable                 → passage en mode privilégié
Switch#  configure terminal      → passage en configuration globale
Switch(config)#  exit            → retour au mode précédent
Switch(config)#  end             → retour direct en mode privilégié</code></pre>

        <h3 id="m1-config">Configuration minimale</h3>
        <pre><code>Switch# configure terminal

! Nom du périphérique
Switch(config)# hostname SW1

! Bannière légale (MOTD)
SW1(config)# banner motd # Accès réservé au personnel autorisé. #

! Sécurisation du mode privilégié
SW1(config)# enable secret MonMotDePasse

! Sécurisation du port console
SW1(config)# line console 0
SW1(config-line)# password console123
SW1(config-line)# login
SW1(config-line)# exit

! Chiffrement des mots de passe en clair
SW1(config)# service password-encryption</code></pre>

        <h3 id="m1-save">Sauvegarde de la configuration</h3>
        <p>Deux fichiers coexistent sur un équipement Cisco :</p>
        <ul>
            <li><strong>running-config</strong> : configuration active, stockée en <strong>RAM</strong>, perdue au redémarrage</li>
            <li><strong>startup-config</strong> : configuration de démarrage, stockée en <strong>NVRAM</strong>, persistante</li>
        </ul>
        <pre><code>! Sauvegarder la config active → NVRAM
SW1# copy running-config startup-config

! Vérifier la config active
SW1# show running-config

! Vérifier la config de démarrage
SW1# show startup-config</code></pre>
        <blockquote>Réflexe : configurer → vérifier → <strong>sauvegarder</strong>.</blockquote>

        <!-- ==================== MODULE 2 : COMMUTATION ==================== -->
        <h2 id="m2-switch">2. Commutation Ethernet (Switch — Couche 2)</h2>

        <p>Un switch travaille en <strong>couche 2 du modèle OSI</strong>. Il ne comprend que les adresses MAC, pas les adresses IP. Il reçoit des trames Ethernet et les envoie vers le bon port.</p>
        <pre><code>Structure d'une trame Ethernet :
| MAC destination | MAC source | Type | Données | FCS |</code></pre>

        <h3 id="m2-mac">La table MAC (CAM table)</h3>
        <p>Le switch apprend automatiquement la table MAC : à chaque trame reçue, il enregistre l'<strong>adresse MAC source</strong> et le <strong>port d'entrée</strong>.</p>
        <table>
            <thead><tr><th>Situation</th><th>Action du switch</th></tr></thead>
            <tbody>
                <tr><td>MAC destination connue dans la table</td><td>Envoi uniquement sur le port correspondant</td></tr>
                <tr><td>MAC destination inconnue</td><td><strong>Flooding</strong> : envoi sur tous les ports sauf celui d'entrée</td></tr>
                <tr><td>Trame broadcast (FF:FF:FF:FF:FF:FF)</td><td>Envoi sur tous les ports du VLAN</td></tr>
            </tbody>
        </table>
        <pre><code>! Afficher la table MAC
SW1# show mac address-table</code></pre>
        <blockquote>Chaque port d'un switch = <strong>domaine de collision indépendant</strong>. Tous les ports d'un même VLAN = <strong>même domaine de diffusion</strong>.</blockquote>

        <h3 id="m2-vlan">Les VLAN</h3>
        <p>Un VLAN (Virtual LAN) découpe un switch en plusieurs réseaux logiques indépendants. Deux machines dans des VLAN différents ne peuvent pas communiquer sans routage.</p>
        <ul>
            <li><strong>Port access</strong> : appartient à un seul VLAN — pour les équipements finaux (PC, imprimantes)</li>
            <li><strong>Port trunk</strong> : transporte plusieurs VLAN — entre équipements réseau (switch ↔ switch, switch ↔ routeur)</li>
        </ul>

        <h4>Étape 1 — Création des VLAN</h4>
        <pre><code>SW1# configure terminal

SW1(config)# vlan 10
SW1(config-vlan)# name VLAN_COMPTA
SW1(config-vlan)# exit

SW1(config)# vlan 20
SW1(config-vlan)# name VLAN_DIRECTION
SW1(config-vlan)# exit</code></pre>

        <h4>Étape 2 — Configuration des ports Access</h4>
        <pre><code>! Port Fa0/1 → VLAN 10 (PC Comptabilité)
SW1(config)# interface fastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
SW1(config-if)# exit

! Port Fa0/2 → VLAN 20 (PC Direction)
SW1(config)# interface fastEthernet 0/2
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 20
SW1(config-if)# exit

! Configurer plusieurs ports d'un coup (ports 5 à 9 → VLAN 10)
SW1(config)# interface range fastEthernet 0/5-9
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 10
SW1(config-if-range)# exit</code></pre>

        <h4>Étape 3 — Vérification</h4>
        <pre><code>! Afficher tous les VLAN et leurs ports
SW1# show vlan brief

! Afficher un VLAN spécifique
SW1# show vlan id 10</code></pre>

        <h4>Étape 4 — Configuration d'un lien Trunk (switch ↔ switch)</h4>
        <pre><code>! Port Fa0/24 relié à un autre switch
SW1(config)# interface fastEthernet 0/24
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
SW1(config-if)# exit</code></pre>

        <h4>Étape 5 — Vérification du trunk</h4>
        <pre><code>SW1# show interfaces fastEthernet 0/24 trunk
SW1# show interfaces trunk</code></pre>

        <h3 id="m2-toip">VLAN Voix (ToIP)</h3>
        <p>La ToIP (Téléphonie sur IP) exige que le trafic voix soit séparé du trafic données : très sensible au délai, à la gigue et aux pertes de paquets. Sur un port avec téléphone IP (PC derrière), le switch gère <strong>deux VLAN simultanément</strong> sur le même port physique.</p>
        <pre><code>SW1(config)# interface fastEthernet 0/3
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10    ! VLAN data pour le PC
SW1(config-if)# switchport voice vlan 40     ! VLAN voix pour le téléphone IP
SW1(config-if)# exit</code></pre>
        <blockquote>Les téléphones IP sont souvent alimentés par le switch via <strong>PoE</strong> (Power over Ethernet), évitant une prise secteur supplémentaire.</blockquote>

        <h3 id="m2-ssh">Administration à distance (SSH recommandé)</h3>
        <h4>Étape 1 — Adresse IP de gestion (SVI)</h4>
        <pre><code>SW1(config)# interface vlan 1
SW1(config-if)# ip address 192.168.1.10 255.255.255.0
SW1(config-if)# no shutdown
SW1(config-if)# exit

SW1(config)# ip default-gateway 192.168.1.1</code></pre>

        <h4>Étape 2 — Accès Telnet (non chiffré — à éviter en production)</h4>
        <pre><code>SW1(config)# line vty 0 4
SW1(config-line)# password telnet123
SW1(config-line)# login
SW1(config-line)# transport input telnet
SW1(config-line)# exit</code></pre>

        <h4>Étape 3 — Accès SSH (obligatoire en production)</h4>
        <p>SSH chiffre toutes les communications, contrairement à Telnet. C'est la méthode à privilégier systématiquement.</p>
        <pre><code>! Prérequis : nom de domaine et clé RSA
SW1(config)# ip domain-name monentreprise.local
SW1(config)# crypto key generate rsa modulus 2048

! Créer un utilisateur local
SW1(config)# username admin secret AdminPass123

! Configurer les lignes VTY pour SSH uniquement
SW1(config)# line vty 0 4
SW1(config-line)# login local
SW1(config-line)# transport input ssh
SW1(config-line)# exit

! Forcer SSH version 2
SW1(config)# ip ssh version 2</code></pre>

        <h3 id="m2-portsec">Sécurisation des ports (Port Security)</h3>
        <p>Par défaut, un switch accepte n'importe quel équipement branché. La Port Security limite le risque d'intrusion physique.</p>
        <blockquote>La Port Security s'applique uniquement sur des <strong>ports access</strong>, jamais sur les trunks.</blockquote>

        <h4>Apprentissage manuel (MAC fixe)</h4>
        <pre><code>SW1(config)# interface fastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address 0011.2233.4455
SW1(config-if)# switchport port-security violation shutdown
SW1(config-if)# exit</code></pre>

        <h4>Apprentissage automatique (sticky)</h4>
        <p>Le switch apprend automatiquement les adresses MAC et les conserve dans la configuration.</p>
        <pre><code>SW1(config)# interface fastEthernet 0/2
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 2
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation restrict
SW1(config-if)# exit

! Vérifier l'état de la Port Security
SW1# show port-security interface fastEthernet 0/1</code></pre>

        <table>
            <thead><tr><th>Mode de violation</th><th>Comportement</th></tr></thead>
            <tbody>
                <tr><td><code>shutdown</code></td><td>Port désactivé (err-disabled) — le plus sécurisé</td></tr>
                <tr><td><code>restrict</code></td><td>Trames non autorisées rejetées, log généré</td></tr>
                <tr><td><code>protect</code></td><td>Trames non autorisées rejetées silencieusement</td></tr>
            </tbody>
        </table>

        <!-- ==================== MODULE 3 : ROUTAGE IP ==================== -->
        <h2 id="m3-routage">3. Routage IP (Routeur — Couche 3)</h2>
        <p>Le routeur travaille en <strong>couche 3 OSI</strong> et utilise les adresses IP. Chaque interface du routeur appartient à un réseau IP différent. La <strong>table de routage</strong> indique où envoyer chaque paquet.</p>
        <pre><code>! Afficher la table de routage
R1# show ip route

! Légende :
! C = Connected (directement connecté)
! S = Static (route statique)
! R = RIP
! O = OSPF</code></pre>

        <h3 id="m3-statique">Routage statique</h3>
        <p>Route configurée manuellement, fixe, ne s'adapte pas aux pannes.</p>
        <pre><code>! Syntaxe
ip route [réseau destination] [masque] [passerelle ou interface de sortie]

! Topologie : PC1 (192.168.1.x) ── R1 ── R2 ── PC2 (192.168.2.x)
!   R1 : G0/0=192.168.1.1 | G0/1=10.0.0.1
!   R2 : G0/0=10.0.0.2   | G0/1=192.168.2.1

! Configuration R1 (pour atteindre LAN2)
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2

! Configuration R2 (pour atteindre LAN1)
R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1

! Route par défaut (vers Internet)
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2</code></pre>
        <blockquote>⚠️ Si un lien tombe, la communication est interrompue. Aucune adaptation automatique.</blockquote>

        <h3 id="m3-rip">Routage dynamique — RIP v2</h3>
        <p>RIP (Routing Information Protocol) : simple, basé sur le nombre de sauts. Adapté aux petits réseaux.</p>
        <ul>
            <li>Métrique : <strong>nombre de sauts</strong> (hop count)</li>
            <li>Maximum : <strong>15 sauts</strong> (au-delà = inaccessible)</li>
            <li>Convergence lente, ne tient pas compte de la bande passante</li>
        </ul>
        <pre><code>! Sur R1
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.1.0
R1(config-router)# network 10.0.0.0
R1(config-router)# exit

! Sur R2
R2(config)# router rip
R2(config-router)# version 2
R2(config-router)# no auto-summary
R2(config-router)# network 192.168.2.0
R2(config-router)# network 10.0.0.0
R2(config-router)# exit

! Vérifier les routes apprises par RIP
R1# show ip route rip</code></pre>

        <h3 id="m3-ospf">Routage dynamique — OSPF</h3>
        <p>OSPF (Open Shortest Path First) : protocole avancé, standard en entreprise.</p>
        <ul>
            <li>Métrique : <strong>coût</strong> basé sur la bande passante (chemin le plus rapide)</li>
            <li>Protocole à <strong>état de liens</strong> : chaque routeur connaît la topologie complète</li>
            <li>Convergence <strong>rapide</strong>, pas de limite de sauts</li>
        </ul>
        <pre><code>! Sur R1
R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
R1(config-router)# exit

! Sur R2
R2(config)# router ospf 1
R2(config-router)# network 192.168.2.0 0.0.0.255 area 0
R2(config-router)# network 10.0.0.0 0.0.0.3 area 0
R2(config-router)# exit

! Vérifier les voisins OSPF
R1# show ip ospf neighbor

! Vérifier les routes OSPF
R1# show ip route ospf</code></pre>
        <blockquote>Note : en OSPF, le masque <strong>wildcard</strong> est l'inverse du masque de sous-réseau. Pour /24 (255.255.255.0), le wildcard est <code>0.0.0.255</code>.</blockquote>

        <table>
            <thead><tr><th>Critère</th><th>RIP v2</th><th>OSPF</th></tr></thead>
            <tbody>
                <tr><td>Métrique</td><td>Nombre de sauts</td><td>Coût (bande passante)</td></tr>
                <tr><td>Limite</td><td>15 sauts max</td><td>Aucune</td></tr>
                <tr><td>Convergence</td><td>Lente</td><td>Rapide</td></tr>
                <tr><td>Scalabilité</td><td>Petits réseaux</td><td>Grands réseaux</td></tr>
                <tr><td>Complexité</td><td>Faible</td><td>Moyenne à élevée</td></tr>
            </tbody>
        </table>

        <h3 id="m3-inter-vlan">Routage inter-VLAN (Router-on-a-stick)</h3>
        <p>Par défaut les VLAN sont isolés. La méthode <strong>Router-on-a-stick</strong> utilise 1 seul lien trunk entre switch et routeur, avec une <strong>sous-interface par VLAN</strong>.</p>
        <pre><code>! Topologie :
! PC1 (VLAN 10 : 192.168.10.x) ──┐
!                                  SW1 ──(trunk Fa0/24)── R1
! PC2 (VLAN 20 : 192.168.20.x) ──┘</code></pre>

        <h4>Configuration du switch</h4>
        <pre><code>SW1(config)# vlan 10
SW1(config-vlan)# name DATA
SW1(config-vlan)# exit

SW1(config)# vlan 20
SW1(config-vlan)# name RH
SW1(config-vlan)# exit

! Port PC1 → VLAN 10
SW1(config)# interface fastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
SW1(config-if)# exit

! Port PC2 → VLAN 20
SW1(config)# interface fastEthernet 0/2
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 20
SW1(config-if)# exit

! Lien trunk vers le routeur
SW1(config)# interface fastEthernet 0/24
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
SW1(config-if)# exit</code></pre>

        <h4>Configuration du routeur (sous-interfaces)</h4>
        <pre><code>! Activer l'interface physique sans IP
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# no shutdown
R1(config-if)# exit

! Sous-interface VLAN 10 — passerelle 192.168.10.1
R1(config)# interface gigabitEthernet 0/0.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config-subif)# exit

! Sous-interface VLAN 20 — passerelle 192.168.20.1
R1(config)# interface gigabitEthernet 0/0.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0
R1(config-subif)# exit</code></pre>
        <blockquote>Sur les PC, la passerelle par défaut = IP de la sous-interface du VLAN (192.168.10.1 pour VLAN 10, 192.168.20.1 pour VLAN 20).</blockquote>

        <!-- ==================== MODULE 4 : WI-FI ==================== -->
        <h2 id="m4-wifi">4. Réseaux sans fil — Wi-Fi (IEEE 802.11)</h2>
        <p>Le Wi-Fi repose sur la norme <strong>IEEE 802.11</strong> et utilise un <strong>médium partagé</strong> (ondes radio) : plus il y a d'utilisateurs, plus le débit par appareil diminue.</p>

        <h3 id="m4-normes">Normes 802.11</h3>
        <table>
            <thead><tr><th>Norme IEEE</th><th>Nom Wi-Fi</th><th>Année</th><th>Fréquence</th><th>Débit max</th><th>Portée intérieure</th></tr></thead>
            <tbody>
                <tr><td>802.11a</td><td>Wi-Fi 2</td><td>1999</td><td>5 GHz</td><td>54 Mbit/s</td><td>35 m</td></tr>
                <tr><td>802.11b</td><td>Wi-Fi 1</td><td>1999</td><td>2,4 GHz</td><td>11 Mbit/s</td><td>35 m</td></tr>
                <tr><td>802.11g</td><td>Wi-Fi 3</td><td>2003</td><td>2,4 GHz</td><td>54 Mbit/s</td><td>35 m</td></tr>
                <tr><td>802.11n</td><td>Wi-Fi 4</td><td>2009</td><td>2,4 / 5 GHz</td><td>150 Mbit/s</td><td>250 m</td></tr>
                <tr><td>802.11ac</td><td>Wi-Fi 5</td><td>2013</td><td>5 GHz</td><td>3,5 Gbit/s</td><td>300 m</td></tr>
                <tr><td>802.11ax</td><td>Wi-Fi 6/6E</td><td>2021</td><td>2,4 / 5 / 6 GHz</td><td>9,6 Gbit/s</td><td>300 m</td></tr>
                <tr><td>802.11be</td><td>Wi-Fi 7</td><td>2024</td><td>2,4 / 5 / 6 GHz</td><td>46 Gbit/s</td><td>300 m</td></tr>
            </tbody>
        </table>

        <h3 id="m4-freq">Bandes de fréquences</h3>
        <p><strong>2,4 GHz :</strong> bonne portée, traverse les obstacles, mais très encombrée (Wi-Fi, Bluetooth, micro-ondes). Seulement <strong>3 canaux non superposés</strong> (1, 6, 11). Usage : zones éloignées, entrepôts, mobilité.</p>
        <p><strong>5 GHz :</strong> débits plus élevés, beaucoup moins d'interférences, portée plus courte. 19 à 24 canaux disponibles. Usage : bureaux, salles de réunion, open spaces.</p>
        <blockquote>Réflexe pro : en entreprise, on privilégie le <strong>5 GHz</strong> pour les postes fixes et on conserve le <strong>2,4 GHz</strong> en complément pour la mobilité. Deux AP voisins sur le même canal → débit instable.</blockquote>

        <p><strong>Protocole CSMA/CA</strong> : chaque équipement écoute avant d'émettre pour éviter les collisions. Si le canal est occupé, il attend.</p>

        <p><strong>Modes de fonctionnement :</strong></p>
        <ul>
            <li><strong>Mode Ad hoc</strong> : communication directe entre équipements, sans point d'accès. Usage temporaire, peu sécurisé.</li>
            <li><strong>Mode Infrastructure</strong> : clients connectés à un point d'accès (AP) ↔ réseau filaire. Mode standard en entreprise.</li>
        </ul>

        <p><strong>Topologies Wi-Fi :</strong></p>
        <ul>
            <li><strong>BSS</strong> (Basic Service Set) : 1 point d'accès + ses clients = 1 cellule Wi-Fi</li>
            <li><strong>ESS</strong> (Extended Service Set) : plusieurs BSS avec le même SSID → <strong>roaming</strong> sans coupure</li>
        </ul>
        <p>En entreprise, chaque SSID est associé à un VLAN : SSID "WIFI-ENTREPRISE" → VLAN 20.</p>

        <h3 id="m4-secu">Sécurité Wi-Fi</h3>
        <table>
            <thead><tr><th>Protocole</th><th>Niveau</th><th>Mécanisme</th><th>Usage</th></tr></thead>
            <tbody>
                <tr><td>WEP</td><td>❌ Obsolète — cassable</td><td>Clé statique, IV trop court</td><td>Interdit — ne jamais utiliser</td></tr>
                <tr><td>WPA2/WPA3 + PSK</td><td>⚠️ Moyen</td><td>Mot de passe partagé → clé par session</td><td>Réseau domestique, petite structure</td></tr>
                <tr><td>WPA2/WPA3 + 802.1X (RADIUS)</td><td>✅ Élevé</td><td>Authentification individuelle par compte</td><td>Standard entreprise</td></tr>
            </tbody>
        </table>
        <p><strong>WPA2/WPA3 + RADIUS</strong> : chaque utilisateur s'authentifie avec ses propres identifiants. Le point d'accès interroge un serveur RADIUS, qui autorise ou refuse. Une clé dynamique unique est générée à chaque connexion. Traçabilité et révocation facile.</p>
        <blockquote>Wi-Fi sécurisé en entreprise = <strong>pas de clé partagée</strong>.</blockquote>

        <!-- ==================== MODULE 5 : ACL ==================== -->
        <h2 id="m5-acl">5. Listes de contrôle d'accès (ACL)</h2>
        <p>Une ACL filtre le trafic réseau sur un routeur : qui peut passer, vers où, et avec quel protocole.</p>
        <ul>
            <li>Les règles sont lues <strong>de haut en bas</strong></li>
            <li>Dès qu'une règle correspond, l'action est appliquée et la lecture s'arrête</li>
            <li><strong>Règle implicite finale : <code>deny any</code></strong> — tout ce qui n'est pas explicitement autorisé est bloqué</li>
        </ul>
        <p>Placement sur une interface : <code>IN</code> = trafic entrant | <code>OUT</code> = trafic sortant.</p>

        <h3 id="m5-standard">ACL standard (1–99)</h3>
        <p>Filtre uniquement sur l'<strong>adresse IP source</strong>. Simple mais peu précise. <strong>À placer proche de la destination.</strong></p>
        <pre><code>! Bloquer le réseau 192.168.10.0/24, autoriser tout le reste
R1(config)# access-list 10 deny 192.168.10.0 0.0.0.255
R1(config)# access-list 10 permit any

! Application sur une interface (OUT = en sortie)
R1(config)# interface gigabitEthernet 0/1
R1(config-if)# ip access-group 10 out
R1(config-if)# exit</code></pre>
        <blockquote>Sans le <code>permit any</code>, la règle implicite <code>deny any</code> bloquerait tout le monde.</blockquote>

        <h3 id="m5-etendue">ACL étendue (100–199)</h3>
        <p>Filtre sur IP source, IP destination, protocole et ports. Très précise — norme en entreprise. <strong>À placer proche de la source.</strong></p>
        <pre><code>! Syntaxe
access-list &lt;numéro&gt; &lt;permit|deny&gt; &lt;protocole&gt; &lt;source&gt; &lt;wildcard&gt; &lt;destination&gt; &lt;wildcard&gt; [eq &lt;port&gt;]

! Contexte :
! Réseau utilisateurs : 192.168.10.0/24
! Serveur web : 192.168.20.10
! Objectif : interdire HTTP (port 80) vers le serveur, tout le reste autorisé

! Étape 1 — Création de l'ACL étendue
R1(config)# access-list 100 deny tcp 192.168.10.0 0.0.0.255 host 192.168.20.10 eq 80
R1(config)# access-list 100 permit ip any any

! Étape 2 — Application sur l'interface d'entrée
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip access-group 100 in
R1(config-if)# exit</code></pre>
        <p><strong>Résultat :</strong></p>
        <ul>
            <li>HTTP (port 80) depuis 192.168.10.x → 192.168.20.10 → ❌ bloqué</li>
            <li>SSH, ping, HTTPS → n'importe quelle destination → ✅ autorisé</li>
        </ul>
        <pre><code>! Vérifications
R1# show access-lists
R1# show ip interface gigabitEthernet 0/0</code></pre>

        <h3 id="m5-matrice">La matrice de flux</h3>
        <p>Avant d'écrire la moindre commande ACL, on rédige une <strong>matrice de flux</strong> : un tableau qui décrit les communications autorisées ou interdites.</p>
        <table>
            <thead><tr><th>Source</th><th>Destination</th><th>Protocole</th><th>Port</th><th>Action</th></tr></thead>
            <tbody>
                <tr><td>192.168.10.0/24</td><td>192.168.20.10</td><td>TCP</td><td>80</td><td>✅ PERMIT</td></tr>
                <tr><td>192.168.10.0/24</td><td>192.168.20.10</td><td>TCP</td><td>443</td><td>✅ PERMIT</td></tr>
                <tr><td>192.168.10.0/24</td><td>192.168.30.10</td><td>TCP</td><td>22</td><td>❌ DENY</td></tr>
                <tr><td>any</td><td>any</td><td>IP</td><td>any</td><td>❌ DENY</td></tr>
            </tbody>
        </table>
        <blockquote>Pas de matrice = ACL bancale. Matrice claire = ACL propre et maintenable.</blockquote>

        <!-- ==================== MODULE 6 : NAT ==================== -->
        <h2 id="m6-nat">6. Traduction d'adresses réseau (NAT)</h2>
        <p>Le NAT traduit des adresses IP privées (RFC 1918) en adresses publiques pour accéder à Internet. Le routeur maintient une <strong>table de traduction</strong> pour renvoyer les réponses au bon client interne.</p>

        <h3 id="m6-pat">S-NAT dynamique — PAT (le plus courant)</h3>
        <p>Plusieurs IP privées partagent <strong>une seule IP publique</strong>, différenciées par les numéros de port. C'est le fonctionnement des box Internet et des réseaux d'entreprise.</p>
        <pre><code>! Définir le pool d'adresses internes à traduire
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255

! Marquer l'interface WAN (outside)
R1(config)# interface gigabitEthernet 0/1
R1(config-if)# ip nat outside
R1(config-if)# exit

! Marquer l'interface LAN (inside)
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip nat inside
R1(config-if)# exit

! Activer le NAT PAT (overload = partage de l'IP publique)
R1(config)# ip nat inside source list 1 interface gigabitEthernet 0/1 overload

! Vérifications
R1# show ip nat translations
R1# show ip nat statistics</code></pre>

        <h3 id="m6-statique">S-NAT statique</h3>
        <p>Association fixe entre une IP privée et une IP publique. Configuration manuelle, peu utilisé.</p>
        <pre><code>R1(config)# ip nat inside source static 192.168.1.10 82.65.10.20</code></pre>

        <h3 id="m6-dnat">D-NAT statique — Port Forwarding</h3>
        <p>Rend un <strong>service interne accessible depuis Internet</strong>. Le routeur redirige les connexions entrantes vers un serveur interne précis.</p>
        <pre><code>! Exemple : rediriger HTTPS entrant (port 443) vers le serveur web interne 192.168.20.10

! Marquer les interfaces
R1(config)# interface gigabitEthernet 0/1
R1(config-if)# ip nat outside
R1(config-if)# exit

R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip nat inside
R1(config-if)# exit

! Règle de redirection : IP publique:443 → serveur interne:443
R1(config)# ip nat inside source static tcp 192.168.20.10 443 82.65.10.5 443</code></pre>
        <p><strong>Résultat :</strong> un client Internet qui accède à <code>82.65.10.5:443</code> est automatiquement redirigé vers <code>192.168.20.10:443</code>.</p>

        <h3>Récapitulatif des types de NAT</h3>
        <table>
            <thead><tr><th>Type</th><th>Traduction</th><th>Usage typique</th></tr></thead>
            <tbody>
                <tr><td>S-NAT dynamique (PAT)</td><td>IP privée + port → IP publique + port</td><td>Accès Internet (box, entreprise)</td></tr>
                <tr><td>S-NAT statique</td><td>IP privée fixe → IP publique fixe</td><td>Serveur exposé avec IP dédiée</td></tr>
                <tr><td>D-NAT statique (port forwarding)</td><td>IP publique:port → IP privée:port</td><td>Publication d'un service interne</td></tr>
            </tbody>
        </table>
    `,

    quiz: [
        {
            question: "Un technicien doit configurer un switch Cisco pour la première fois. Il n'a pas d'adresse IP ni d'accès réseau. Quelle est l'unique solution ?",
            options: [
                "Se connecter via SSH avec les identifiants par défaut",
                "Utiliser le port console avec un câble RJ45→USB et PuTTY",
                "Envoyer un ping depuis le réseau pour réveiller l'interface",
                "Réinitialiser l'équipement via le bouton Reset"
            ],
            correctIndex: 1,
            explanation: "Le port console est le seul moyen d'accès initial à un équipement Cisco vierge. Il fonctionne à la couche 1 OSI via un câble console (RJ45 → USB) et un émulateur de terminal (PuTTY). C'est le dernier recours même si le réseau est inaccessible."
        },
        {
            question: "Quelle commande Cisco sauvegarde la configuration active de façon permanente ?",
            options: [
                "SW1# write memory startup",
                "SW1# copy startup-config running-config",
                "SW1# copy running-config startup-config",
                "SW1# save configuration nvram"
            ],
            correctIndex: 2,
            explanation: "'copy running-config startup-config' copie la configuration active (RAM) vers la NVRAM (startup-config). Sans cette étape, toute configuration est perdue au prochain redémarrage."
        },
        {
            question: "Qu'est-ce que le 'flooding' sur un switch et quand se produit-il ?",
            options: [
                "Une attaque DDoS qui sature le réseau avec des trames malveillantes",
                "L'envoi d'une trame sur tous les ports du VLAN sauf celui d'entrée, quand la MAC destination est inconnue",
                "La duplication de toutes les trames sur un port miroir pour analyse",
                "L'envoi de la trame uniquement sur le port associé à la MAC destination connue"
            ],
            correctIndex: 1,
            explanation: "Le flooding est un comportement normal : quand le switch ne connaît pas l'adresse MAC destination dans sa table CAM, il envoie la trame sur tous les ports du VLAN sauf celui d'entrée. Ainsi la trame atteindra sa destination, qui répondra et permettra au switch d'apprendre son emplacement."
        },
        {
            question: "Quelle est la différence essentielle entre un port Access et un port Trunk sur un switch Cisco ?",
            options: [
                "Un port Access est plus rapide qu'un port Trunk",
                "Un port Trunk est utilisé uniquement pour la téléphonie IP",
                "Un port Access appartient à un seul VLAN (pour équipements finaux), un port Trunk transporte plusieurs VLAN (entre équipements réseau)",
                "Un port Access supporte 802.1Q, un port Trunk ne le supporte pas"
            ],
            correctIndex: 2,
            explanation: "Port Access = 1 seul VLAN, pour PC, imprimantes et équipements finaux. Port Trunk = plusieurs VLAN simultanément via 802.1Q, pour les liens switch ↔ switch ou switch ↔ routeur."
        },
        {
            question: "Dans le Router-on-a-stick pour le routage inter-VLAN, à quoi sert la commande 'encapsulation dot1Q 10' ?",
            options: [
                "Elle active le protocole OSPF sur la sous-interface",
                "Elle configure la bande passante de la sous-interface",
                "Elle associe la sous-interface au VLAN 10 en lui indiquant de traiter les trames taguées 802.1Q avec le tag 10",
                "Elle active le chiffrement 802.1Q sur le lien trunk"
            ],
            correctIndex: 2,
            explanation: "La commande 'encapsulation dot1Q 10' associe la sous-interface au VLAN 10. Le routeur décode les trames 802.1Q portant le tag 10 et les traite sur cette sous-interface. C'est le mécanisme qui permet au routeur de distinguer les VLAN sur un seul lien physique trunk."
        },
        {
            question: "Quelle est la règle de placement pour une ACL étendue vs une ACL standard ?",
            options: [
                "ACL standard : proche de la source | ACL étendue : proche de la destination",
                "ACL standard : proche de la destination | ACL étendue : proche de la source",
                "Les deux types se placent toujours sur l'interface WAN",
                "Le placement n'a aucune importance pour les deux types"
            ],
            correctIndex: 1,
            explanation: "ACL standard (filtre sur IP source uniquement) → proche de la DESTINATION pour éviter de bloquer trop large. ACL étendue (filtre précis IP source + destination + protocole + port) → proche de la SOURCE pour bloquer le trafic le plus tôt possible et ne pas charger le réseau inutilement."
        },
        {
            question: "Un réseau 192.168.1.0/24 accède à Internet. Quelle technnique NAT est utilisée par la box Internet pour permettre à toutes les machines internes de partager une seule IP publique ?",
            options: [
                "D-NAT statique (Port Forwarding)",
                "S-NAT statique (association fixe 1:1)",
                "S-NAT dynamique / PAT (Port Address Translation)",
                "OSPF avec route par défaut"
            ],
            correctIndex: 2,
            explanation: "PAT (Port Address Translation), aussi appelé S-NAT dynamique ou 'overload', permet à plusieurs machines internes de partager une seule IP publique en les distinguant par leur numéro de port. C'est le fonctionnement standard de toutes les box Internet."
        },
        {
            question: "En Wi-Fi 2,4 GHz, combien existe-t-il de canaux non superposés ?",
            options: ["1 canal (canal 6 uniquement)", "3 canaux (1, 6, 11)", "7 canaux", "13 canaux"],
            correctIndex: 1,
            explanation: "La bande 2,4 GHz ne dispose que de 3 canaux non superposés : 1, 6 et 11. C'est pourquoi dans les environnements denses (open spaces, logements collectifs), la bande 2,4 GHz est souvent saturée. La bande 5 GHz dispose de 19 à 24 canaux."
        },
        {
            question: "Quel mode de violation Port Security désactive le port en cas d'intrusion physique ?",
            options: ["protect (silencieux)", "restrict (log uniquement)", "block (bloque sans log)", "shutdown (err-disabled)"],
            correctIndex: 3,
            explanation: "Le mode 'shutdown' est le plus sécurisé : le port passe en état err-disabled lors d'une violation. Un administrateur doit manuellement le réactiver (shutdown + no shutdown). Les modes 'restrict' et 'protect' rejettent les trames non autorisées mais laissent le port actif."
        },
        {
            question: "Pourquoi WEP ne doit-il jamais être utilisé pour sécuriser un réseau Wi-Fi ?",
            options: [
                "Il n'est pas compatible avec les équipements modernes",
                "Il est trop lent pour les débits Wi-Fi actuels",
                "Sa clé statique et son vecteur d'initialisation trop court le rendent cassable en quelques minutes",
                "Il n'est pas standardisé par l'IEEE"
            ],
            correctIndex: 2,
            explanation: "WEP (Wired Equivalent Privacy) utilise une clé statique partagée et un vecteur d'initialisation (IV) de 24 bits trop court. Des outils comme aircrack-ng peuvent craquer une clé WEP en quelques minutes en analysant suffisamment de trames. WEP est officiellement obsolète — remplacé par WPA2/WPA3."
        }
    ],

    flashcards: [
        {
            front: "Comment passer du mode utilisateur au mode configuration globale sur Cisco IOS ?",
            back: "Switch> enable\n→ Switch# (mode privilégié)\n\nSwitch# configure terminal\n→ Switch(config)# (mode configuration globale)\n\nSwitch(config)# exit → retour mode précédent\nSwitch(config)# end → retour direct mode privilégié"
        },
        {
            front: "Quelle est la différence entre running-config et startup-config ?",
            back: "running-config : configuration active en RAM\n→ perdue au redémarrage\n\nstartup-config : configuration en NVRAM\n→ persistante au redémarrage\n\nSauvegarder : copy running-config startup-config"
        },
        {
            front: "Quelle commande configure un port Cisco en mode Access pour le VLAN 10 ?",
            back: "SW1(config)# interface fastEthernet 0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW1(config-if)# exit\n\nVérifier : SW1# show vlan brief"
        },
        {
            front: "Comment configurer SSH (et non Telnet) sur les lignes VTY d'un switch Cisco ?",
            back: "SW1(config)# ip domain-name monentreprise.local\nSW1(config)# crypto key generate rsa modulus 2048\nSW1(config)# username admin secret MotDePasse\nSW1(config)# line vty 0 4\nSW1(config-line)# login local\nSW1(config-line)# transport input ssh\nSW1(config)# ip ssh version 2"
        },
        {
            front: "Qu'est-ce que le Router-on-a-stick et pourquoi l'utilise-t-on ?",
            back: "Technique de routage inter-VLAN avec UN SEUL lien physique trunk entre switch et routeur.\n\nPrincipe :\n• Le routeur crée une sous-interface par VLAN\n• Chaque sous-interface = passerelle du VLAN\n• encapsulation dot1Q <id-vlan> associe la sous-interface au VLAN\n\nUsage : routage entre VLAN sans switch L3."
        },
        {
            front: "Quelle est la règle de placement des ACL (standard vs étendue) ?",
            back: "ACL STANDARD (1–99)\n→ Filtre sur IP source uniquement\n→ Placer PROCHE DE LA DESTINATION\n(sinon bloquerait trop large)\n\nACL ÉTENDUE (100–199)\n→ Filtre IP src + IP dst + protocole + port\n→ Placer PROCHE DE LA SOURCE\n(bloquer le plus tôt possible)"
        },
        {
            front: "Quelle est la règle implicite finale de toute ACL Cisco ?",
            back: "deny any\n\nTout trafic non explicitement autorisé est bloqué.\n\nConséquence : toujours terminer une ACL restrictive par 'permit ip any any' si on veut autoriser le reste du trafic. Sans cette ligne, toute l'autre communication serait bloquée."
        },
        {
            front: "Quelle est la différence entre S-NAT PAT et D-NAT port forwarding ?",
            back: "S-NAT PAT (dynamique) :\n→ LAN → Internet\n→ Plusieurs IP privées partagent 1 IP publique via les ports\n→ Commande : ip nat inside source list X interface Y overload\n\nD-NAT Port Forwarding (statique) :\n→ Internet → LAN\n→ Rend un service interne accessible depuis Internet\n→ Commande : ip nat inside source static tcp IP_privée port IP_publique port"
        },
        {
            front: "Quels sont les 3 canaux Wi-Fi non superposés en 2,4 GHz ?",
            back: "Canaux 1, 6 et 11\n\nEn 2,4 GHz, seuls ces 3 canaux ne se chevauchent pas.\n→ Si plus de 3 AP dans une zone : basculer en 5 GHz\n→ 5 GHz : 19 à 24 canaux disponibles, mais portée plus courte\n\nRéflexe : 5 GHz pour postes fixes, 2,4 GHz pour la mobilité."
        },
        {
            front: "Quel protocole Wi-Fi est obligatoire en entreprise pour l'authentification ?",
            back: "WPA2/WPA3 + 802.1X (RADIUS)\n\nChaque utilisateur s'authentifie avec ses propres identifiants.\nLe point d'accès interroge un serveur RADIUS → autorisation ou refus.\nUne clé dynamique unique est générée à chaque connexion.\n\nJamais de clé partagée (PSK) en environnement professionnel.\nWEP = absolument interdit."
        }
    ]
};
