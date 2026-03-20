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
            <li><a href="#unite1">Notions Fondamentales & Diagnostic</a>
                <ol>
                    <li><a href="#osi-flux">Théorie : L'OSI et les Flux</a></li>
                    <li><a href="#diag-context">L'intérêt du diagnostic</a></li>
                </ol>
            </li>
            <li><a href="#unite2">Le Pare-feu (Firewall) & DMZ</a>
                <ol>
                    <li><a href="#fw-theory">Théorie : Filtrage & Actions</a></li>
                    <li><a href="#pfsense">Concepts : pfSense & Services</a></li>
                    <li><a href="#dmz-architecture">La Zone DMZ (Isolation)</a></li>
                </ol>
            </li>
            <li><a href="#unite3">NAT (Network Address Translation)</a>
                <ol>
                    <li><a href="#nat-theory">Théorie : Transition d'adresses</a></li>
                    <li><a href="#nat-types">Types de NAT en entreprise</a></li>
                    <li><a href="#nat-practical">Cas d'usage Outbound & Port Forward</a></li>
                </ol>
            </li>
            <li><a href="#unite4">Proxy & Portail Captif</a>
                <ol>
                    <li><a href="#proxy-theory">Le rôle du Proxy</a></li>
                    <li><a href="#proxy-types">Types de Proxy</a></li>
                    <li><a href="#proxy-context">Pourquoi un Proxy ?</a></li>
                </ol>
            </li>
            <li><a href="#unite5">Certificats & PKI</a>
                <ol>
                    <li><a href="#cert-theory">Théorie : Chiffrement</a></li>
                    <li><a href="#crypto-logic">Fonctionnement du TLS</a></li>
                    <li><a href="#pki-arch">Architecture PKI</a></li>
                    <li><a href="#pki-context">L'intérêt de la PKI</a></li>
                </ol>
            </li>
            <li><a href="#unite6">VPN (Virtual Private Network)</a>
                <ol>
                    <li><a href="#vpn-theory">Théorie : Tunneling</a></li>
                    <li><a href="#vpn-protocols">Comparatif Protocoles</a></li>
                    <li><a href="#vpn-context">Cas d'usage VPN</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">Notions Fondamentales & Diagnostic</h2>

<h3 id="osi-flux">Théorie : L'OSI et la notion de Flux</h3>
<p>Pour sécuriser un réseau, un technicien doit comprendre comment les données circulent. Chaque communication repose sur le modèle OSI et la définition d'un <strong>flux réseau</strong>.</p>

<p>Un flux réseau est caractérisé par un quintuplet unique :</p>

- **Adresse IP source et de destination.**
- **Protocole de transport (TCP ou UDP).**
- **Port source et de destination.**

<h3 id="osi-table">Concepts : Couches OSI et Services</h3>
<p>La sécurité s'applique différemment selon la couche visée. Un pare-feu classique travaille en couches 3 et 4, tandis qu'un Proxy travaille en couche 7.</p>

| Couche | Nom | Protocoles / Adresses | Cible de sécurité |
| :--- | :--- | :--- | :--- |
| **7** | Application | HTTP, DNS, SMTP | Antivirus, Filtrage URL (Proxy) |
| **4** | Transport | TCP, UDP (Ports) | Filtrage par ports (Firewall) |
| **3** | Réseau | IP (Adresses) | Filtrage par IP (Firewall) |
| **2** | Liaison | Ethernet (MAC) | Sécurité de port (Switch) |

<h3 id="diag-context">L'intérêt du diagnostic en entreprise</h3>
<p>En tant qu'administrateur TSSR, le diagnostic n'est pas une simple commande, c'est une étape critique pour la sécurité et la continuité de service :</p>

- **Audit de surface** : Vérifier quels ports sont ouverts sur un serveur permet de s'assurer qu'aucun service non autorisé ne tourne (réduction de la surface d'attaque).
- **Dépannage de connectivité** : Utiliser des outils de résolution nom-vers-IP permet de valider que les serveurs DNS internes ou externes (comme Azure ou AWS) répondent correctement, évitant ainsi des interruptions de service critiques.
- **Validation de flux** : Avant de déclarer une panne pare-feu, le technicien valide que le service écoute localement sur la machine cible.

</section>

<section id="unite2-content">
<h2 id="unite2">Le Pare-feu (Firewall) & DMZ</h2>

<h3 id="fw-theory">Théorie : Le filtrage de flux</h3>
<p>Le pare-feu est le gardien du périmètre. Son rôle est d'autoriser uniquement les communications légitimes. La politique recommandée est le <strong>moindre privilège</strong> : on interdit tout par défaut, puis on ouvre au cas par cas.</p>

<h3 id="fw-actions">Actions et Logique de filtrage</h3>
<p>L'ordre des règles est critique : <strong>la première règle qui correspond est appliquée</strong>, les suivantes sont ignorées.</p>

| Action | Comportement technique | Usage recommandé |
| :--- | :--- | :--- |
| **Permit / Allow** | Laisse passer le paquet. | Flux légitimes (ex: Port 443). |
| **Block / Deny** | Jette le paquet sans répondre (furtif). | Rejet du trafic suspect ou inconnu. |
| **Reject** | Jette le paquet et informe l'émetteur. | Usage interne pour débugger les accès. |

<h3 id="pfsense">pfSense et ses fonctionnalités</h3>
<p>pfSense est une solution robuste basée sur FreeBSD. Il centralise le routage et la sécurité.</p>

| Fonction | Utilité pour le technicien |
| :--- | :--- |
| **Alias** | Groupe des IP/Ports (ex: "SERVEURS_WEB") pour simplifier les règles. |
| **NAT** | Redirige le trafic externe vers des serveurs internes. |
| **Schedules** | Active une règle selon des plages horaires (ex: Internet coupé la nuit). |

<h3 id="dmz-architecture">La DMZ (Demilitarized Zone)</h3>
<p>La DMZ est une zone "tampon" isolée entre Internet et le réseau local (LAN). Elle héberge les services qui doivent être accessibles depuis l'extérieur (Web, Mail).</p>

**Principe de sécurité :**
- LAN → Internet : Autorisé (Port 80/443).
- Internet → DMZ : Autorisé (Port 80/443).
- DMZ → LAN : INTERDIT STRICTEMENT.

</section>

<section id="unite3-content">
<h2 id="unite3">NAT (Network Address Translation)</h2>

<h3 id="nat-theory">Théorie : La translation d'adresses</h3>
<p>Il existe environ 4 milliards (2³²) d'adresses IPv4. Face à la pénurie, le NAT permet de faire communiquer des réseaux utilisant des adresses privées avec le réseau public mondial.</p>

<h3 id="nat-types">Les types de NAT en entreprise</h3>

| Type | Rôle | Contexte d'utilisation |
| :--- | :--- | :--- |
| **SNAT (Source NAT / Masquerade)** | Masque l'IP source interne par l'IP publique du pare-feu. | **Le plus courant** : Permet à tous les employés d'accéder à Internet avec une seule connexion. |
| **DNAT (Destination NAT / Port Forwarding)** | Redirige un port public vers un port privé interne. | **Publication de services** : Rendre un serveur Web ou un serveur de messagerie accessible depuis l'extérieur. |
| **NAT 1:1 (Statics)** | Associe une IP publique entière à une IP privée unique. | **Serveurs dédiés** : Utile quand un serveur nécessite l'ouverture de tous ses ports sur une IP publique propre. |

<h3 id="nat-practical">Pourquoi et quand utiliser chaque NAT ?</h3>
<p>Le choix du NAT impacte directement la sécurité et l'accessibilité du réseau :</p>

- **Outbound NAT (Masquerade / SNAT)** : C'est la configuration par défaut pour la **navigation standard des utilisateurs**. Elle permet de partager une seule IP publique pour des centaines de postes clients, masquant l'architecture interne.
- **Port Forwarding (DNAT)** : C'est l'outil de **publication de services**. On l'utilise pour exposer une application spécifique (ex: port 443 pour un serveur Web) sans exposer l'intégralité du serveur à Internet.
- **NAT 1:1 (IP Mapping)** : On le réserve aux cas particuliers où un serveur doit posséder sa propre identité publique bi-directionnelle (ex: applications legacy, certains serveurs VoIP ou protocoles complexes nécessitant une plage complète de ports).

</section>

<section id="unite4-content">
<h2 id="unite4">Proxy & Portail Captif</h2>

<h3 id="proxy-theory">Le rôle du serveur mandataire</h3>
<p>Le Proxy se place entre les clients et la ressource. Il porte la connexion à leur place pour ajouter une couche de contrôle, de cache ou de protection.</p>

<h3 id="proxy-types">Types de Proxy</h3>

| Type | Emplacement | Fonction principale |
| :--- | :--- | :--- |
| **Proxy Direct** | Devant les clients | Filtrage d'URL (SquidGuard), Cache. |
| **Proxy Transparent** | Invisible pour le client | Intercepte le port 80 sans config logicielle. |
| **Reverse Proxy** | Devant les serveurs | Répartition de charge (Load Balancing), SSL Offloading. |

<h3 id="proxy-context">Pourquoi mettre en place un Proxy ?</h3>
<p>Le déploiement d'un proxy (comme Squid) répond à trois objectifs majeurs en entreprise :</p>

- **Conformité légale** : Bloquer les catégories de sites illicites ou dangereux (via SquidGuard) et conserver les logs de navigation (obligation légale pour l'employeur).
- **Économie de bande passante** : Grâce au cache, les fichiers souvent demandés (mises à jour système, images de sites courants) ne sont téléchargés qu'une seule fois.
- **Authentification** : Forcer les utilisateurs à s'identifier (via un lien avec l'Active Directory) avant de pouvoir accéder au Web, permettant un suivi précis des usages.

</section>

<section id="unite5-content">
<h2 id="unite5">Certificats & PKI</h2>

<h3 id="cert-theory">Théorie : Chiffrement & Authentification</h3>
<p>Un certificat numérique est la carte d'identité d'un serveur. Il repose sur la cryptographie asymétrique (couple clé publique / clé privée).</p>

<h3 id="crypto-logic">Fonctionnement du TLS</h3>
<p>Pour sécuriser une session, TLS combine deux méthodes :</p>

- **Asymétrique (Clé Publique)** : Utilise une paire de clés (Publique/Privée). Exemple : **RSA**. Plus lent, mais idéal pour l'échange initial de clés.
- **Symétrique (Clé Secrète)** : Utilise une seule clé pour chiffrer et déchiffrer. Exemple : **AES** (standard actuel). Très rapide pour le transfert de données.

<h3 id="pki-arch">Architecture PKI</h3>
<p>La PKI gère le cycle de vie des certificats (création → révocation).</p>

| Élément | Rôle |
| :--- | :--- |
| **Root CA** | L'autorité suprême. Elle est souvent <strong>Hors-ligne</strong> pour sa protection. |
| **Intermediate CA** | Délivre les certificats aux serveurs finaux. |
| **CRL / OCSP** | Listes de révocation pour invalider un certificat volé ou expiré. |

<h3 id="pki-context">Pourquoi déployer une PKI interne ?</h3>
<p>Dans un environnement professionnel, la gestion des certificats est au cœur de la confiance :</p>

- **Confiance interne** : Éviter les alertes "Site non sécurisé" sur les applications métiers (intranet, outils RH, gestion de stock) en déployant le certificat de l'autorité racine (Root CA) sur tous les postes.
- **Sécurisation des échanges** : Chiffrer les communications entre serveurs (ex: LDAPS pour l'Active Directory, WinRM over HTTPS pour l'administration à distance).
- **Contrôle d'accès** : Utiliser des certificats clients pour authentifier les utilisateurs sur le Wi-Fi (Radius/802.1X) ou sur le VPN.

</section>

<section id="unite6-content">
<h2 id="unite6">VPN (Virtual Private Network)</h2>

<h3 id="vpn-theory">Théorie : Tunneling & Sécurité</h3>
<p>Le VPN crée un tunnel chiffré sur Internet. Il permet de relier un utilisateur distant (Télétravail) ou un site distant au réseau central de manière sécurisée.</p>

<h3 id="vpn-protocols">Comparatif des Protocoles</h3>

| Protocole | Sécurité | Performances | Remarque |
| :--- | :--- | :--- | :--- |
| **OpenVPN** | Excellente | Moyenne | Très flexible, passe par le port HTTPS (443). |
| **IPSec (L2TP)** | Très Bonne | Bonne | Standard robuste pour les liens inter-sites. |
| **WireGuard** | Excellente | **Optimale** | Ultra-rapide, code léger et moderne. |
| **SSTP** | Bonne | Moyenne | Propriétaire Microsoft, idéal sur port 443. |

<h3 id="vpn-context">Pourquoi choisir quelle solution VPN ?</h3>
<p>Le choix d'une architecture VPN dépend de la structure de l'entreprise :</p>

- **VPN Client-to-Site (Remote Access)** : Indispensable pour le **télétravail**. Chaque collaborateur lance un client VPN (OpenVPN, Cisco AnyConnect) pour rejoindre le réseau interne.
- **VPN Site-to-Site** : Utilisé pour interconnecter deux agences géographiquement distantes. Le tunnel est permanent entre les deux pare-feux, les utilisateurs n'ont rien à lancer localement.
- **L'intérêt principal** : Garantir la confidentialité des données sur un réseau public (Internet) et accéder aux ressources internes (fichiers, applications) comme si l'on était au bureau.

</section>
