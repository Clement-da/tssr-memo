---
id: "sauvegarde-restauration"
title: "Sauvegarde & Restauration"
icon: "💾"
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
            <li><a href="#unite1">1. Concepts et Enjeux</a>
                <ol>
                    <li><a href="#enjeux-theory">Théorie : Pérennité et Continuité</a></li>
                    <li><a href="#rto-rpo-concept">RTO, RPO, PCA et PRA</a></li>
                    <li><a href="#enjeux-context">L'importance du Plan de Sauvegarde</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Stratégies et Types de Sauvegardes</a>
                <ol>
                    <li><a href="#types-theory">Théorie : Les méthodes de copie</a></li>
                    <li><a href="#types-concept">Complète vs Différentielle vs Incrémentale</a></li>
                    <li><a href="#types-context">Règle 3-2-1 et Rotation GFS</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Sauvegardes Spécifiques</a>
                <ol>
                    <li><a href="#spec-theory">Théorie : Cohérence des données</a></li>
                    <li><a href="#spec-concept">Snapshots, VSS et SGBD</a></li>
                    <li><a href="#spec-context">L'expertise "Application-aware"</a></li>
                </ol>
            </li>
            <li><a href="#acteurs-backup">4. Solutions et Acteurs du Marché</a>
                <ol>
                    <li><a href="#acteurs-veeam">Veeam : Le Standard Industriel</a></li>
                    <li><a href="#acteurs-alt">Alternatives : Commvault, Rubrik...</a></li>
                    <li><a href="#acteurs-perso">Le Coin du Perso / Labo</a></li>
                </ol>
            </li>
            <li><a href="#unite4">5. Gestion et Architectures de Stockage</a>
                <ol>
                    <li><a href="#stock-theory">Les niveaux d'accessibilité (DAS, NAS, SAN)</a></li>
                    <li><a href="#raid-concept">Les Différents Modes RAID</a></li>
                    <li><a href="#raid-context">L'expertise : RAID != Sauvegarde</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. Procédures et Méthodes de Restauration</a>
                <ol>
                    <li><a href="#restore-theory">Théorie : La fiabilité éprouvée</a></li>
                    <li><a href="#restore-concept">Bare-Metal Recovery (BMR)</a></li>
                    <li><a href="#restore-context">Audits et PRA Opérationnel</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Concepts et Enjeux</h2>

<h3 id="enjeux-theory">Théorie : Pérennité et Continuité</h3>
<p>Les données sont le cœur de l'entreprise. Une stratégie de sauvegarde vise <strong>trois objectifs fondamentaux</strong> : la pérennité des données (les conserver lisibles dans le temps), la continuité d'activité (permettre la reprise après sinistre), et la disponibilité (pouvoir les restaurer rapidement selon les SLA).</p>

<h3 id="rto-rpo-concept">Concepts : RTO, RPO, PCA et PRA</h3>
<p>Deux métriques chronologiques définissent la tolérance de l'entreprise face à une perte de données, et l'impact sur le délai de reprise :</p>

| Métrique / Plan | Définition technique | Exemple métier |
| :--- | :--- | :--- |
| **RPO** *(Recovery Point Objective)* | Quantité maximale de données perdues acceptable, convertie en temps. | "Accepter au pire 1h de pertes entre deux sauvegardes." |
| **RTO** *(Recovery Time Objective)* | Temps maximal acceptable d'interruption du service avant remise en ligne. | "L'application métier doit redémarrer sous 4 heures." |
| **PRA** *(Plan de Reprise d'Activité)* | Procédures IT pour restaurer les serveurs, stockages et applications. | Remonter des VMs sur un site de secours via Veeam. |
| **PCA** *(Plan de Continuité d'Activité)* | Englobe le PRA, plus l'organisation globale (communication, repli). | Transférer les employés vers un centre d'appel externe. |

<h3 id="enjeux-context">Expertise : Le Plan de Sauvegarde</h3>
<blockquote>
<strong>Mise en situation :</strong> En tant qu'administrateur, votre première tâche est de définir et documenter le périmètre d'action. Le plan de sauvegarde identifie les volumétries, précise les emplacements des données (serveur de fichiers, messagerie, Active Directory) et planifie l'effacement sécurisé des bandes.
</blockquote>
</section>

<section id="unite2-content">
<h2 id="unite2">2. Stratégies et Types de Sauvegardes</h2>

<h3 id="types-theory">Théorie : Les méthodes de copie</h3>
<p>Suivre l'ensemble des données modifiées quotidiennement peut surcharger le réseau. Le technicien doit choisir le type de sauvegarde qui équilibre l'espace de stockage, le temps d'exécution (fenêtre de backup) et surtout, le temps de restauration (RTO).</p>

<h3 id="types-concept">Différentielle vs Incrémentale vs Complète</h3>
<p>Le choix s'opère sur la base de ce qui doit être copié et des conséquences lors du retour arrière.</p>

<div style="display: flex; gap: var(--space-6); align-items: center; flex-wrap: wrap; margin: var(--space-6) 0;">
  <div style="flex: 1; min-width: 300px;">

| Type de Sauvegarde | Données incluses | Sauvegarde | Restauration | Empreinte Stockage |
| :--- | :--- | :--- | :--- | :--- |
| **Complète** | La totalité du volume de données. | Lente | **Très rapide** | Très élevée |
| **Différentielle** | Changements depuis la **Complète**. | Moyenne | Rapide | Moyenne (grossit) |
| **Incrémentale** | Changements depuis la **dernière backup**. | **Très rapide** | Lente | Faible |

  </div>
  <div style="flex: 0 0 350px;">
    <img src="/image/Sauvegarde/type_de_sauvegarde.png" alt="Diagramme des types de sauvegarde" style="margin: 0; box-shadow: var(--shadow-lg);" />
  </div>
</div>

<h3 id="types-context">Expertise : La Rotation GFS et la Règle 3-2-1</h3>
<p>Une bonne politique se base sur la <strong>Règle 3-2-1 de l'ANSSI</strong> :</p>

- <strong>3</strong> copies de vos données (L'original en production + 2 sauvegardes).
- <strong>2</strong> supports technologiques différents (ex: Disque local NAS + Stockage Cloud Object).
- <strong>1</strong> copie conservée en dehors du site principal, généralement déconnectée (Air-gap) ou de type immuable pour contrer l'attaque d'un ransomware qui chiffrerait les dépôts réseau.

<div style="display: flex; gap: var(--space-6); align-items: center; flex-wrap: wrap; margin: var(--space-6) 0;">
  <div style="flex: 1; min-width: 300px;">
    <p>L'optimisation des supports passe par la méthode de rotation <strong>GFS (Grand-Père / Père / Fils)</strong> : Daily (Fils) pendant 5 jours, Weekly (Père) pendant 4 semaines, et Monthly (Grand-Père) pour plusieurs années d'archives légales.</p>
  </div>
  <div style="flex: 0 0 350px;">
    <img src="/image/Sauvegarde/GFS.png" alt="Stratégie de rotation GFS" style="margin: 0; box-shadow: var(--shadow-lg);" />
  </div>
</div>
</section>

<section id="unite3-content">
<h2 id="unite3">3. Sauvegardes Spécifiques</h2>

<h3 id="spec-theory">Théorie : Cohérence des données</h3>
<p>Un simple copier-coller de base de données en pleine écriture génère des fichiers corrompus en mémoire. L'administrateur garantit qu'il y a <strong>cohérence transactionnelle</strong>. Soit il sauvegarde "à froid" (en coupant le service), soit "à chaud" à l'aide d'outils ou d'un moteur de type Snapshot.</p>

<h3 id="spec-concept">Snapshots, VSS et SGBD</h3>
<p>Le traitement diffère selon la charge de travail et le type de l'instance.</p>

| Approche / Outil | Utilisation technique | Fonction principale |
| :--- | :--- | :--- |
| **Snapshots** | Cliché instantané du système (VMware, Hyper-V). | Restaure instantanément une VM avant une mise à jour ratée OS, mais prend beaucoup de place. |
| **VSS (Windows)** | Service Volume Shadow Copy. | Coordonne les applications pour s'assurer que les fichiers à l'écran sont lockés avant la sauvegarde locale. |
| **Utilitaires SGBD** | `mysqldump` pour MySQL, `SSMS` pour Microsoft SQL. | Extrait les bases en fichiers texte ou structures logiques, indépendamment du serveur physique. |

<h3 id="spec-context">Expertise : Reprise après crash d'une application</h3>
<p>Un utilisateur se plaint qu'il a supprimé une GPO en production. Vous ne voulez pas écraser tout un contrôleur de domaine (ce qui ruinerait les mots de passe modifiés depuis). Si le logiciel (type Veeam) supporte le procédé "Application-aware", vous initiez une <strong>Restauration Granulaire</strong> native de l'Active Directory. Vous réinjectez la feuille cible de manière chirurgicale, sans perturber la production de la machine virtuelles.</p>
</section>

<section id="acteurs-backup-content">
<h2 id="acteurs-backup">4. Solutions et Acteurs du Marché</h2>

<h3 id="acteurs-veeam">Veeam : Le Standard de l'Industrie</h3>

En entreprise, **Veeam Backup & Replication** est l'acteur dominant pour les administrateurs TSSR. Il s'est imposé grâce à sa capacité à sauvegarder de manière transparente les environnements virtualisés (VMware, Hyper-V) et ses fonctions de restauration granulaire.

| Solution | Points Forts | Points Faibles | Usage Type |
| :--- | :--- | :--- | :--- |
| **Veeam** | **Restauration granulaire** (un seul fichier ou mail), BMR efficace, support cloud S3. | Coût élevé des licences, nécessite Windows pour le serveur principal. | PME et Grandes Entreprises (VM-centric). |
| **Commvault** | Gestion massive de données, très puissant pour les parcs hétérogènes. | **Complexité extrême** de configuration et d'administration. | Très Grands Groupes / Datacenters. |
| **Veritas** | Leader historique, excellent support pour les lecteurs de **bandes (LTO)**. | Interface souvent jugée vieillissante. | Banques, Institutions (Archivage long terme). |
| **Rubrik / Cohesity** | Approche "Data Management", immuabilité native contre les ransomwares. | Prix d'entrée élevé (souvent matériel + logiciel). | Infrastructures critiques Modernes. |

<h3 id="acteurs-alt">Alternatives : Commvault, Rubrik...</h3>
<p>D'autres acteurs se distinguent par des besoins plus spécifiques comme la très haute volumétrie ou l'immuabilité pure.</p>

<h3 id="acteurs-perso">Le Coin du Perso / Labo</h3>
<p>Peut-on mettre en place une stratégie pro à la maison ? <strong>Oui, tout à fait.</strong></p>

- **Veeam Community Edition** : Entièrement gratuit jusqu'à **10 instances** (Workstations ou VM). Idéal pour se former à l'outil pro chez soi.
- **BorgBackup / Restic** : Solutions Open Source ultra-performantes en ligne de commande pour Linux. Elles gèrent la **déduplication** nativement (ne stockent que les blocs uniques).
- **Proxmox Backup Server** : Si vous utilisez l'hyperviseur Proxmox, c'est l'alternative gratuite la plus robuste pour sauvegarder vos VM avec déduplication et chiffrement.
- **Synology Hyper Backup** : Pour ceux possédant un NAS Synology, c'est l'outil intégré le plus simple pour externaliser ses données vers un second NAS ou du Cloud (C2, S3).

</section>

<section id="unite4-content">
<h2 id="unite4">5. Gestion et Architectures de Stockage</h2>

<h3 id="stock-theory">Théorie : Les niveaux d'accessibilité</h3>
<p>L'externalisation, la rapidité, le prix et le cloisonnement de la sécurité modélisent les types de stockages disponibles. Les données en ligne sont véloces (Inline/Online), tandis que l'Offsite assure l'isolation (Offline/Near-line).</p>

<h3 id="stock-concept">Comparatif des Infrastructures de Stockage</h3>
<p>Selon le protocole exploité, on distingue trois grandes normes de stockage au niveau des serveurs matériels :</p>

| Type | Accès & Rôle | Avantage direct | Limites potentielles |
| :--- | :--- | :--- | :--- |
| **DAS (Direct Attached Storage)** | Fichiers. Relié physiquement via USB, eSATA, SAS. | Haute performance, très simple à monter (aucun réseau nécessaire). | Difficilement partageable avec d'autres serveurs ou grappes. |
| **NAS (Network Attached Storage)** | Fichiers (SMB, NFS). Sur réseau local classique (TCP/IP). | Partage natif simple, gestion centralisée, abordable et autonome. | Latence du réseau LAN ; Ne convient pas à la Virtualisation lourde. |
| **SAN (Storage Area Network)** | Blocs (iSCSI, Fibre Channel). Réseau très haut débit dédié. | Accès bas-niveau par blocs, supporte la redondance VMware/Datacenter. | Équipement coûteux (Switch FC, HBA) et l'administration est avancée. |

<h3 id="stock-context">Expertise : Le choix technologique adéquat</h3>
<<<<<<< HEAD
<p>Pour un PRA qui nécessite de la bande passante et des IOPS garanties pour l'hyperviseur, on investit sur du SAN iSCSI or FC. En revanche, pour conserver les dumps des bases MySQL froides en mode offline, l'export sur Bandes Magnétiques LTO est peu coûteux au Téraoctet et propose l'assurance d'une longévité énorme pour les rétentions légales (Air-Gap natif de 10 ans sur les étagères d'un coffre).</p>
=======
<p>Pour un PRA qui nécessite de la bande passante et des IOPS garanties pour l'hyperviseur, on investit sur du SAN iSCSI ou FC. En revanche, pour conserver les dumps des bases MySQL froides en mode offline, l'export sur Bandes Magnétiques LTO est peu coûteux au Téraoctet et propose l'assurance d'une longévité énorme pour les rétentions légales (Air-Gap natif de 10 ans sur les étagères d'un coffre).</p>
>>>>>>> 16497b1 (feat: synchronize local changes and documentation updates)
</section>

<section id="unite5-content">
<h2 id="unite5">5. Redondance des Disques (RAID)</h2>

<h3 id="raid-theory">Théorie : Continuité matérielle sans interruption</h3>
<p>Le RAID (Redundant Array of Independent Disks) répartit et duplique les blocs ou les segments de données à travers un ensemble physique. Son but principal est le rassemblement matériel pour accroître la vitesse ou pour garantir la continuité du serveur lorsqu'un disque mécanique lâche inopinément.</p>

<h3 id="raid-concept">Les Différents Modes RAID</h3>

| Niveau RAID | Méthodologie | Tolérance (Nb disques) | Particularité technique | Efficacité Stockage |
| :--- | :--- | :--- | :--- | :--- |
| **RAID 0** | **Striping** | **ZÉRO panne** | Performance maximale. Un disque HS = Perte totale. | <div class="raid-visualizer"><div style="display:flex; height:20px; width:150px; background:#1e2e4a; border-radius:4px; border:1px solid #14b8a6; overflow:hidden;"><div style="width:100%; background:#14b8a6; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">100% UTILES</div></div><div class="raid-image-preview"><img src="/image/Sauvegarde/RAID 0.png" width="250" /></div></div> |
| **RAID 1** | **Mirroring** | 1 (sur une paire) | Duplication stricte. Sécurité simple et efficace. | <div class="raid-visualizer"><div style="display:flex; height:20px; width:150px; background:#1e2e4a; border-radius:4px; border:1px solid #14b8a6; overflow:hidden;"><div style="width:50%; background:#14b8a6; border-right:2px solid #0b1120; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">50%</div><div style="width:50%; background:#ef4444; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:white;">MIROIR</div></div><div class="raid-image-preview"><img src="/image/Sauvegarde/Raid 1.png" width="250" /></div></div> |
| **RAID 5** | Striping + **Parité** | 1 disque global | Compromis idéal entre sécurité, vitesse et stockage. | <div class="raid-visualizer"><div style="display:flex; height:20px; width:150px; background:#1e2e4a; border-radius:4px; border:1px solid #14b8a6; overflow:hidden;"><div style="width:66%; background:#14b8a6; border-right:2px solid #0b1120; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">66%</div><div style="width:34%; background:#facc15; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">PARITÉ</div></div><div class="raid-image-preview"><img src="/image/Sauvegarde/Raid 5.png" width="500" /></div></div> |
| **RAID 6** | Striping + **Double**| **2 disques** | Sécurité robuste pour les grappes de grand volume. | <div class="raid-visualizer"><div style="display:flex; height:20px; width:150px; background:#1e2e4a; border-radius:4px; border:1px solid #14b8a6; overflow:hidden;"><div style="width:50%; background:#14b8a6; border-right:2px solid #0b1120; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">50%</div><div style="width:50%; background:#f59e0b; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">PARITÉ x2</div></div><div class="raid-image-preview"><img src="/image/Sauvegarde/Raid 6.png" width="500" /></div></div> |
| **RAID 10** | Mix (1 + 0) | 1 HDD par ligne | Le meilleur de la vitesse et de la protection combiné. | <div class="raid-visualizer"><div style="display:flex; height:20px; width:150px; background:#1e2e4a; border-radius:4px; border:1px solid #14b8a6; overflow:hidden;"><div style="width:50%; background:#14b8a6; border-right:2px solid #0b1120; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:#0b1120;">50%</div><div style="width:50%; background:#3b82f6; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; color:white;">STRIPE</div></div><div class="raid-image-preview"><img src="/image/Sauvegarde/Raid 10.png" width="500" /></div></div> |

<h3 id="raid-context">Expertise : "Le RAID n'est pas une Sauvegarde"</h3>
<blockquote>
<strong>Règle d'or :</strong> Le RAID n'est pas une sauvegarde. C'est une continuité matérielle. Si un crypto-locker chiffre la partition, le RAID va miroiriser très rapidement la modification du fichier infecté. La sauvegarde est la seule machine à voyager dans le temps pour restaurer un état sain.
</blockquote>
</section>

<section id="unite6-content">
<h2 id="unite6">6. Procédures et Méthodes de Restauration</h2>

<h3 id="restore-theory">Théorie : La fiabilité éprouvée</h3>
<p>La finalité réelle du plan, ce n'est pas "faire une sauvegarde", mais "être capable de restaurer le service avec certitude". Sans test validé par la DSI et documenté en production, un référentiel de sauvegarde est considéré comme faillible à haut risque.</p>

<h3 id="restore-concept">Les techniques de retour arrière</h3>
<p>La réintégration des données dépend de ce qui s'est écroulé.</p>

| Méthode déployée | Périmètre de récupération | Avantage décisif |
| :--- | :--- | :--- |
| **BMR (Bare-Metal Recovery)** | Toute la machine OS + App + Données | Reconstruire rapidement l'OS bootable sur un "hardware blanc / vierge". Idéal si incendie. |
| **Restauration Granulaire** | Fichier précis, boite mail, objet local | Extrêmement rapide, très utile face à une banale erreur humaine dans un dossier partagé. |
| **À Un Emplacement Alternatif** | Monté ailleurs que l'origine | Évite l'écrasement en production (overwriting), utilisé pour récupérer une donnée et la valider avant action. |

<h3 id="restore-context">Expertise : Audits et PRA Opérationnel</h3>
<blockquote>
<strong>Audit de Sécurité :</strong> Toutes les entreprises modernes effectuent des campagnes de restauration (ex: SureBackup Veeam). À votre arrivée le matin, un rapport vert prouvera que les VM ont redémarré en Sandbox, donnant l'assurance à la direction que le PRA répond scrupuleusement au RTO métier.
</blockquote>
</section>
