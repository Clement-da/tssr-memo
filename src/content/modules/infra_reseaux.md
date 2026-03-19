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
                </ol>
            </li>
            <li><a href="#unite2">2. Commutation (Switching) & VLANs</a>
                <ol>
                    <li><a href="#mode-ports">Types de ports</a></li>
                    <li><a href="#vlan-inter-routing">Routage Inter-VLAN</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Routage IP</a>
                <ol>
                    <li><a href="#static-routing">Routage Statique</a></li>
                    <li><a href="#dynamic-routing">Routage Dynamique (OSPF)</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Réseaux Wi-Fi</a></li>
            <li><a href="#unite5">5. Sécurité : ACLs</a></li>
            <li><a href="#unite6">6. NAT (Network Address Translation)</a></li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
    <h2 id="unite1">Unité 1 : Configuration initiale & Fondamentaux Cisco</h2>
    
    <h3 id="ios-modes">1. Les modes de l'IOS Cisco</h3>
    <p>L'administration d'un équipement Cisco se fait via une hiérarchie de modes de commande :</p>
    <ul>
        <li><strong>Mode Utilisateur (User EXEC)</strong> : <code>Router></code> — Consultation limitée.</li>
        <li><strong>Mode Privilégié (Privileged EXEC)</strong> : <code>Router#</code> — Diagnostic et accès à la config. <em>Commande : <code>enable</code></em>.</li>
        <li><strong>Mode Configuration Globale</strong> : <code>Router(config)#</code> — Modification des paramètres système. <em>Commande : <code>configure terminal</code></em>.</li>
        <li><strong>Sous-modes de configuration</strong> : <code>Router(config-if)#</code> (interface), <code>Router(config-line)#</code> (console/VTY).</li>
    </ul>

    <h3 id="basic-config">2. Configuration de base (Sécurisation)</h3>
    <pre><code class="language-cisco">Router> enable
Router# configure terminal
Router(config)# hostname R1-SITES-PROD
R1-SITES-PROD(config)# enable secret password123  ! Chiffre le mot de passe privilège
R1-SITES-PROD(config)# line console 0
R1-SITES-PROD(config-line)# password consolepwd
R1-SITES-PROD(config-line)# login
R1-SITES-PROD(config-line)# exit
R1-SITES-PROD(config)# service password-encryption ! Chiffre tous les mots de passe en clair</code></pre>

    <h3 id="save-config">3. Gestion de la configuration</h3>
    <ul>
        <li><strong>Running-config</strong> : Config actuelle en RAM (perdue au redémarrage).</li>
        <li><strong>Startup-config</strong> : Config de démarrage en NVRAM.</li>
        <li><strong>Sauvegarder :</strong> <code>copy running-config startup-config</code> (ou <code>write memory</code>).</li>
    </ul>
</section>

<section id="unite2-content">
    <h2 id="unite2">Unité 2 : Commutation (Switching) et VLANs</h2>
    
    <h3 id="vlan-theory">1. Pourquoi les VLANs (Virtual LAN) ?</h3>
    <p>Un VLAN permet de découper un switch physique en plusieurs réseaux logiques indépendants.
    <br><strong>Avantages :</strong> Sécurité (isolation), réduction du trafic broadcast, flexibilité géographique.</p>

    <h3 id="mode-ports">2. Types de ports</h3>
    <ul>
        <li><strong>Mode Access</strong> : Relie un équipement final (PC, Imprimante). Le port appartient à <strong>un seul VLAN</strong>.</li>
        <li><strong>Mode Trunk (802.1Q)</strong> : Relie deux switches ou un routeur. Transporte <strong>tous les VLANs</strong> en ajoutant un "tag" (étiquette) à la trame.</li>
    </ul>

    <h3 id="config-vlan">3. Configuration des VLANs</h3>
    <pre><code class="language-cisco">! Création du VLAN
SW1(config)# vlan 10
SW1(config-vlan)# name COMPTABILITE

! Affectation d'un port
SW1(config)# interface f0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10

! Configuration d'un Trunk
SW1(config)# interface g0/1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20</code></pre>

    <h3 id="vlan-inter-routing">4. Routage Inter-VLAN (Router-on-a-Stick)</h3>
    <p>Pour que le VLAN 10 parle au VLAN 20, il faut un routeur. On utilise une seule interface physique découpée en <strong>sous-interfaces logiques</strong>.</p>
    <pre><code class="language-cisco">R1(config)# interface g0/0.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.254 255.255.255.0</code></pre>
</section>

<section id="unite3-content">
    <h2 id="unite3">Unité 3 : Routage IP</h2>
    
    <h3 id="routing-logic">1. Fonctionnement d'un routeur</h3>
    <p>Un routeur reçoit un paquet, regarde l'<strong>IP destination</strong>, consulte sa <strong>table de routage</strong> et le réexpédie sur l'interface appropriée vers le <strong>prochain saut (Next Hop)</strong>.</p>

    <h3 id="static-routing">2. Routage Statique</h3>
    <p>Définir manuellement le chemin. Fiable mais pas flexible.</p>
    <pre><code class="language-cisco">! ip route [Reseau_Dest] [Masque] [IP_Prochain_Saut]
R1(config)# ip route 10.0.2.0 255.255.255.0 192.168.1.2</code></pre>

    <h3 id="dynamic-routing">3. Routage Dynamique (OSPF)</h3>
    <p>Les routeurs s'échangent leurs tables automatiquement. OSPF est le standard en entreprise.</p>
    <pre><code class="language-cisco">R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0</code></pre>

    <h3 id="diag-routing">4. Commandes de Diagnostic</h3>
    <ul>
        <li><code>show ip route</code> : Affiche la table de routage.</li>
        <li><code>show ip interface brief</code> : État des ports et IPs.</li>
        <li><code>ping</code> / <code>traceroute</code> : Test de connectivité et chemin.</li>
    </ul>
</section>

<section id="unite4-content">
    <h2 id="unite4">Unité 4 : Réseaux Sans-Fil (Wi-Fi)</h2>
    
    <h3 id="wifi-standards">1. Normes 802.11</h3>
    <table>
        <thead><tr><th>Norme</th><th>Fréquence</th><th>Débit max théorique</th></tr></thead>
        <tbody>
            <tr><td>802.11g</td><td>2.4 GHz</td><td>54 Mbps</td></tr>
            <tr><td>802.11n (Wi-Fi 4)</td><td>2.4 / 5 GHz</td><td>600 Mbps</td></tr>
            <tr><td>802.11ac (Wi-Fi 5)</td><td>5 GHz</td><td>3.4 Gbps</td></tr>
            <tr><td>802.11ax (Wi-Fi 6)</td><td>2.4 / 5 / 6 GHz</td><td>9.6 Gbps</td></tr>
        </tbody>
    </table>

    <h3 id="wifi-security">2. Sécurité Wi-Fi</h3>
    <ul>
        <li><strong>WPA2-PSK (AES)</strong> : Standard actuel basé sur une clé partagée.</li>
        <li><strong>WPA3</strong> : Nouvelle norme, résistance accrue aux attaques par force brute.</li>
        <li><strong>WPA2-Enterprise (802.1X)</strong> : Authentification via un serveur <strong>RADIUS</strong> (un compte par utilisateur).</li>
    </ul>

    <h3 id="wifi-arch">3. Architectures</h3>
    <ul>
        <li><strong>Autonome (Fat AP)</strong> : Chaque borne est configurée individuellement.</li>
        <li><strong>Centralisée (Lightweight AP + WLC)</strong> : Un contrôleur (WLC) gère toutes les bornes.</li>
    </ul>
</section>

<section id="unite5-content">
    <h2 id="unite5">Unité 5 : Sécurité : Listes de Contrôle d'Accès (ACL)</h2>
    
    <h3 id="acl-types">1. Standard vs Étendue</h3>
    <ul>
        <li><strong>ACL Standard (1-99)</strong> : Filtre uniquement sur l'<strong>IP Source</strong>. À placer au plus près de la destination.</li>
        <li><strong>ACL Étendue (100-199)</strong> : Filtre sur IP Source, IP Destination, <strong>Protocoles</strong> et <strong>Ports</strong>. À placer au plus près de la source.</li>
    </ul>

    <h3 id="acl-rules">2. Règles d'or</h3>
    <ul>
        <li>Une ACL se lit de haut en bas. Dès qu'une règle matche, l'action (Permit/Deny) est prise et on s'arrête.</li>
        <li><strong>Implicit Deny Any</strong> : À la fin de chaque ACL, il y a un "Refus de tout" invisible.</li>
    </ul>

    <pre><code class="language-cisco">! Bloquer le HTTP (80) de l'hôte 1.10 vers le serveur 2.50
R1(config)# access-list 101 deny tcp host 192.168.1.10 host 192.168.2.50 eq 80
R1(config)# access-list 101 permit ip any any  ! Autoriser le reste

! Appliquer sur l'interface
R1(config)# interface g0/0
R1(config-if)# ip access-group 101 in</code></pre>
</section>

<section id="unite6-content">
    <h2 id="unite6">Unité 6 : NAT (Network Address Translation)</h2>
    
    <h3 id="nat-purpose">1. Utilité</h3>
    <p>Le NAT permet de masquer un réseau privé (ex: 192.168.x.x) derrière une seule adresse IP publique (ex: 80.x.x.x). C'est ce qui permet d'économiser les adresses IPv4 sur Internet.</p>

    <h3 id="pat">2. PAT (Port Address Translation / Overload)</h3>
    <p>C'est la forme de NAT la plus utilisée. Elle utilise les numéros de ports pour différencier les connexions des différents PC internes.</p>

    <pre><code class="language-cisco">! 1. Définir le trafic à traduire
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255

! 2. Définir l'interface interne et externe
R1(config)# interface g0/0 (LAN)
R1(config-if)# ip nat inside
R1(config)# interface g0/1 (Internet)
R1(config-if)# ip nat outside

! 3. Activer le NAT Overload
R1(config)# ip nat inside source list 1 interface g0/1 overload</code></pre>
</section>
