/**
 * module3_data.js — Réseaux et Sécurité
 * Source : RESEAUX_ET_SECURITE_clean.md — contenu intégral
 * Niveau expert TSSR
 * NOTE: quiz[] et flashcards[] seront ajoutés dans la passe suivante.
 */

export const module3 = {
    id: 'reseaux_securite',
    title: 'Réseaux et Sécurité',
    icon: '🔒',
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
                    <li><a href="#rappel">1. Rappel réseau</a>
                        <ol>
                            <li><a href="#flux">Notion de flux réseau</a></li>
                            <li><a href="#diag-cmds">Commandes de diagnostic</a></li>
                        </ol>
                    </li>
                    <li><a href="#firewall">2. Le pare-feu</a>
                        <ol>
                            <li><a href="#fw-actions">Actions de filtrage</a></li>
                            <li><a href="#fw-types">Pare-feux courants</a></li>
                            <li><a href="#pfsense">pfSense</a></li>
                        </ol>
                    </li>
                    <li><a href="#nat">3. NAT</a>
                        <ol>
                            <li><a href="#snat">SNAT</a></li>
                            <li><a href="#dnat">DNAT</a></li>
                            <li><a href="#nat11">NAT 1:1</a></li>
                        </ol>
                    </li>
                    <li><a href="#dmz">4. La DMZ</a></li>
                    <li><a href="#proxy">5. Le Proxy</a>
                        <ol>
                            <li><a href="#proxy-types">Types de proxy</a></li>
                            <li><a href="#squid">Squid / SquidGuard</a></li>
                            <li><a href="#captif">Portail captif</a></li>
                        </ol>
                    </li>
                    <li><a href="#certif">6. Certificats numériques</a>
                        <ol>
                            <li><a href="#serveur-web">Serveur web</a></li>
                            <li><a href="#tls">SSL/TLS</a></li>
                            <li><a href="#crypto">Cryptographie</a></li>
                            <li><a href="#hachage">Hachage</a></li>
                            <li><a href="#certif-types">Obtenir un certificat</a></li>
                            <li><a href="#autosigne">Certificat auto-signé</a></li>
                        </ol>
                    </li>
                    <li><a href="#pki">7. PKI</a></li>
                    <li><a href="#vpn">8. VPN</a>
                        <ol>
                            <li><a href="#vpn-types">Types de connexion</a></li>
                            <li><a href="#vpn-proto">Protocoles VPN</a></li>
                        </ol>
                    </li>
                    <li><a href="#glossaire">9. Glossaire</a></li>
                </ol>
            </div>
        </nav>

        <!-- ==================== 1 : RAPPEL RÉSEAU ==================== -->
        <h2 id="rappel">1. Rappel réseau — notions fondamentales</h2>

        <h3>Les couches OSI clés</h3>
        <table>
            <thead><tr><th>Couche</th><th>Nom</th><th>Protocoles / Adresses</th></tr></thead>
            <tbody>
                <tr><td>7</td><td>Application</td><td>HTTP, HTTPS, DNS, SMTP…</td></tr>
                <tr><td>4</td><td>Transport</td><td>TCP, UDP — ports</td></tr>
                <tr><td>3</td><td>Réseau</td><td>IP — adresses IP</td></tr>
                <tr><td>2</td><td>Liaison</td><td>Ethernet — adresses MAC</td></tr>
            </tbody>
        </table>
        <blockquote>Moyen mnémotechnique (de bas en haut) : «&nbsp;Pour Les Réseaux Très Solides, Pensez Application&nbsp;»</blockquote>

        <h3 id="flux">La notion de flux réseau</h3>
        <p>Un <strong>flux réseau</strong> désigne l'ensemble du trafic partageant les mêmes caractéristiques :</p>
        <ul>
            <li>Adresse IP source</li>
            <li>Adresse IP destination</li>
            <li>Protocole (TCP ou UDP)</li>
            <li>Ports source et destination</li>
        </ul>
        <blockquote>Exemple : <code>192.168.1.10:52519 → 185.42.28.200:443</code> = flux TCP vers un service HTTPS.</blockquote>

        <p><strong>Bonnes pratiques ANSSI pour la gestion des flux :</strong></p>
        <ul>
            <li>Segmenter le réseau en zones de confiance</li>
            <li>Créer une DMZ pour les services exposés à Internet</li>
            <li>Appliquer le principe du moindre privilège</li>
            <li>Chiffrer les flux sensibles</li>
            <li>Documenter et surveiller les flux régulièrement</li>
        </ul>

        <h3 id="diag-cmds">Commandes de diagnostic réseau</h3>
        <table>
            <thead><tr><th>Commande</th><th>Linux</th><th>Windows</th><th>Usage</th></tr></thead>
            <tbody>
                <tr><td><code>netstat</code></td><td><code>netstat -anp</code></td><td><code>netstat -b</code></td><td>Connexions actives, ports ouverts, processus associés</td></tr>
                <tr><td><code>ss</code></td><td><code>ss -tunlp</code></td><td>❌ non dispo</td><td>Remplaçant moderne de netstat (plus rapide et précis)</td></tr>
                <tr><td><code>traceroute</code></td><td><code>traceroute 8.8.8.8</code></td><td><code>tracert 8.8.8.8</code></td><td>Affiche les sauts réseau jusqu'à une destination</td></tr>
                <tr><td><code>ping</code></td><td><code>ping 8.8.8.8</code></td><td><code>ping 8.8.8.8</code></td><td>Teste la connectivité réseau via ICMP</td></tr>
                <tr><td><code>telnet</code></td><td><code>telnet 192.168.1.10 22</code></td><td><code>telnet 192.168.1.10 22</code></td><td>Teste si un port distant est accessible</td></tr>
                <tr><td><code>nmap</code></td><td><code>nmap 192.168.1.0/24</code></td><td><code>nmap.exe</code></td><td>Scan de réseau et de ports ouverts</td></tr>
                <tr><td><code>arp</code></td><td><code>arp -n</code></td><td><code>arp -a</code></td><td>Affiche la table ARP (IP ↔ MAC)</td></tr>
                <tr><td><code>route</code></td><td><code>route -n</code></td><td><code>route print</code></td><td>Affiche la table de routage</td></tr>
                <tr><td><code>dig / nslookup</code></td><td><code>dig google.com</code></td><td><code>nslookup google.com</code></td><td>Teste la résolution DNS</td></tr>
                <tr><td><code>ip addr</code></td><td><code>ip addr show</code></td><td><code>ipconfig /all</code></td><td>Informations IP, masque, passerelle, MAC</td></tr>
                <tr><td><code>curl / wget</code></td><td><code>curl http://site.com</code></td><td><code>curl.exe</code></td><td>Teste la réponse HTTP d'un serveur web</td></tr>
            </tbody>
        </table>

        <!-- ==================== 2 : PARE-FEU ==================== -->
        <h2 id="firewall">2. Le pare-feu (Firewall)</h2>
        <p>Un pare-feu est un dispositif matériel ou logiciel qui contrôle et filtre le trafic réseau entrant et sortant selon des règles de sécurité. Son objectif est d'autoriser uniquement les communications légitimes et de bloquer les flux non désirés.</p>

        <h3>Démarche avant de créer des règles</h3>
        <ol>
            <li><strong>Analyser l'infrastructure</strong> : identifier les zones (LAN, DMZ, WAN) et cartographier la topologie</li>
            <li><strong>Schématiser les flux</strong> : représenter visuellement les communications entre zones</li>
            <li><strong>Inventorier les services</strong> : DNS, LDAP, HTTP, SMTP… et leurs ports associés</li>
            <li><strong>Définir la politique de sécurité</strong> : «&nbsp;tout est interdit par défaut&nbsp;» (principe du moindre privilège), puis on autorise uniquement ce qui est nécessaire</li>
            <li><strong>Documenter</strong> : rédiger une matrice de flux et tenir un registre des règles</li>
        </ol>

        <h3 id="fw-actions">Actions possibles sur une règle</h3>
        <table>
            <thead><tr><th>Action</th><th>Comportement</th></tr></thead>
            <tbody>
                <tr><td><strong>Permit / Allow</strong></td><td>Laisse le trafic passer</td></tr>
                <tr><td><strong>Block / Deny</strong></td><td>Bloque silencieusement le paquet (pas de réponse à l'émetteur)</td></tr>
                <tr><td><strong>Reject</strong></td><td>Bloque et envoie un message de refus à la source</td></tr>
            </tbody>
        </table>
        <blockquote>L'ordre des règles est important : la première règle qui correspond est appliquée, les suivantes sont ignorées.</blockquote>

        <h3 id="fw-types">Pare-feux courants</h3>
        <table>
            <thead><tr><th>Pare-feu</th><th>Environnement</th></tr></thead>
            <tbody>
                <tr><td>Windows Firewall</td><td>Windows (postes et serveurs)</td></tr>
                <tr><td>iptables / nftables</td><td>Linux (ligne de commande, intégré au noyau)</td></tr>
                <tr><td>ufw</td><td>Ubuntu / Debian (interface simplifiée pour iptables)</td></tr>
                <tr><td>firewalld</td><td>CentOS / RHEL / Fedora</td></tr>
                <tr><td>pfSense</td><td>FreeBSD / appliance réseau dédiée</td></tr>
            </tbody>
        </table>

        <h3 id="pfsense">pfSense — Fonctionnalités clés</h3>
        <table>
            <thead><tr><th>Fonction</th><th>Description</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><strong>Alias</strong></td><td>Groupement logique d'adresses IP, ports ou réseaux pour simplifier les règles</td><td>Alias «&nbsp;SERVEURS_WEB&nbsp;» = 192.168.1.10 et .11</td></tr>
                <tr><td><strong>IPs virtuelles</strong></td><td>Ajouter des adresses IP supplémentaires sur une interface</td><td>IP secondaire sur WAN pour publier deux sites</td></tr>
                <tr><td><strong>NAT</strong></td><td>Translation d'adresses pour masquer les IP internes ou rediriger le trafic</td><td>Rediriger le port 80 vers un serveur web interne</td></tr>
                <tr><td><strong>Plannings</strong></td><td>Activation/désactivation automatique de règles selon l'heure</td><td>Bloquer Internet la nuit</td></tr>
                <tr><td><strong>Règles de filtrage</strong></td><td>Filtres sur IP, port, protocole, interface…</td><td>«&nbsp;Autoriser HTTP depuis LAN vers WAN&nbsp;»</td></tr>
                <tr><td><strong>QoS</strong></td><td>Priorisation de la bande passante par service ou IP</td><td>Donner la priorité à la VoIP</td></tr>
            </tbody>
        </table>

        <p><strong>Services pfSense associés :</strong></p>
        <table>
            <thead><tr><th>Service</th><th>Rôle</th></tr></thead>
            <tbody>
                <tr><td>DNS Dynamique</td><td>Met à jour automatiquement les enregistrements DNS quand l'IP publique change</td></tr>
                <tr><td>DNS Forwarder</td><td>Transfère les requêtes DNS vers des serveurs DNS externes</td></tr>
                <tr><td>Résolveur DNS</td><td>Serveur DNS local avec mise en cache</td></tr>
                <tr><td>Serveur DHCP</td><td>Attribue automatiquement des adresses IP aux clients</td></tr>
                <tr><td>Relais DHCP</td><td>Transmet les requêtes DHCP entre plusieurs segments réseau</td></tr>
                <tr><td>NTP</td><td>Synchronise l'heure du pare-feu et des clients</td></tr>
                <tr><td>Portail Captif</td><td>Page d'authentification avant l'accès au réseau (Wi-Fi invité)</td></tr>
                <tr><td>SNMP</td><td>Supervision et gestion à distance</td></tr>
                <tr><td>Wake-on-LAN</td><td>Démarre un poste à distance</td></tr>
                <tr><td>Sauvegarde</td><td>Sauvegarde ou restaure la configuration du pare-feu</td></tr>
            </tbody>
        </table>

        <p><strong>Bonnes pratiques pare-feu :</strong></p>
        <ul>
            <li>Refuser par défaut, autoriser uniquement ce qui est nécessaire</li>
            <li>Documenter chaque règle avec son motif et sa date de création</li>
            <li>Tester les flux après chaque modification (ping, telnet, curl)</li>
            <li>Utiliser les alias pour éviter les erreurs et simplifier la maintenance</li>
            <li>Surveiller les logs pour détecter les anomalies</li>
            <li>Maintenir le système à jour</li>
        </ul>

        <!-- ==================== 3 : NAT ==================== -->
        <h2 id="nat">3. Le NAT (Network Address Translation)</h2>
        <p>Le NAT modifie les adresses IP des paquets lors de leur passage à travers un routeur ou un pare-feu. Il permet à des réseaux privés (adresses non routables : 10.x, 172.16-31.x, 192.168.x) de communiquer avec Internet, tout en masquant la structure interne du réseau.</p>

        <h3 id="snat">SNAT (Source NAT) — sortie vers Internet</h3>
        <p>Modifie l'adresse IP <strong>source</strong> des paquets sortants. Permet à plusieurs machines internes d'accéder à Internet via une seule IP publique.</p>
        <pre><code>192.168.1.10 → [NAT] → 83.201.45.120 (IP publique)
La réponse revient sur 83.201.45.120, le NAT la renvoie à 192.168.1.10</code></pre>

        <h3 id="dnat">DNAT (Destination NAT) — publication de service interne</h3>
        <p>Modifie l'adresse IP <strong>destination</strong> des paquets entrants. Permet de rendre un service interne accessible depuis Internet (port forwarding).</p>
        <pre><code>Client Internet (90.1.1.2) → pare-feu (83.201.45.120:80) → serveur web interne (192.168.1.20:80)</code></pre>

        <h3 id="nat11">NAT 1:1</h3>
        <p>Association fixe entre une IP publique et une IP privée. Tous les ports sont traduits dans les deux sens. Utile pour exposer un serveur complet avec sa propre IP publique.</p>

        <h3>Fonctionnement global du NAT</h3>
        <ol>
            <li>Le PC interne envoie une requête vers Internet</li>
            <li>Le pare-feu remplace l'IP source privée par l'IP publique et mémorise la correspondance dans sa table NAT</li>
            <li>Le serveur distant répond à l'IP publique</li>
            <li>Le pare-feu utilise sa table de translation pour renvoyer la réponse à la bonne machine interne</li>
        </ol>
        <table>
            <thead><tr><th>Type</th><th>Ce qui est modifié</th><th>Sens</th><th>Usage</th></tr></thead>
            <tbody>
                <tr><td>SNAT</td><td>Adresse source</td><td>LAN → Internet</td><td>Accès Internet depuis le réseau interne</td></tr>
                <tr><td>DNAT</td><td>Adresse destination</td><td>Internet → LAN</td><td>Publication d'un service interne</td></tr>
                <tr><td>NAT 1:1</td><td>Source ET destination</td><td>Bidirectionnel</td><td>Association complète IP publique ↔ IP privée</td></tr>
            </tbody>
        </table>

        <!-- ==================== 4 : DMZ ==================== -->
        <h2 id="dmz">4. La DMZ (Demilitarized Zone)</h2>
        <p>La DMZ est une zone réseau intermédiaire entre le LAN (réseau interne) et le WAN (Internet). Elle héberge les services accessibles depuis l'extérieur (serveur web, mail, FTP, DNS, VPN…) tout en isolant le réseau interne.</p>
        <p><strong>Principe de sécurité :</strong> si un serveur DMZ est compromis, l'attaquant n'a pas accès au LAN.</p>
        <pre><code>Internet ──[pare-feu WAN]── DMZ ──[pare-feu LAN]── LAN

Exemple de services hébergés en DMZ :
  • Serveur web (Apache / Nginx / IIS)
  • Serveur mail (SMTP entrant)
  • Serveur FTP / SFTP
  • Serveur DNS public
  • Concentrateur VPN</code></pre>

        <h3>Avantages et contraintes</h3>
        <table>
            <thead><tr><th>Avantages</th><th>Contraintes</th></tr></thead>
            <tbody>
                <tr><td>Sécurité renforcée du LAN</td><td>Légère latence supplémentaire</td></tr>
                <tr><td>Segmentation claire du réseau</td><td>Complexité accrue de la configuration</td></tr>
                <tr><td>Contrôle d'accès amélioré</td><td>Charge supplémentaire sur les pare-feux</td></tr>
                <tr><td>Conformité réglementaire facilitée</td><td>Ressources matérielles supplémentaires</td></tr>
            </tbody>
        </table>

        <h3>Fonctionnement technique</h3>
        <ul>
            <li>L'accès depuis Internet vers un service DMZ se fait via une règle <strong>DNAT (port forwarding)</strong></li>
            <li>Le pare-feu redirige le flux entrant vers le serveur DMZ, tout en bloquant tout accès direct au LAN</li>
            <li>Chaque zone (WAN, DMZ, LAN) possède ses propres règles de filtrage</li>
        </ul>
        <p><strong>Bonnes pratiques DMZ :</strong></p>
        <ul>
            <li>Aucune règle «&nbsp;DMZ → LAN&nbsp;» par défaut (isolation stricte)</li>
            <li>Limiter les flux au strict nécessaire (HTTP/HTTPS uniquement si c'est un serveur web)</li>
            <li>Filtrer dans les deux sens (entrant et sortant)</li>
            <li>Maintenir les serveurs DMZ à jour et surveiller leurs logs</li>
            <li>Supprimer tous les services inutiles sur les machines exposées</li>
            <li>Prévoir un pare-feu interne entre DMZ et LAN si possible (double barrière)</li>
        </ul>

        <!-- ==================== 5 : PROXY ==================== -->
        <h2 id="proxy">5. Le Proxy</h2>
        <p>Un proxy est un serveur intermédiaire entre les postes internes et Internet. Il reçoit les requêtes web (HTTP/HTTPS) des clients, les transmet à Internet à leur place, et renvoie les réponses.</p>

        <p><strong>Avantages :</strong></p>
        <ul>
            <li>Masque les adresses IP internes</li>
            <li>Filtre les sites dangereux via des blacklists</li>
            <li>Journalise la navigation (traçabilité)</li>
            <li>Met en cache les pages fréquentes (gain de bande passante)</li>
            <li>Permet d'appliquer des politiques d'accès par utilisateur ou groupe</li>
        </ul>
        <p><strong>Inconvénients :</strong></p>
        <ul>
            <li>Peut ralentir la navigation si mal dimensionné</li>
            <li>Nécessite une maintenance régulière (mises à jour, listes noires)</li>
            <li>Certaines applications HTTPS peuvent contourner le proxy</li>
        </ul>
        <blockquote>En France, la loi impose aux entreprises de conserver les journaux d'accès pendant un an (Code des postes et communications électroniques — article L34-1).</blockquote>

        <h3 id="proxy-types">Types de proxy</h3>
        <table>
            <thead><tr><th>Type</th><th>Fonctionnement</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><strong>Proxy direct (explicite)</strong></td><td>Les postes sont configurés manuellement pour utiliser le proxy</td><td>Navigateur → Proxy → Internet</td></tr>
                <tr><td><strong>Proxy transparent</strong></td><td>Le pare-feu intercepte automatiquement les flux web et les redirige vers le proxy, sans configuration sur les postes</td><td>pfSense intercepte le port 80</td></tr>
                <tr><td><strong>Proxy inverse (reverse proxy)</strong></td><td>Placé devant un serveur interne, protège et distribue le trafic entrant</td><td>Nginx, Traefik, HAProxy</td></tr>
            </tbody>
        </table>

        <h3 id="squid">Squid et SquidGuard sur pfSense</h3>
        <p><strong>Squid</strong> est le proxy le plus utilisé sur pfSense. Il assure :</p>
        <ul>
            <li>La <strong>mise en cache</strong> des contenus web (économise la bande passante)</li>
            <li>Le <strong>contrôle d'accès</strong> (ACL proxy : autoriser/refuser par IP ou domaine)</li>
            <li>La <strong>journalisation</strong> de toutes les requêtes HTTP/HTTPS</li>
            <li>L'inspection SSL (déchiffrement + analyse + rechiffrement) — nécessite une PKI interne</li>
        </ul>
        <p><strong>SquidGuard</strong> complète Squid en ajoutant un <strong>filtrage par catégories de sites</strong> (réseaux sociaux, jeux, contenu adulte, phishing…) via des listes noires (blacklists). Il permet :</p>
        <ul>
            <li>Le blocage par catégories URL (ex : Shallalist, MESD)</li>
            <li>La personnalisation par groupe d'utilisateurs (enfants, employés, invités)</li>
            <li>La redirection vers une page de blocage personnalisée</li>
            <li>Des plannings d'autorisation (ex : réseaux sociaux autorisés de 12h à 13h)</li>
        </ul>

        <h3 id="captif">Le portail captif</h3>
        <p>Un portail captif affiche une page d'authentification avant d'autoriser l'accès à Internet. Utilisé pour les réseaux publics ou invités (Wi-Fi visiteurs, hôtels, écoles).</p>
        <p><strong>Fonctionnement :</strong></p>
        <ol>
            <li>L'utilisateur se connecte au réseau Wi-Fi</li>
            <li>Toute requête HTTP est interceptée et redirigée vers la page de connexion</li>
            <li>L'utilisateur s'identifie (login/mot de passe ou acceptation d'une charte)</li>
            <li>Le pare-feu autorise l'accès Internet une fois l'authentification validée</li>
        </ol>

        <!-- ==================== 6 : CERTIFICATS ==================== -->
        <h2 id="certif">6. Les certificats numériques</h2>

        <h3 id="serveur-web">Le serveur web</h3>
        <p>Un serveur web est un logiciel (et la machine qui le fait tourner) dont le rôle est de fournir des pages ou des ressources à un client via HTTP ou HTTPS.</p>
        <table>
            <thead><tr><th>Serveur</th><th>Système</th><th>Particularités</th></tr></thead>
            <tbody>
                <tr><td>Apache</td><td>Linux, Windows</td><td>Open source, modulaire, très répandu</td></tr>
                <tr><td>Nginx</td><td>Linux, Windows</td><td>Très performant en reverse proxy et forte charge</td></tr>
                <tr><td>IIS (Internet Information Services)</td><td>Windows</td><td>Intégré à Windows Server, gérable via GUI ou PowerShell</td></tr>
            </tbody>
        </table>

        <p><strong>Fonctionnement d'un accès intranet :</strong></p>
        <ol>
            <li>L'utilisateur saisit <code>https://intranet.local</code> dans son navigateur</li>
            <li>Le navigateur interroge le serveur DNS interne</li>
            <li>Le DNS répond avec l'IP du serveur (ex : 192.168.10.10)</li>
            <li>Le navigateur établit une connexion TCP et envoie la requête HTTP</li>
            <li>Le serveur web traite la requête et renvoie la réponse HTTP</li>
            <li>Le navigateur affiche la page</li>
        </ol>

        <p><strong>Modes d'hébergement de plusieurs sites sur un même serveur :</strong></p>
        <table>
            <thead><tr><th>Méthode</th><th>Principe</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td>Par port</td><td>Chaque site écoute sur un port différent</td><td>site1:80, site2:81</td></tr>
                <tr><td>Par adresse IP</td><td>Chaque site a une IP dédiée</td><td>192.168.10.201, .202</td></tr>
                <tr><td>Par FQDN (VirtualHost)</td><td>Le DNS oriente vers le bon site selon le nom de domaine — <strong>méthode la plus utilisée</strong></td><td>intranet.tssr.local, rh.tssr.local</td></tr>
            </tbody>
        </table>

        <h3>Qu'est-ce qu'un certificat numérique ?</h3>
        <p>Un certificat numérique est un document électronique servant à prouver l'identité d'un serveur, d'un utilisateur ou d'une organisation sur un réseau. C'est la «&nbsp;carte d'identité numérique&nbsp;» d'une entité.</p>
        <p>Un certificat permet de :</p>
        <ul>
            <li><strong>Authentifier</strong> le propriétaire (prouver qui il est)</li>
            <li><strong>Chiffrer</strong> les échanges (sécuriser la communication)</li>
            <li><strong>Garantir l'intégrité</strong> (s'assurer que les données n'ont pas été altérées)</li>
        </ul>
        <blockquote>Exemple : quand on visite <code>https://www.impots.gouv.fr</code>, le navigateur vérifie que le certificat TLS du site est valide et délivré à <em>impots.gouv.fr</em> par une autorité de confiance.</blockquote>

        <p><strong>Contenu d'un certificat :</strong></p>
        <table>
            <thead><tr><th>Élément</th><th>Description</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td>Numéro de série</td><td>Identifiant unique</td><td>02:4F:91:BC</td></tr>
                <tr><td>Autorité de certification (CA)</td><td>Entité qui a signé le certificat</td><td>Let's Encrypt</td></tr>
                <tr><td>Période de validité</td><td>Dates de début et d'expiration</td><td>01/01/2025 → 01/01/2026</td></tr>
                <tr><td>Titulaire (Subject)</td><td>Propriétaire du certificat</td><td>CN=www.entreprise.fr</td></tr>
                <tr><td>Clé publique</td><td>Sert au chiffrement</td><td>RSA 2048 bits</td></tr>
                <tr><td>Algorithme de signature</td><td>Hachage utilisé pour signer</td><td>SHA-256</td></tr>
            </tbody>
        </table>

        <h3 id="tls">SSL/TLS — Protocoles de sécurisation</h3>
        <p>SSL (aujourd'hui obsolète) et son successeur <strong>TLS</strong> utilisent les certificats pour sécuriser les échanges réseau.</p>
        <table>
            <thead><tr><th>Objectif</th><th>Description</th></tr></thead>
            <tbody>
                <tr><td>Authentification</td><td>Vérifier l'identité du serveur (et parfois du client)</td></tr>
                <tr><td>Confidentialité</td><td>Chiffrer les données échangées</td></tr>
                <tr><td>Intégrité</td><td>Détecter toute modification des données transmises</td></tr>
            </tbody>
        </table>

        <p><strong>Déroulement d'une connexion HTTPS (TLS handshake) :</strong></p>
        <ol>
            <li>Le client et le serveur échangent leurs informations (certificat côté serveur)</li>
            <li>Le client vérifie le certificat auprès d'une autorité de certification</li>
            <li>Une clé de session symétrique est négociée de façon asymétrique</li>
            <li>Les échanges suivants sont chiffrés avec cette clé symétrique</li>
        </ol>

        <h3 id="crypto">Les deux types de cryptographie</h3>
        <table>
            <thead><tr><th>Type</th><th>Principe</th><th>Usage dans TLS</th></tr></thead>
            <tbody>
                <tr><td><strong>Asymétrique</strong> (clé publique / clé privée)</td><td>Une clé chiffre, l'autre déchiffre</td><td>Authentification et échange de clé de session</td></tr>
                <tr><td><strong>Symétrique</strong> (même clé)</td><td>Une seule clé pour chiffrer et déchiffrer</td><td>Chiffrement des données une fois la session établie</td></tr>
            </tbody>
        </table>
        <p>TLS combine les deux : clés <strong>asymétriques</strong> pour établir la confiance, clé <strong>symétrique</strong> pour chiffrer efficacement la session.</p>

        <p><strong>Algorithmes de chiffrement asymétrique :</strong></p>
        <table>
            <thead><tr><th>Algorithme</th><th>Description</th><th>Taille typique</th></tr></thead>
            <tbody>
                <tr><td>RSA</td><td>Basé sur la factorisation de grands nombres premiers — le plus répandu</td><td>2048 à 4096 bits</td></tr>
                <tr><td>DSA</td><td>Spécialisé pour la signature numérique</td><td>Jusqu'à 3072 bits</td></tr>
                <tr><td>ECDSA / ED25519</td><td>Basés sur les courbes elliptiques — plus rapides et plus compacts</td><td>~256 bits</td></tr>
            </tbody>
        </table>

        <h3 id="hachage">Fonctions de hachage</h3>
        <p>Le hachage transforme des données de taille variable en une empreinte de taille fixe. Une modification même mineure des données produit une empreinte complètement différente.</p>
        <pre><code>"Bonjour" → SHA-256 → 8f8b5f3e7c2e...  (64 caractères hexadécimaux)</code></pre>
        <table>
            <thead><tr><th>Algorithme</th><th>État</th><th>Remarque</th></tr></thead>
            <tbody>
                <tr><td>MD5</td><td>❌ Obsolète</td><td>Vulnérable aux collisions (même hash pour deux messages différents)</td></tr>
                <tr><td>SHA-1</td><td>⚠️ À éviter</td><td>Vulnérable aux attaques de collision</td></tr>
                <tr><td>SHA-256 / SHA-3</td><td>✅ Sécurisé</td><td>Standard actuel recommandé</td></tr>
            </tbody>
        </table>

        <p><strong>Évolutions de TLS :</strong></p>
        <table>
            <thead><tr><th>Version</th><th>Année</th><th>État</th></tr></thead>
            <tbody>
                <tr><td>SSL 2.0</td><td>1995</td><td>❌ Obsolète</td></tr>
                <tr><td>SSL 3.0</td><td>1996</td><td>❌ Obsolète</td></tr>
                <tr><td>TLS 1.0 / 1.1</td><td>1999 / 2006</td><td>❌ Obsolète</td></tr>
                <tr><td>TLS 1.2</td><td>2008</td><td>⚠️ Acceptable mais en déclin</td></tr>
                <tr><td>TLS 1.3</td><td>2018</td><td>✅ Version recommandée</td></tr>
            </tbody>
        </table>
        <p>TLS 1.3 apporte : handshake plus rapide, chiffrement activé plus tôt, suppression des algorithmes faibles.</p>

        <h3 id="certif-types">Comment obtenir un certificat ?</h3>
        <table>
            <thead><tr><th>Méthode</th><th>Usage</th><th>Coût</th></tr></thead>
            <tbody>
                <tr><td>Certificat auto-signé</td><td>Tests, intranet, VPN interne</td><td>Gratuit</td></tr>
                <tr><td>PKI interne (ex : ADCS)</td><td>Entreprise, services internes</td><td>Gratuit (infrastructure à gérer)</td></tr>
                <tr><td>CA publique (Let's Encrypt, DigiCert…)</td><td>Sites accessibles depuis Internet</td><td>Gratuit (Let's Encrypt) ou payant</td></tr>
            </tbody>
        </table>

        <p><strong>Usages des certificats par contexte :</strong></p>
        <table>
            <thead><tr><th>Contexte</th><th>Exemple</th><th>Port</th></tr></thead>
            <tbody>
                <tr><td>Web HTTPS</td><td>https://www.site.com</td><td>443</td></tr>
                <tr><td>Mail sécurisé</td><td>IMAPS, SMTPS, POP3S</td><td>993 / 465 / 995</td></tr>
                <tr><td>Annuaire sécurisé</td><td>LDAPS</td><td>636</td></tr>
                <tr><td>VPN SSL</td><td>OpenVPN</td><td>1194 / 443</td></tr>
            </tbody>
        </table>

        <h3 id="autosigne">Certificat auto-signé</h3>
        <p>Un certificat auto-signé est signé par sa propre clé privée, sans validation par une autorité externe. Le serveur «&nbsp;se certifie lui-même&nbsp;».</p>
        <blockquote>Analogie : c'est comme rédiger et signer sa propre carte d'identité — elle est peut-être authentique, mais personne ne peut le vérifier sans vous connaître.</blockquote>
        <p><strong>Cas d'utilisation légitimes :</strong> intranet d'entreprise, environnements de test, VPN interne.</p>
        <table>
            <thead><tr><th>Avantages</th><th>Inconvénients</th></tr></thead>
            <tbody>
                <tr><td>Gratuit et immédiat à générer</td><td>Non reconnu par les navigateurs (alerte de sécurité)</td></tr>
                <tr><td>Idéal pour les environnements internes</td><td>Ne prouve pas l'identité auprès d'un tiers</td></tr>
                <tr><td>Permet de tester HTTPS sans CA publique</td><td>Doit être ajouté manuellement comme «&nbsp;de confiance&nbsp;» sur les postes</td></tr>
            </tbody>
        </table>
        <p><strong>Bonnes pratiques :</strong></p>
        <ul>
            <li>Limiter l'usage aux environnements internes</li>
            <li>Ne jamais utiliser sur un site public</li>
            <li>Durée de validité courte (≤ 1 an)</li>
            <li>Distribuer le certificat racine via GPO si plusieurs postes doivent lui faire confiance</li>
            <li>Créer une PKI interne si plusieurs certificats sont nécessaires</li>
        </ul>

        <!-- ==================== 7 : PKI ==================== -->
        <h2 id="pki">7. PKI — Infrastructure à Clés Publiques</h2>
        <p>Une PKI (Public Key Infrastructure) est un système complet de gestion de la confiance numérique. Elle gère le cycle de vie des certificats : création, distribution, renouvellement, révocation et vérification.</p>
        <table>
            <thead><tr><th>Objectif</th><th>Description</th></tr></thead>
            <tbody>
                <tr><td>Authentification</td><td>Vérifier que le serveur ou l'utilisateur est bien celui qu'il prétend être</td></tr>
                <tr><td>Confidentialité</td><td>Assurer le chiffrement des échanges via les clés publiques</td></tr>
                <tr><td>Intégrité</td><td>Garantir que les données n'ont pas été altérées</td></tr>
                <tr><td>Non-répudiation</td><td>Empêcher une entité de nier une action signée avec sa clé privée</td></tr>
            </tbody>
        </table>

        <h3>Architecture d'une PKI</h3>
        <p><strong>1. Autorité Racine (Root CA)</strong></p>
        <ul>
            <li>Pilier de confiance de toute la PKI</li>
            <li>Détient la clé privée maîtresse</li>
            <li>Maintenue <strong>hors ligne</strong> pour éviter tout vol</li>
            <li>Signe uniquement les autorités subordonnées</li>
        </ul>
        <p><strong>2. Autorité Subordonnée (Intermediate CA)</strong></p>
        <ul>
            <li>Délivre les certificats aux entités finales</li>
            <li>Peut être multiple (une pour les serveurs, une pour les utilisateurs…)</li>
            <li>Fonctionne en ligne (accessible au réseau interne)</li>
        </ul>
        <p><strong>3. Entités finales</strong> — Serveurs, postes, routeurs ou utilisateurs qui reçoivent un certificat signé.</p>
        <pre><code>Root CA (hors ligne)
├── CA Serveurs → srv-web01.entreprise.local
└── CA Utilisateurs → user-jdupont</code></pre>

        <h3>PKI publique vs PKI interne</h3>
        <table>
            <thead><tr><th>Type</th><th>Description</th><th>Exemples</th><th>Pour / Contre</th></tr></thead>
            <tbody>
                <tr><td>PKI publique</td><td>Certificats reconnus par tous les navigateurs</td><td>Let's Encrypt, DigiCert, GlobalSign</td><td>✅ Reconnue universellement — ❌ Dépend d'Internet</td></tr>
                <tr><td>PKI interne (privée)</td><td>Déployée dans l'entreprise pour usage interne</td><td>ADCS (Windows), OpenSSL</td><td>✅ Gratuite, contrôle total — ❌ Non reconnue à l'extérieur</td></tr>
            </tbody>
        </table>
        <blockquote>Règle simple : PKI publique pour <code>https://www.monentreprise.fr</code>, PKI interne pour <code>https://intranet.local</code>.</blockquote>

        <h3>Intégrations courantes</h3>
        <table>
            <thead><tr><th>Système</th><th>Fonction</th><th>Certificat utilisé</th></tr></thead>
            <tbody>
                <tr><td>IIS / Apache / Nginx</td><td>HTTPS (authentification serveur)</td><td>Certificat serveur signé par la CA</td></tr>
                <tr><td>pfSense</td><td>Accès VPN SSL/TLS</td><td>Certificat client + serveur</td></tr>
                <tr><td>Active Directory / LDAP</td><td>Authentification sécurisée (LDAPS)</td><td>Certificat serveur LDAP</td></tr>
                <tr><td>Outlook / Exchange</td><td>Signature et chiffrement des mails (S/MIME)</td><td>Certificat utilisateur</td></tr>
            </tbody>
        </table>
        <p><strong>Bonnes pratiques PKI :</strong></p>
        <ul>
            <li>Maintenir la Root CA hors ligne (sécurité maximale)</li>
            <li>Protéger les clés privées (HSM, permissions strictes)</li>
            <li>Durées de vie raisonnables (1 à 3 ans)</li>
            <li>Publier et surveiller régulièrement les CRL (listes de révocation)</li>
            <li>Automatiser la distribution via GPO ou scripts</li>
            <li>Documenter la politique de certification</li>
        </ul>

        <!-- ==================== 8 : VPN ==================== -->
        <h2 id="vpn">8. VPN — Connecter les collaborateurs à distance</h2>
        <p>Le VPN (Virtual Private Network) permet à un collaborateur d'accéder au réseau interne de l'entreprise depuis l'extérieur (télétravail, déplacement) de façon sécurisée, comme s'il était physiquement sur site.</p>

        <p><strong>Enjeux :</strong></p>
        <ul>
            <li>Confidentialité des échanges (chiffrement du trafic)</li>
            <li>Intégrité des données (aucune altération possible)</li>
            <li>Authentification des utilisateurs (identité vérifiée)</li>
            <li>Disponibilité des services internes à distance</li>
        </ul>
        <blockquote>Exemple : une technicienne support doit accéder au serveur de ticketing interne (192.168.10.0/24) depuis chez elle. Elle se connecte via VPN et accède aux ressources comme si elle était au bureau.</blockquote>

        <h3>Fonctionnement</h3>
        <p>Un VPN crée un <strong>tunnel chiffré</strong> entre le poste distant et le réseau d'entreprise, sur Internet.</p>
        <ol>
            <li><strong>Tunnelisation</strong> : les paquets IP sont encapsulés dans un autre protocole</li>
            <li><strong>Chiffrement</strong> : le contenu du tunnel est chiffré (TLS, IPSec…)</li>
            <li><strong>Authentification</strong> : l'identité de l'utilisateur est vérifiée avant l'accès</li>
        </ol>
        <p>Couches OSI impliquées : Couche 3 (encapsulation des paquets IP) + Couche 4 (chiffrement TLS ou IPSec).</p>

        <h3 id="vpn-types">Types de connexion VPN</h3>
        <table>
            <thead><tr><th>Type</th><th>Description</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><strong>Site à site</strong></td><td>Lien permanent entre deux réseaux distants</td><td>Siège ↔ Succursale</td></tr>
                <tr><td><strong>Client à site</strong></td><td>Utilisateur distant accède au réseau d'entreprise</td><td>Télétravailleur ↔ Bureau</td></tr>
            </tbody>
        </table>

        <h3 id="vpn-proto">Protocoles VPN</h3>
        <table>
            <thead><tr><th>Protocole</th><th>Avantages</th><th>Inconvénients</th><th>Usage recommandé</th></tr></thead>
            <tbody>
                <tr><td><strong>PPTP</strong></td><td>Simple, intégré à Windows</td><td>Obsolète, non sécurisé</td><td>❌ À ne plus utiliser</td></tr>
                <tr><td><strong>L2TP/IPSec</strong></td><td>Sécurité robuste (IPSec), compatible tous OS</td><td>Double encapsulation, moins rapide</td><td>Sécurité prioritaire</td></tr>
                <tr><td><strong>IKEv2/IPSec</strong></td><td>Très rapide, reconnexion automatique, stable</td><td>Support limité sur anciens OS</td><td>Mobiles, postes nomades</td></tr>
                <tr><td><strong>SSTP</strong></td><td>Passe par le port 443 (HTTPS), contourne les pare-feux</td><td>Propriétaire Microsoft</td><td>Réseaux filtrés, environnements 100% Windows</td></tr>
                <tr><td><strong>OpenVPN</strong></td><td>Très sécurisé, hautement configurable, multi-OS</td><td>Configuration plus technique</td><td>✅ Usage général, recommandé en entreprise</td></tr>
                <tr><td><strong>WireGuard</strong></td><td>Code léger, très rapide, moderne</td><td>Moins mature, support limité sur certains systèmes</td><td>Performances optimales, sécurité moderne</td></tr>
            </tbody>
        </table>

        <!-- ==================== 9 : GLOSSAIRE ==================== -->
        <h2 id="glossaire">9. Glossaire</h2>
        <table>
            <thead><tr><th>Terme</th><th>Définition</th></tr></thead>
            <tbody>
                <tr><td><strong>NAT</strong></td><td>Mécanisme de translation d'adresses IP (privées ↔ publiques) pour permettre l'accès à Internet depuis un réseau local</td></tr>
                <tr><td><strong>DMZ</strong></td><td>Zone réseau intermédiaire entre Internet et le LAN, hébergeant les serveurs accessibles depuis l'extérieur</td></tr>
                <tr><td><strong>Pare-feu</strong></td><td>Dispositif filtrant les flux réseau selon des règles (adresses, ports, protocoles)</td></tr>
                <tr><td><strong>Proxy</strong></td><td>Serveur intermédiaire qui relaie, filtre, journalise et met en cache les accès web</td></tr>
                <tr><td><strong>HTTPS</strong></td><td>HTTP sécurisé par TLS (chiffrement des échanges entre navigateur et serveur)</td></tr>
                <tr><td><strong>IPSec</strong></td><td>Suite de protocoles assurant confidentialité, intégrité et authentification sur un réseau IP</td></tr>
                <tr><td><strong>SSL / TLS</strong></td><td>Protocoles cryptographiques sécurisant les échanges. SSL est obsolète, TLS 1.2/1.3 est le standard actuel</td></tr>
                <tr><td><strong>Certificat numérique</strong></td><td>Document électronique garantissant l'identité d'une entité et la validité de sa clé publique</td></tr>
                <tr><td><strong>PKI</strong></td><td>Infrastructure gérant le cycle de vie des certificats (émission, révocation, validation)</td></tr>
                <tr><td><strong>CA</strong></td><td>Autorité de certification délivrant et signant les certificats numériques</td></tr>
                <tr><td><strong>VPN</strong></td><td>Tunnel chiffré permettant de relier des utilisateurs ou sites distants de façon sécurisée sur Internet</td></tr>
                <tr><td><strong>IDS / IPS</strong></td><td>Systèmes analysant le trafic pour détecter (IDS) ou bloquer (IPS) les intrusions</td></tr>
                <tr><td><strong>ZTNA</strong></td><td>Zero Trust Network Access — modèle où aucun utilisateur n'est présumé fiable par défaut</td></tr>
                <tr><td><strong>pfSense</strong></td><td>Distribution open source (FreeBSD) servant de pare-feu, routeur et serveur VPN</td></tr>
                <tr><td><strong>Squid</strong></td><td>Proxy web open source (cache, filtrage, journalisation)</td></tr>
                <tr><td><strong>SquidGuard</strong></td><td>Extension de Squid pour le filtrage par catégories d'URL</td></tr>
                <tr><td><strong>Wireshark</strong></td><td>Analyseur de paquets réseau pour inspecter les échanges en temps réel</td></tr>
            </tbody>
        </table>
    `,

    quiz: [
        {
            question: "Quelle est la différence fondamentale entre les actions 'Block/Deny' et 'Reject' sur un pare-feu ?",
            options: [
                "Block bloque uniquement UDP, Reject bloque uniquement TCP",
                "Block bloque silencieusement (pas de réponse à l'émetteur), Reject bloque et envoie un message de refus à la source",
                "Block est utilisé sur pfSense, Reject sur iptables uniquement",
                "Block et Reject sont identiques, seul le nom varie selon les éditeurs"
            ],
            correctIndex: 1,
            explanation: "Block/Deny abandonne silencieusement le paquet — l'émetteur ne sait pas si sa requête est bloquée ou si la destination n'existe pas (timeout). Reject renvoie un message TCP RST ou ICMP 'Port Unreachable', informant immédiatement l'émetteur du refus. En sécurité, Block est généralement préféré car il ne révèle pas l'existence du filtre."
        },
        {
            question: "Un serveur web interne (192.168.1.20) doit être accessible depuis Internet sur le port 80. Quel type de NAT configurer sur le pare-feu ?",
            options: [
                "SNAT (Source NAT) — l'IP source du serveur est masquée",
                "NAT 1:1 — toutes les IP internes sont associées à une IP publique",
                "DNAT (Destination NAT) — le pare-feu redirige le port 80 vers l'IP interne",
                "PAT (Port Address Translation) — partagé avec tous les clients LAN"
            ],
            correctIndex: 2,
            explanation: "DNAT modifie l'adresse IP de DESTINATION des paquets entrants. Quand un client Internet envoie une requête sur l'IP publique:80, le pare-feu la redirige vers 192.168.1.20:80. C'est du 'port forwarding'. SNAT c'est l'inverse : il modifie la SOURCE pour masquer les IP internes (accès LAN → Internet)."
        },
        {
            question: "Quel est le principe de sécurité fondamental de la DMZ ?",
            options: [
                "La DMZ chiffre toutes les communications entre Internet et le LAN",
                "Si un serveur DMZ est compromis, l'attaquant ne peut pas accéder au LAN grâce à l'isolation par le pare-feu interne",
                "La DMZ permet d'accélérer les connexions Internet en mettant en cache les ressources",
                "La DMZ remplace le VLAN en segmentant logiquement le réseau interne"
            ],
            correctIndex: 1,
            explanation: "La DMZ est une zone tampon entre Internet (WAN) et le réseau interne (LAN). Aucune règle 'DMZ → LAN' n'est autorisée par défaut. Si un serveur web en DMZ est piraté, l'attaquant est bloqué par le pare-feu interne et ne peut pas atteindre les postes ou serveurs du LAN. La DMZ contient la compromission."
        },
        {
            question: "Quelle commande Linux permet de lister les connexions réseau actives avec les processus associés, en remplacement moderne de netstat ?",
            options: [
                "netstat -anp",
                "nmap -sS localhost",
                "ss -tunlp",
                "arp -n"
            ],
            correctIndex: 2,
            explanation: "'ss -tunlp' (socket statistics) est le remplaçant moderne de netstat sur Linux. Il est plus rapide, plus précis et directement intégré aux noyaux modernes. '-t' = TCP, '-u' = UDP, '-n' = numérique, '-l' = en écoute, '-p' = processus associé. Sur Windows, on utilise 'netstat -b' pour voir les processus."
        },
        {
            question: "Quelle est la différence entre un proxy direct et un proxy transparent ?",
            options: [
                "Le proxy direct est plus sécurisé, le proxy transparent n'inspecte pas le HTTPS",
                "Le proxy direct nécessite une configuration manuelle sur les postes. Le proxy transparent intercepte automatiquement le trafic sans configuration sur les postes (via le pare-feu)",
                "Le proxy direct fonctionne sur HTTP uniquement, le proxy transparent sur HTTPS",
                "Le proxy direct utilise Squid, le proxy transparent utilise SquidGuard"
            ],
            correctIndex: 1,
            explanation: "Proxy direct (explicite) : le navigateur est configuré manuellement pour pointer vers l'adresse du proxy. Proxy transparent : le pare-feu (pfSense par exemple) intercepte automatiquement tout le trafic sur le port 80/443 et le redirige vers le proxy — sans aucune configuration sur les postes clients. Le proxy transparent est invisible pour les utilisateurs."
        },
        {
            question: "Lors d'un TLS handshake HTTPS, dans quel ordre se succèdent les étapes clés ?",
            options: [
                "Chiffrement symétrique → vérification du certificat → échange de clé asymétrique",
                "Échange d'informations + certificat → vérification CA → négociation clé symétrique → chiffrement des données",
                "Génération de la clé symétrique → envoi du certificat → authentification de l'utilisateur",
                "Chiffrement RSA de toutes les données → vérification SHA-256 → handshake final"
            ],
            correctIndex: 1,
            explanation: "Le TLS handshake se déroule en 4 phases : 1) Client Hello + Server Hello + envoi du certificat serveur. 2) Le client vérifie le certificat auprès de la CA. 3) Négociation d'une clé de session symétrique via mécanisme asymétrique (RSA ou ECDH). 4) Toutes les données suivantes sont chiffrées avec la clé symétrique (plus rapide que l'asymétrique)."
        },
        {
            question: "Pourquoi l'algorithme de hachage MD5 est-il interdit dans les certificats modernes ?",
            options: [
                "Il est trop lent pour les serveurs à forte charge",
                "Il est vulnérable aux collisions : deux messages différents peuvent produire le même hash",
                "Il génère des hash trop courts (16 bits) facilement devinables",
                "Il n'est pas supporté par OpenSSL depuis 2015"
            ],
            correctIndex: 1,
            explanation: "MD5 est vulnérable aux attaques de collision : il est possible de créer deux documents différents produisant le même hash MD5. Cela compromet l'intégrité (on peut falsifier un certificat sans changer son empreinte). SHA-1 est également à éviter. Le standard actuel est SHA-256 (ou SHA-3), qui produit une empreinte de 256 bits résistante aux collisions connues."
        },
        {
            question: "Pourquoi la Root CA d'une PKI interne est-elle maintenue hors ligne ?",
            options: [
                "Pour économiser de l'énergie et réduire les coûts d'infrastructure",
                "Parce que la Root CA n'a pas besoin d'être connectée : elle signe uniquement les CA subordonnées lors de cérémonies planifiées",
                "La Root CA est trop ancienne pour être connectée aux réseaux modernes",
                "Pour respecter les normes ANSSI qui imposent une Root CA physiquement isolée dans chaque datacenter"
            ],
            correctIndex: 1,
            explanation: "La Root CA détient la clé privée maîtresse — si elle est compromise, toute la hiérarchie de confiance s'effondre. En la maintenant hors ligne (air-gapped), on la protège contre les attaques réseau. Elle ne signe que les Intermediate CA lors de cérémonies rares et planifiées. Ce sont les CA intermédiaires, elles en ligne, qui délivrent les certificats quotidiens."
        },
        {
            question: "Quel protocole VPN est recommandé en entreprise pour un usage général multi-OS ?",
            options: [
                "PPTP — simple et intégré nativement à Windows",
                "SSTP — passe par le port 443, contourne tous les pare-feux",
                "OpenVPN — très sécurisé, open source, hautement configurable, multi-OS",
                "WireGuard — le plus rapide mais encore immature"
            ],
            correctIndex: 2,
            explanation: "OpenVPN est le standard recommandé en entreprise : open source, multi-OS (Windows, Linux, macOS, iOS, Android), hautement configurable, utilise TLS pour le chiffrement et supporte des méthodes d'authentification robustes (certificats, MFA). PPTP est interdit (cassé). SSTP est propriétaire Microsoft. WireGuard est excellent mais moins mature pour les grands déploiements d'entreprise."
        },
        {
            question: "Quel est le rôle de SquidGuard complétant Squid sur pfSense ?",
            options: [
                "SquidGuard remplace Squid et gère directement le cache des pages web",
                "SquidGuard ajoute un filtrage par catégories d'URL (réseaux sociaux, malware, etc.) et par groupes d'utilisateurs via des listes noires",
                "SquidGuard chiffre toutes les connexions HTTP via SSL avant de les transmettre à Squid",
                "SquidGuard supervise les performances réseau et génère des graphiques de consommation de bande passante"
            ],
            correctIndex: 1,
            explanation: "Squid est le proxy (cache + contrôle d'accès + journalisation). SquidGuard est une extension qui ajoute le filtrage par catégories d'URL via des listes noires (ex : Shallalist). Il permet de bloquer des catégories entières (réseaux sociaux, jeux, contenu adulte, phishing) et d'adapter les règles par groupe d'utilisateurs ou selon des plannings horaires."
        }
    ],

    flashcards: [
        {
            front: "Quels sont les trois types de NAT et leurs usages distincts ?",
            back: "SNAT (Source NAT)\n→ Modifie l'IP SOURCE sortante\n→ LAN → Internet (masquage d'IP privées)\n→ Ex : box Internet = SNAT/PAT\n\nDNAT (Destination NAT)\n→ Modifie l'IP DESTINATION entrante\n→ Internet → serveur interne (port forwarding)\n→ Ex : port 80 public → serveur web interne\n\nNAT 1:1\n→ Association fixe IP publique ↔ IP privée\n→ Bidirectionnel, tous les ports\n→ Ex : serveur avec son propre IP publique"
        },
        {
            front: "Qu'est-ce que la DMZ et pourquoi est-elle indispensable ?",
            back: "Zone réseau INTERMÉDIAIRE entre Internet et le LAN.\n\nArchitecture :\nInternet ── [FW WAN] ── DMZ ── [FW LAN] ── LAN\n\nServices hébergés en DMZ :\n• Serveur web, mail, FTP, DNS public, VPN\n\nPrincipe clé : si un serveur DMZ est compromis\n→ l'attaquant ne peut PAS accéder au LAN\n\nRègle de base : AUCUNE règle DMZ → LAN par défaut."
        },
        {
            front: "Quelle est la différence entre un proxy direct, transparent et inverse ?",
            back: "Proxy direct (explicite)\n→ Postes configurés manuellement pour pointer vers le proxy\n→ Navigateur → Proxy → Internet\n\nProxy transparent\n→ Le pare-feu intercepte automatiquement le trafic\n→ Aucune config sur les postes clients\n→ pfSense intercepte le port 80/443\n\nProxy inverse (reverse proxy)\n→ DEVANT un serveur interne\n→ Protège et distribue le trafic entrant\n→ Ex : Nginx, HAProxy, Traefik"
        },
        {
            front: "Quel est le rôle de Squid et de SquidGuard sur pfSense ?",
            back: "SQUID (proxy)\n• Mise en cache des contenus web\n• Journalisation de toutes les requêtes HTTP\n• Contrôle d'accès (ACL proxy)\n• Inspection SSL (déchiffrement + analyse)\n\nSQUIDGUARD (filtrage URL)\n• Filtrage par CATÉGORIES de sites\n• Via listes noires (Shallalist, MESD...)\n• Gestion par groupes d'utilisateurs\n• Plannings horaires (réseaux sociaux 12h-13h)\n• Page de blocage personnalisée"
        },
        {
            front: "Comment fonctionne le TLS handshake lors d'une connexion HTTPS ?",
            back: "1. Client Hello + Server Hello\n   → Le serveur envoie son CERTIFICAT\n\n2. Vérification du certificat\n   → Le client vérifie l'authenticité via la CA\n\n3. Négociation de la clé de session\n   → Mécanisme ASYMÉTRIQUE (RSA/ECDH)\n   → Une clé SYMÉTRIQUE unique est générée\n\n4. Échanges chiffrés\n   → Toutes les données utilisent la clé SYMÉTRIQUE\n   (plus rapide que l'asymétrique)\n\nTLS combine les deux : asymétrique pour la confiance,\nsymétrique pour l'efficacité."
        },
        {
            front: "MD5, SHA-1, SHA-256 — lequel utiliser et pourquoi ?",
            back: "MD5 → ❌ INTERDIT\n  Vulnérable aux collisions\n  (deux fichiers différents, même hash)\n\nSHA-1 → ⚠️ À ÉVITER\n  Vulnérable aux attaques de collision\n  Retiré des navigateurs modernes\n\nSHA-256 / SHA-3 → ✅ STANDARD ACTUEL\n  Empreinte de 256 bits\n  Résistant aux collisions connues\n  Obligatoire pour les certificats TLS\n\nRappel : le hachage transforme n'importe quelle donnée\nen une empreinte de taille FIXE. Le moindre changement\nmodifie radicalement l'empreinte."
        },
        {
            front: "Quelle est l'architecture d'une PKI interne ?",
            back: "Root CA (HORS LIGNE)\n• Signe uniquement les CA subordonnées\n• Clé privée maîtresse → jamais exposée au réseau\n• Stockée sur support chiffré, dans un coffre\n\nCA Subordonnée / Intermédiaire (EN LIGNE)\n• Délivre les certificats aux entités finales\n• Une CA par usage possible\n  (CA Serveurs / CA Utilisateurs)\n\nEntités finales\n• Serveurs web, postes, routeurs, utilisateurs\n\nRoot CA\n├── CA Serveurs → srv-web01.local\n└── CA Utilisateurs → user-jdupont"
        },
        {
            front: "Quand utiliser un certificat auto-signé vs une PKI publique vs une PKI interne ?",
            back: "Certificat AUTO-SIGNÉ\n→ Tests, dev, intranet isolé\n→ Gratuit, immédiat\n→ ⚠️ Non reconnu par les navigateurs\n→ Doit être importé manuellement sur les postes\n\nPKI INTERNE (ADCS, OpenSSL)\n→ Services internes (intranet.local, LDAPS, VPN)\n→ Gratuit, contrôle total\n→ Distribution via GPO\n→ Non reconnue hors de l'entreprise\n\nCA PUBLIQUE (Let's Encrypt, DigiCert)\n→ Sites accessibles depuis Internet\n→ Let's Encrypt = gratuit + automatisé\n→ Reconnue par tous les navigateurs"
        },
        {
            front: "Quels sont les protocoles VPN à utiliser (et à éviter) en entreprise ?",
            back: "À ÉVITER :\n❌ PPTP — cassé, obsolète\n\nACCEPTABLES :\n⚠️ L2TP/IPSec — robuste mais double encapsulation\n⚠️ IKEv2/IPSec — rapide, nomadisme\n⚠️ SSTP — port 443, mais propriétaire Microsoft\n\nRECOMMANDÉS :\n✅ OpenVPN — standard entreprise multi-OS\n✅ WireGuard — ultra-rapide, moderne\n\nTypes :\n• Site à site : Siège ↔ Succursale (lien permanent)\n• Client à site : Télétravailleur ↔ Bureau"
        },
        {
            front: "Quelle est la politique de base pour créer les règles d'un pare-feu ?",
            back: "PRINCIPE DU MOINDRE PRIVILÈGE :\n→ Tout est REFUSÉ par défaut\n→ On autorise uniquement ce qui est NÉCESSAIRE\n\nDémarche avant de créer les règles :\n1. Analyser l'infrastructure (zones LAN/DMZ/WAN)\n2. Schématiser les flux entre zones\n3. Inventorier les services et ports\n4. Définir la politique (deny all par défaut)\n5. Documenter chaque règle (motif + date)\n\nPour tester :\n• ping, telnet <ip> <port>, curl http://...\n\nRègle implicite finale : DENY ALL\n→ Comme les ACL Cisco"
        }
    ],

    exercises: [
        {
            id: 'm3_ex1',
            title: 'Analyse de Flux',
            stars: 1,
            description: 'Identifier un flux réseau.',
            instruction: 'Un serveur web en DMZ (172.16.0.10) doit interroger un serveur LDAP interne (192.168.1.50). Quel port doit être ouvert sur le pare-feu interne ?',
            hint: 'Le LDAP standard utilise le port 389.',
            correction: 'TCP 389',
            explanation: 'Le flux part de la DMZ vers le LAN sur le port TCP 389 (LDAP).'
        },
        {
            id: 'm3_ex2',
            title: 'Translation NAT',
            stars: 2,
            description: 'Choisir le bon type de NAT.',
            instruction: 'On veut que tous les PCs du LAN (192.168.1.0/24) puissent naviguer sur le web en utilisant l\'unique adresse IP publique du routeur. Quel NAT configurer ?',
            hint: 'On modifie la source des paquets sortants.',
            correction: 'SNAT (ou Masquerade)',
            explanation: 'Le Source NAT (SNAT) permet de masquer les adresses privées derrière une adresse publique.'
        },
        {
            id: 'm3_ex-gen',
            title: 'Expert Sécurité (Générateur)',
            stars: 5,
            description: 'Générateur de scénarios complexes : Firewall, VPN, Proxy.',
            isGenerator: true,
            scenarios: [
                {
                    instruction: 'Scénario : Un utilisateur se plaint de ne pas pouvoir accéder à son VPN OpenVPN. Vous voyez dans les logs pfSense que le trafic arrivant sur le port UDP 1194 est "Blocked". Quelle action manque-t-il ?',
                    hint: 'Vérifiez les règles de l\'interface WAN.',
                    correction: 'Créer une règle Allow sur l\'interface WAN pour le port UDP 1194',
                    explanation: 'Par défaut, pfSense bloque tout ce qui arrive sur le WAN. Il faut explicitement autoriser le port du service VPN.'
                },
                {
                    instruction: 'Scénario : Vous devez isoler un serveur de base de données. Doit-il être placé en DMZ ou dans le LAN ?',
                    hint: 'La DMZ est pour les services exposés à Internet.',
                    correction: 'LAN (ou zone Database isolée)',
                    explanation: 'Un serveur de base de données ne doit jamais être exposé directement. Il reste dans le LAN ou une zone privée, accessible uniquement par le serveur web (en DMZ).'
                },
                {
                    instruction: 'Scénario : Quel enregistrement DNS permet de vérifier qu\'un serveur mail est autorisé à envoyer des messages pour un domaine ?',
                    hint: 'C\'est un enregistrement de type TXT.',
                    correction: 'SPF',
                    explanation: 'L\'enregistrement SPF (Sender Policy Framework) liste les adresses IP autorisées à envoyer des mails pour le domaine.'
                },
                {
                    instruction: 'Scénario : Un certificat SSL auto-signé provoque une erreur "Connexion non sécurisée" dans Chrome. Est-ce normal ?',
                    hint: 'Pensez à la chaîne de confiance.',
                    correction: 'Oui',
                    explanation: 'Chrome ne fait pas confiance aux certificats auto-signés car ils ne sont pas validés par une autorité de certification (CA) reconnue.'
                }
            ]
        }
    ]
};

