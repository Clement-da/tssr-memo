---
id: "systemes_microsoft"
title: "Systèmes Clients Microsoft"
icon: "💻"
---

<!-- SOMMAIRE FLOTTANT -->
<nav class="lesson-toc" aria-label="Sommaire de la leçon">
    <div class="lesson-toc__tab" aria-hidden="true">
        <span class="lesson-toc__tab-icon">📋</span>
        Plan du cours
    </div>
    <div class="lesson-toc__body">
        <h3 class="lesson-toc__title">Sommaire</h3>
        <ol class="lesson-toc__list">
            <li><a href="#unite1">1. Fondamentaux & Rôles de l'OS</a>
                <ol>
                    <li><a href="#roles-os">Rôles de l'OS</a></li>
                    <li><a href="#structure-os">Structure d'un OS</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. L'écosystème Windows</a>
                <ol>
                    <li><a href="#waas">Windows as a Service</a></li>
                    <li><a href="#editions-win">Éditions Windows</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Installation & Migration</a></li>
            <li><a href="#unite4">4. Gestion du Stockage</a></li>
            <li><a href="#unite5">5. Utilisateurs & Groupes</a></li>
            <li><a href="#unite6">6. Sécurité NTFS et ACLs</a></li>
            <li><a href="#unite7">7. Partage Réseau & Accès Distant</a></li>
            <li><a href="#unite8">8. Système d'Impression</a></li>
            <li><a href="#unite9">9. Maintenance & Diagnostics</a>
                <ol>
                    <li><a href="#monitor">Les 4 piliers du monitoring</a></li>
                </ol>
            </li>
            <li><a href="#unite10">10. Industrialisation & Déploiement</a>
                <ol>
                    <li><a href="#sysprep">Le Sysprep</a></li>
                    <li><a href="#tools-deploy">Outils de déploiement</a></li>
                </ol>
            </li>
            <li><a href="#unite11">11. Registre Windows</a></li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
    <h2 id="unite1">Unité 1 : Fondamentaux et Rôles de l'OS</h2>
    <p>Un <strong>système d'exploitation (Operating System — OS)</strong> est le logiciel fondamental d'un équipement informatique. Il fait l'interface entre l'utilisateur (et ses applications) et le matériel physique. Sans lui, aucune application ne peut s'exécuter.</p>

    <h3 id="roles-os">1. Rôles principaux de l'OS</h3>
    <p>L'OS agit comme un médiateur et un gestionnaire de ressources :</p>
    <table>
        <thead><tr><th>Ressource</th><th>Ce que l'OS gère</th></tr></thead>
        <tbody>
            <tr><td><strong>Processeur (CPU)</strong></td><td>Répartit le temps CPU entre les processus (multitâche).</td></tr>
            <tr><td><strong>Mémoire (RAM)</strong></td><td>Alloue et libère la mémoire, empêche un programme d'en écraser un autre.</td></tr>
            <tr><td><strong>Stockage</strong></td><td>Organise les fichiers via le système de fichiers, contrôle les droits d'accès.</td></tr>
            <tr><td><strong>Périphériques</strong></td><td>Pilote clavier, souris, imprimante, carte réseau via des pilotes (drivers).</td></tr>
            <tr><td><strong>Sécurité</strong></td><td>Gère les comptes, les droits d'accès, les restrictions.</td></tr>
        </tbody>
    </table>
    <blockquote><strong>Exemple concret :</strong> Quand on imprime un document Excel, Excel demande de la mémoire à Windows, Windows vérifie les droits NTFS lors de la lecture du fichier, puis utilise le pilote d'imprimante pour lancer l'impression. Excel ne parle jamais directement au matériel.</blockquote>

    <h3 id="structure-os">2. Structure d'un OS</h3>
    <p>Un OS peut être vu comme quatre couches complémentaires :</p>
    <ul>
        <li><strong>Noyau (Kernel)</strong> : Cœur du système, seul composant qui parle directement au matériel.</li>
        <li><strong>Interface</strong> : Graphique (GUI) pour l'utilisateur ou ligne de commande (CLI) pour l'administration.</li>
        <li><strong>Shell / Commandes</strong> : CMD, PowerShell — permettent de piloter le système par scripts.</li>
        <li><strong>Système de fichiers</strong> : NTFS sur Windows — organise les données et gère la sécurité.</li>
    </ul>

    <h3 id="familles-os">3. Familles d'OS</h3>
    <ul>
        <li><strong>Windows</strong> : Postes clients et serveurs en entreprise.</li>
        <li><strong>Linux</strong> : Serveurs, équipements réseau, Cloud, serveurs Web.</li>
        <li><strong>macOS</strong> : Matériel Apple uniquement.</li>
        <li><strong>Android / iOS</strong> : Terminaux mobiles.</li>
        <li><strong>OS embarqués</strong> : Routeurs, imprimantes, box internet, IoT.</li>
    </ul>
</section>

<section id="unite2-content">
    <h2 id="unite2">Unité 2 : L'écosystème Windows</h2>
    
    <h3 id="waas">1. Windows as a Service (WaaS)</h3>
    <p>Depuis Windows 10, Microsoft adopte un modèle de <strong>mise à jour continue</strong> plutôt que des versions majeures espacées de plusieurs années.</p>
    <table>
        <thead><tr><th>Notion</th><th>Définition</th></tr></thead>
        <tbody>
            <tr><td><strong>Build</strong></td><td>Version identifiée par un numéro (ex : 22H2 pour le second semestre 2022).</td></tr>
            <tr><td><strong>Feature Update</strong></td><td>Nouvelle build majeure, publiée généralement une fois par an.</td></tr>
            <tr><td><strong>Quality Update</strong></td><td>Correctifs de sécurité (Published on <strong>Patch Tuesday</strong>, 2ème mardi du mois).</td></tr>
        </tbody>
    </table>
    <p><strong>🚨 Attention :</strong> Chaque build a sa propre date de <strong>fin de support</strong>. Un poste sous une build obsolète ne reçoit plus de correctifs de sécurité.</p>

    <h3 id="editions-win">2. Éditions de Windows 10/11</h3>
    <p>Le choix de l'édition est critique pour la gestion en entreprise :</p>
    <div class="grid-2">
        <div class="card card--warning">
            <h4>Windows Famille (Home)</h4>
            <ul>
                <li>❌ Pas de jonction à un domaine AD</li>
                <li>❌ Pas de stratégies de groupe (GPO)</li>
                <li>❌ Pas de BitLocker (chiffrement)</li>
                <li>❌ Gestion centralisée impossible</li>
            </ul>
        </div>
        <div class="card card--success">
            <h4>Windows Professionnel</h4>
            <ul>
                <li>✅ Jonction domaine AD & Azure AD</li>
                <li>✅ Application des GPO</li>
                <li>✅ BitLocker & Chiffrement</li>
                <li>✅ Accès Bureau à distance (Hôte)</li>
            </ul>
        </div>
    </div>

    <h3 id="licences">3. Licences Windows</h3>
    <table>
        <thead><tr><th>Type</th><th>Description</th><th>Usage typique</th></tr></thead>
        <tbody>
            <tr><td><strong>OEM</strong></td><td>Liée au matériel (carte mère) — non transférable.</td><td>PC constructeur (HP, Dell).</td></tr>
            <tr><td><strong>Retail</strong></td><td>Transférable sur un autre PC après désinstallation.</td><td>Vente boîte.</td></tr>
            <tr><td><strong>MAK</strong></td><td>Clé volume, nombre d'activations limité.</td><td>Petites structures.</td></tr>
            <tr><td><strong>KMS</strong></td><td>Serveur interne d'activation automatique.</td><td>Grandes entreprises.</td></tr>
            <tr><td><strong>CAL</strong></td><td>Client Access License : Droit d'accéder aux services serveurs.</td><td><strong>Obligatoire par utilisateur</strong>.</td></tr>
        </tbody>
    </table>
</section>

<section id="unite3-content">
    <h2 id="unite3">Unité 3 : Installation et Migration</h2>
    
    <h3 id="pre-requis">1. Architecture 32 bits vs 64 bits</h3>
    <p>En entreprise, on installe <strong>toujours du 64 bits (x64)</strong>. Windows 11 ne propose plus de version 32 bits.</p>
    <ul>
        <li><strong>Mémoire</strong> : 32 bits est limité à ~3,2 Go de RAM. 64 bits supporte jusqu'à plusieurs To.</li>
        <li><strong>Exécution</strong> : Un OS 64 bits peut exécuter du 32 bits, mais l'inverse est faux.</li>
    </ul>

    <h3 id="supports">2. Supports et méthodes</h3>
    <p>Windows s'installe depuis une image <strong>install.wim</strong> via partition USB, ISO ou réseau (WDS / PXE). Le support contient <strong>Windows PE (WinPE)</strong>, un environnement minimal utilisé pour lancer l'installation ou réparer le système.</p>

    <h3 id="usmt">3. Migration des données (USMT)</h3>
    <p><strong>USMT (User State Migration Tool)</strong> est l'outil spécialisé pour migrer les profils en masse lors du renouvellement de PC :</p>
    <ol>
        <li><code>scanstate</code> : Capture l'état (données, paramètres, profil) sur le poste source.</li>
        <li><code>loadstate</code> : Restaure cet état sur le poste cible.</li>
    </ol>
</section>

<section id="unite4-content">
    <h2 id="unite4">Unité 4 : Gestion du Stockage</h2>
    <p>La préparation d'un disque suit 4 étapes : <strong>Disque brute > Partitionnement > Formatage > Système de fichiers.</strong></p>

    <h3 id="mbr-gpt">1. Table de partitions : MBR vs GPT</h3>
    <table>
        <thead><tr><th>Critère</th><th>MBR (Hérité)</th><th>GPT (Moderne)</th></tr></thead>
        <tbody>
            <tr><td><strong>Taille max</strong></td><td>2 To</td><td>Illimitée</td></tr>
            <tr><td><strong>Partitions</strong></td><td>4 principales max</td><td>128 partitions</td></tr>
            <tr><td><strong>Standard</strong></td><td>BIOS</td><td>UEFI (Obligatoire Win 11)</td></tr>
        </tbody>
    </table>

    <h3 id="fs">2. Les Systèmes de Fichiers</h3>
    <ul>
        <li><strong>FAT32</strong> : Universel, idéal pour clés USB, mais fichiers limités à 4 Go et <strong>aucune sécurité</strong>.</li>
        <li><strong>NTFS</strong> : Standard Windows. Gère les droits, les quotas, le chiffrement et les gros fichiers.</li>
        <li><strong>ReFS</strong> : Pour les serveurs. Conçu pour la résilience aux pannes et le stockage massif.</li>
    </ul>
</section>

<section id="unite5-content">
    <h2 id="unite5">Unité 5 : Utilisateurs et Groupes</h2>
    
    <h3 id="sid">1. L'identité système : le SID</h3>
    <p>Windows identifie les comptes par leur <strong>SID (Security Identifier)</strong> — un ID unique interne — et non par leur nom. Si vous supprimez "Jean" et le recréez, il aura un nouveau SID et perdra ses droits.</p>

    <h3 id="types-comptes">2. Types et Portée des comptes</h3>
    <ul>
        <li><strong>Compte local</strong> : Valable uniquement sur une machine.</li>
        <li><strong>Compte de domaine</strong> : Géré centralement par l'Active Directory. Valable sur tout le parc.</li>
        <li><strong>Compte Microsoft</strong> : Lié aux services Cloud (OneDrive, Outlook).</li>
    </ul>

    <h3 id="profils">3. Profil utilisateur</h3>
    <p>L'environnement personnel est stocké dans <code>C:\\Users\\NomUtilisateur</code>. Il est chargé à l'ouverture de session.</p>

    <h3 id="groupes-regles">4. Gestion des groupes</h3>
    <p><strong>Addition des droits :</strong> Un utilisateur cumule les droits de tous les groupes dont il fait partie. 
    <br><strong>Priorité du refus :</strong> Un refus explicite l'emporte toujours sur une autorisation.</p>
</section>

<section id="unite6-content">
    <h2 id="unite6">Unité 6 : Sécurité NTFS et ACLs</h2>
    <p>NTFS permet un contrôle granulaire via les <strong>ACL (Access Control List)</strong>.</p>

    <h3 id="structure-acl">1. DACL et ACE</h3>
    <p>Chaque fichier possède une <strong>DACL</strong> (liste de règles). Chaque ligne de cette liste est une <strong>ACE</strong> qui définit un droit (ex : "Utilisateurs : Lecture").</p>

    <h3 id="heritage-flux">2. Héritage et Déplacements</h3>
    <table>
        <thead><tr><th>Opération</th><th>Même volume</th><th>Différents volumes</th></tr></thead>
        <tbody>
            <tr><td><strong>Copie</strong></td><td>Hérite de la destination</td><td>Hérite de la destination</td></tr>
            <tr><td><strong>Déplacement</strong></td><td><strong>Conserve ses droits</strong></td><td>Hérite de la destination</td></tr>
        </tbody>
    </table>

    <h3 id="bonnes-pratiques-ntfs">3. Bonnes pratiques TSSR</h3>
    <ul>
        <li>✅ Assigner les droits à des <strong>groupes</strong>, jamais à des individus.</li>
        <li>✅ Limiter les <strong>Refus explicites</strong> (difficiles à débugger).</li>
        <li>✅ Préférer la modification du parent pour utiliser l'<strong>héritage</strong>.</li>
        <li>✅ Utiliser l'onglet <strong>Accès effectif</strong> pour vérifier le résultat final.</li>
    </ul>
</section>

<section id="unite7-content">
    <h2 id="unite7">Unité 7 : Partage Réseau et Accès Distant</h2>
    
    <h3 id="partage-ntfs">1. Partage vs NTFS : Le Droit Effectif</h3>
    <p>Pour un accès réseau, le droit final est <strong>le plus restrictif</strong> des deux.</p>
    <p><em>Exemple : Partage (Contrôle Total) + NTFS (Lecture seule) = Accès réel en Lecture seule.</em></p>

    <h3 id="methodes-partage">2. Outils de gestion</h3>
    <ul>
        <li><strong>fsmgmt.msc</strong> : Console pour voir les dossiers partagés et les sessions actives.</li>
        <li><strong>PowerShell</strong> : <code>New-SmbShare</code> pour créer un partage.</li>
        <li><strong>UNC</strong> : <code>\\\\Serveur\\NomDuPartage</code>.</li>
    </ul>

    <h3 id="rdp">3. Bureau à distance (RDP - Port 3389)</h3>
    <p>Ouvre une session Windows complète. Ne pas confondre avec une simple prise de contrôle d'écran.</p>
    <ul>
        <li><strong>NLA (Network Level Authentication)</strong> : Obligatoire pour authentifier l'utilisateur avant d'ouvrir la session graphique (anti-DoS).</li>
        <li><strong>MSTSC</strong> : La commande pour lancer le client de connexion.</li>
    </ul>
</section>

<section id="unite8-content">
    <h2 id="unite8">Unité 8 : Système d'Impression</h2>
    <p>Formule magique : <strong>Imprimante = Pilote + Port.</strong></p>
    <ul>
        <li><strong>Spouleur</strong> : Service <code>spooler</code> qui gère la file d'attente.</li>
        <li><strong>Pool d'impression</strong> : Une seule imprimante logicielle pour plusieurs machines physiques identiques (répartition de charge).</li>
        <li><strong>Serveur d'impression</strong> : Centralisation des pilotes et des files d'attente via <code>printmanagement.msc</code>.</li>
    </ul>
</section>

<section id="unite9-content">
    <h2 id="unite9">Unité 9 : Maintenance et Diagnostics</h2>
    
    <h3 id="monitor">1. Les 4 piliers du monitoring</h3>
    <ul>
        <li><strong>CPU</strong> : <code>taskmgr</code> pour les processus.</li>
        <li><strong>RAM</strong> : <code>resmon</code> pour voir les fuites mémoire.</li>
        <li><strong>Disque</strong> : <code>eventvwr</code> pour les erreurs matérielles (ID 7, 11).</li>
        <li><strong>Réseau</strong> : <code>netstat</code> pour les connexions actives.</li>
    </ul>

    <h3 id="diag-tools">2. Outils de diagnostic experts</h3>
    <table>
        <thead><tr><th>Outil</th><th>Lancement</th><th>Usage</th></tr></thead>
        <tbody>
            <tr><td><strong>Observateur d'évènements</strong></td><td><code>eventvwr.msc</code></td><td>Journaux Système, Sécurité et Application.</td></tr>
            <tr><td><strong>Analyseur de performances</strong></td><td><code>perfmon.msc</code></td><td>Compteurs précis et rapports d'état stable.</td></tr>
            <tr><td><strong>Moniteur de ressources</strong></td><td><code>resmon.exe</code></td><td>Analyse temps réel Disque/Réseau/CPU/RAM.</td></tr>
        </tbody>
    </table>

    <h3 id="winre-secours">3. WinRE (Environnement de secours)</h3>
    <p>Accessible en cas d'échec de démarrage (3 fois de suite ou via Maj+Redémarrer). Permet :</p>
    <ul>
        <li><strong>Mode sans échec</strong> : Pilotes minimaux pour dépannage.</li>
        <li><strong>Restauration système</strong> : Revenir à un état antérieur (<strong>FIFO</strong>, pas de données utilisateurs sauvegardées).</li>
        <li><strong>Invite de commandes</strong> : Réparation du BCD ou fichiers système.</li>
    </ul>
</section>

<section id="unite10-content">
    <h2 id="unite10">Unité 10 : Industrialisation et Déploiement</h2>
    
    <h3 id="le-master">1. Cycle de création d'un Master</h3>
    <ol>
        <li>Installer l'OS de base.</li>
        <li>Configurer les paramètres globaux.</li>
        <li>Installer les applications métiers validées.</li>
        <li>Exécuter <strong>Sysprep</strong>.</li>
    </ol>

    <h3 id="sysprep">2. Sysprep (System Preparation)</h3>
    <p>Prépare Windows au clonage. Sans lui, tous les postes auraient le même SID.</p>
    <ul>
        <li><code>/generalize</code> : Supprime le SID et le nom de machine.</li>
        <li><code>/oobe</code> : Force l'assistant de démarrage au prochain lancement.</li>
    </ul>

    <h3 id="tools-deploy">3. Outils de déploiement</h3>
    <ul>
        <li><strong>DISM</strong> : Manipulation des fichiers <code>.WIM</code> (Capture, Montage, Injection de pilotes).</li>
        <li><strong>WDS (Windows Deployment Services)</strong> : Distribution d'images via le réseau (PXE).</li>
        <li><strong>MDT (Microsoft Deployment Toolkit)</strong> : Automatisation avancée.</li>
    </ul>

    <h4 id="dism-commands">Commandes DISM essentielles :</h4>
    <pre><code class="language-cmd"># Capturer une image C: vers un fichier .WIM
dism /Capture-Image /ImageFile:D:\\master.wim /CaptureDir:C:\\ /Name:"Master Win10"

# Appliquer une image sur un disque formaté
dism /Apply-Image /ImageFile:D:\\master.wim /Index:1 /ApplyDir:C:\\

# Monter une image pour la modifier hors ligne
dism /Mount-Image /ImageFile:D:\\master.wim /Index:1 /MountDir:C:\\mount

# Ajouter une mise à jour (KB) dans une image montée
dism /Image:C:\\mount /Add-Package /PackagePath:D:\\updates\\kb123456.msu

# Démonter et sauvegarder les modifications
dism /Unmount-Image /MountDir:C:\\mount /Commit</code></pre>
</section>


<section id="unite11-content">
    <h2 id="unite11">Unité 11 : Le Registre Windows</h2>
    <p>Base de données hiérarchique centrale (<code>regedit.exe</code>).</p>

    <h3 id="ruches">1. Les Ruches (Hives)</h3>
    <ul>
        <li><strong>HKLM (Local Machine)</strong> : Matériel, Logiciels globaux, OS.</li>
        <li><strong>HKCU (Current User)</strong> : Préférences de l'utilisateur connecté.</li>
        <li><strong>HKCR (Classes Root)</strong> : Associations d'extensions de fichiers.</li>
    </ul>

    <h3 id="gpo-reg">2. Lien Stratégies de Groupe (GPO)</h3>
    <p>Les GPO sont des interfaces simplifiées qui écrivent des configurations dans le registre. 
    <br><em>Exemple : Bloquer le panneau de configuration écrit une valeur DWORD dans <code>Policies\\Explorer</code>.</em></p>

    <h3 id="best-reg">3. Précautions</h3>
    <p>Toujours <strong>Exporter</strong> (Sauvegarder) une clé avant modification. Une erreur peut empêcher le démarrage du système.</p>
</section>
