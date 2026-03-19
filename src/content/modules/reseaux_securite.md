---
id: "reseaux_securite"
title: "Réseaux et Sécurité"
icon: "🔒"
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
            <li><a href="#unite1">1. Pare-feu (Firewall) & DMZ</a>
                <ol>
                    <li><a href="#fw-logic">Rôle du Pare-feu</a></li>
                    <li><a href="#dmz">La Zone DMZ</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. NAT : Source vs Destination</a></li>
            <li><a href="#unite3">3. Serveurs Proxy</a>
                <ol>
                    <li><a href="#proxy-types">Types de Proxy</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Certificats & PKI</a></li>
            <li><a href="#unite5">5. Réseaux Privés Virtuels (VPN)</a></li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
    <h2 id="unite1">Unité 1 : Pare-feu (Firewall) et DMZ</h2>
    
    <h3 id="fw-logic">1. Rôle du Pare-feu</h3>
    <p>Un pare-feu filtre le trafic réseau selon des règles de sécurité. Il agit comme une barrière entre des réseaux de niveaux de confiance différents.</p>
    <ul>
        <li><strong>Firewall L3/L4 (Stateless/Stateful)</strong> : Filtre sur les adresses IP, les protocoles (TCP/UDP) et les ports.</li>
        <li><strong>Firewall Applicatif (WAF/L7)</strong> : Analyse le contenu des requêtes (ex: requête SQL suspecte dans un formulaire HTTP).</li>
    </ul>

    <h3 id="filtering-rules">2. Règles de filtrage (Implicit Deny)</h3>
    <p>La règle d'or en cybersécurité : <strong>Tout ce qui n'est pas explicitement autorisé est interdit.</strong>
    <br>Chaque flux doit être défini par <strong>Source, Destination, Protocole, Port, Action (Accept/Drop/Reject).</strong></p>

    <h3 id="dmz">3. La Zone Démilitarisée (DMZ)</h3>
    <p>Une DMZ est un sous-réseau isolé contenant les serveurs exposés à Internet (Web, Mail, DNS).
    <br><strong>Principe :</strong> Si un serveur en DMZ est compromis, l'attaquant ne peut pas facilement rebondir vers le réseau interne (LAN) car le pare-feu bloque les flux <strong>DMZ -> LAN.</strong></p>

    <div class="card card--info">
        <h4>Flux types dans une DMZ :</h4>
        <ul>
            <li>✅ Internet -> DMZ (Port 80/443 pour un site Web)</li>
            <li>✅ LAN -> DMZ (Administration des serveurs)</li>
            <li>❌ DMZ -> LAN (Interdit par défaut)</li>
        </ul>
    </div>
</section>

<section id="unite2-content">
    <h2 id="unite2">Unité 2 : NAT : Source vs Destination</h2>
    
    <h3 id="snat">1. SNAT (Source NAT)</h3>
    <p>Modifie l'adresse source. Utilisé pour cacher un réseau privé derrière une IP publique.
    <br><strong>Cas d'usage :</strong> Permettre aux PC internes d'aller sur Internet.</p>

    <h3 id="dnat">2. DNAT / Port Forwarding (Destination NAT)</h3>
    <p>Modifie l'adresse de destination.
    <br><strong>Cas d'usage :</strong> Rendre un serveur interne (ex: 192.168.1.50) accessible depuis l'extérieur sur une IP publique.
    <br><em>Exemple : Toute requête arrivant sur l'IP publique (80.1.2.3) port 443 est redirigée vers (192.168.1.50) port 443.</em></p>
</section>

<section id="unite3-content">
    <h2 id="unite3">Unité 3 : Serveurs Proxy</h2>
    
    <h3 id="proxy-role">1. Fonctionnement</h3>
    <p>Le proxy agit comme un <strong>intermédiaire</strong>. Le client WEB demande la page au Proxy, qui la télécharge sur Internet et la redonne au client.
    <br><strong>Avantages :</strong> Anonymat, Mise en cache (vitesse), Filtrage de contenu (URL), Journalisation des accès.</p>

    <h3 id="proxy-types">2. Types de Proxy</h3>
    <ul>
        <li><strong>Proxy Direct (Forward Proxy)</strong> : Installé côté clients pour sortir sur Internet.</li>
        <li><strong>Proxy Transparent</strong> : Intercepte le trafic sans configuration sur le poste client (via WCCP ou redirection firewall).</li>
        <li><strong>Reverse Proxy</strong> : Installé côté serveurs. Récupère les requêtes Internet pour les distribuer à des serveurs internes (équilibrage de charge, sécurité).</li>
    </ul>

    <h3 id="pac-file">3. Fichier PAC & WPAD</h3>
    <p>Permet au navigateur de trouver automatiquement le serveur proxy sur le réseau.</p>
</section>

<section id="unite4-content">
    <h2 id="unite4">Unité 4 : Certificats Numériques et PKI</h2>
    
    <h3 id="pki-theory">1. Infrastructure de Clés Publiques (PKI)</h3>
    <p>Système gérant les clés et les certificats pour assurer l'<strong>Authenticité</strong>, la <strong>Confidentialité</strong> et l'<strong>Intégrité</strong>.</p>

    <h3 id="ca-role">2. Autorité de Certification (CA)</h3>
    <p>C'est l'organisme de confiance qui signe les certificats (Ex: Let's Encrypt, DigiCert, ou une CA interne Microsoft).</p>

    <h3 id="cert-chain">3. Chaîne de Confiance</h3>
    <p>Pour qu'un certificat soit valide, votre ordinateur doit faire confiance au "Certificat Racine" (Root CA) qui l'a émis. 
    <br><em>Si vous recevez une erreur "Certificat non approuvé", c'est que la CA racine n'est pas installée dans votre magasin de certificats.</em></p>

    <h3 id="revocation">4. Révocation</h3>
    <p>Si une clé est volée, le certificat doit être annulé avant sa date d'expiration via :
    <ul>
        <li><strong>CRL</strong> : Liste noire des certificats révoqués.</li>
        <li><strong>OCSP</strong> : Protocole pour vérifier en temps réel l'état d'un certificat.</li>
    </ul>
</section>

<section id="unite5-content">
    <h2 id="unite5">Unité 5 : Réseaux Privés Virtuels (VPN)</h2>
    
    <h3 id="vpn-concept">1. Le Tunneling</h3>
    <p>Un VPN crée un "tunnel" sécurisé (chiffré) à travers un réseau non sûr (Internet). Il permet de relier deux réseaux distants comme s'ils étaient sur le même LAN.</p>

    <h3 id="vpn-types">2. Types de VPN</h3>
    <ul>
        <li><strong>VPN Site-à-Site</strong> : Relie deux routeurs (ex: Siège et une Agence). Transparent pour les utilisateurs.</li>
        <li><strong>VPN Client-à-Site (Accès Distant)</strong> : Un utilisateur installe un logiciel (ex: FortiClient, Cisco AnyConnect) pour se connecter au serveur VPN de l'entreprise.</li>
    </ul>

    <h3 id="vpn-protocols">3. Protocoles principaux</h3>
    <table>
        <thead><tr><th>Protocole</th><th>Niveau de sécurité</th><th>Usage / Notes</th></tr></thead>
        <tbody>
            <tr><td>PPTP</td><td>Faible (obsolète)</td><td>Ancien, rapide mais vulnérable.</td></tr>
            <tr><td>L2TP / IPsec</td><td>Élevé</td><td>Standard robuste, très utilisé.</td></tr>
            <tr><td>OpenVPN / SSL</td><td>Très Élevé</td><td>Flexible, passe facilement les pare-feux (port 443).</td></tr>
            <tr><td>WireGuard</td><td>Très Élevé</td><td>Moderne, ultra-rapide et sécurisé.</td></tr>
        </tbody>
    </table>
</section>
