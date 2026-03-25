export const module12 = {
    id: 'sauvegarde-restauration',
    title: 'Sauvegarde & Restauration',
    description: 'Concepts, PRA/PCA, stratégies de backup, architectures de stockage et RAID',
    icon: '💾',
    color: '#10b981',
    quiz: [
        {
            question: "Que définit le RTO (Recovery Time Objective) ?",
            options: [
                "La quantité maximale de données perdues tolérée",
                "Le temps maximal acceptable d'interruption avant la remise en ligne du service",
                "Le budget alloué pour le plan de reprise d'activité",
                "Le temps mis pour exécuter la sauvegarde complète"
            ],
            correctIndex: 1,
            explanation: "Le RTO est la durée maximale tolérée de l'interruption d'un service. Si le RTO est de 4 heures, le système doit être remonté et accessible aux utilisateurs dans ce délai."
        },
        {
            question: "En quoi consiste une sauvegarde différentielle ?",
            options: [
                "Elle copie toutes les données modifiées depuis la toute dernière sauvegarde (quelle qu'elle soit)",
                "Elle copie l'intégralité des données du disque virtuel",
                "Elle copie uniquement les données modifiées depuis la dernière sauvegarde Complète",
                "Elle copie le système d'exploitation sans les fichiers utilisateurs"
            ],
            correctIndex: 2,
            explanation: "La sauvegarde différentielle inclut tous les changements survenus depuis le dernier backup Complet. Elle est plus rapide à restaurer que l'incrémentale, car il ne faut réunir que deux fichiers (la Complète + la dernière Différentielle)."
        },
        {
            question: "Que préconise la règle de sauvegarde 3-2-1 de l'ANSSI ?",
            options: [
                "3 serveurs, 2 sauvegardes par jour, 1 externalisation cloud",
                "3 téraoctets minimum, 2 supports RAID, 1 baie NAS",
                "3 copies des données, sur 2 supports différents, dont 1 hors site",
                "3 tests annuels, 2 administrateurs, 1 compte administrateur dédié"
            ],
            correctIndex: 2,
            explanation: "La règle 3-2-1 recommande : 3 copies (L'original + 2 sauvegardes), 2 supports technologiques (ex: Disque + Bande/Cloud), et 1 localisation externe (Offsite) pour prévenir les catastrophes (incendie, ransomware ciblé)."
        },
        {
            question: "Quelle est la particularité du RAID 5 ?",
            options: [
                "Il fusionne deux disques sans redondance (Striping pur)",
                "Il copie les données à l'identique (Mirroring) avec 50% de perte d'espace",
                "Il répartit les données sur au moins 3 disques et utilise un bloc de parité pour tolérer la perte d'un seul disque",
                "Il nécessite obligatoirement 4 disques et tolère la panne de 2 disques simultanément"
            ],
            correctIndex: 2,
            explanation: "Le RAID 5 (Striping avec parité distribuée) nécessite 3 disques minimum. L'espace d'un disque est sacrifié pour stocker les calculs de parité, permettant de reconstruire les données si n'importe quel disque de la grappe tombe en panne."
        },
        {
            question: "Quelle est la principale différence technique entre un NAS et un SAN ?",
            options: [
                "Le NAS partage des dossiers via TCP/IP (Fichiers), le SAN partage l'accès brut au stockage (Blocs) sur réseau dédié",
                "Le NAS est plus rapide que le SAN pour les bases de données",
                "Le SAN utilise directement de l'USB alors que le NAS utilise du RJ45",
                "Le NAS n'accepte pas le RAID, contrairement au SAN"
            ],
            correctIndex: 0,
            explanation: "Un NAS (Network Attached Storage) sert des fichiers via des protocoles (SMB, NFS). Un SAN (Storage Area Network) fournit des volumes bruts (LUN) via iSCSI ou Fibre Channel, que le serveur OS formate comme s'il s'agissait de ses propres disques locaux."
        },
        {
            question: "Comment définit-on le PRA (Plan de Reprise d'Activité) par rapport au PCA ?",
            options: [
                "Le PRA concerne l'organisation humaine, le PCA gère les serveurs",
                "Le PRA est inclus dans le PCA ; c'est le volet purement technique/IT de la restauration de l'infrastructure",
                "Le PRA est préventif (avant sinistre), le PCA est curatif (après sinistre)",
                "Il n'y a aucune différence, ce sont deux termes pour la même norme"
            ],
            correctIndex: 1,
            explanation: "Le PCA (Plan de Continuité) englobe l'ensemble des processus métiers (communiquer, redéployer les équipes). Le PRA est le sous-ensemble purement technique (monter les sauvegardes, redémarrer les VM de secours)."
        },
        {
            question: "Un utilisateur a supprimé par erreur un élément important de l'Active Directory (GPO ou User). L'admin refuse d'écraser tout le serveur avec la sauvegarde de la veille. Que doit-il utiliser ?",
            options: [
                "Une restauration BMR (Bare-Metal Recovery)",
                "La déduplication de parité sur la baie SAN",
                "Une restauration granulaire (Application-aware)",
                "Un boot PXE avec Windows PE"
            ],
            correctIndex: 2,
            explanation: "La restauration granulaire permet d'extraire un seul objet depuis la sauvegarde d'une machine virtuelle ou d'une base de données, et de l'injecter dans la production actuelle, sans impacter les autres objets modifiés entre-temps."
        },
        {
            question: "Qu'est-ce qu'une sauvegarde BMR (Bare-Metal Recovery) ?",
            options: [
                "La restauration depuis le Cloud d'uniquement les données partagées du serveur",
                "Recréer l'intégralité du système (OS, Apps, Données) sur une machine dont le matériel est vierge ou de remplacement",
                "Sauvegarder directement sur la carte mère sans passer par le disque",
                "La sauvegarde d'urgence des bases de données SQL via lignes de commandes"
            ],
            correctIndex: 1,
            explanation: "Le BMR (Bare-Metal Recovery) est une image de l'ensemble du système d'exploitation et de ses partitions. Il permet, en cas de destruction physique totale d'un serveur, de le remonter tel quel sur un nouveau serveur vierge (\"métal nu\")."
        },
        {
            question: "Que fait le service Windows VSS (Volume Shadow Copy Service) lors de la sauvegarde ?",
            options: [
                "Il suspend l'antivirus le temps du backup",
                "Il envoie la sauvegarde sur le SAN automatiquement",
                "Il crée un snapshot cohérent des fichiers même s'ils sont actuellement ouverts ou modifiés par les applications",
                "Il duplique les disques en RAID 1 virtuel"
            ],
            correctIndex: 2,
            explanation: "VSS (cliché instantané) communique avec l'OS et les applications (Ex: Exchange, SQL) pour figer virtuellement le disque à la milliseconde près de la création du cliché, évitant ainsi de sauvegarder une base de données avec des fichiers \"en cours d'écriture\" (corrompus)."
        },
        {
            question: "Quelle méthode de sauvegarde consomme le moins d'espace de stockage sur 30 jours, mais est la plus lente à restaurer ?",
            options: [
                "Sauvegarde Complète Quotidienne",
                "Sauvegarde Incrémentale",
                "Sauvegarde Différentielle",
                "RAID 0 continu"
            ],
            correctIndex: 1,
            explanation: "L'incrémentale ne sauvegarde que ce qui a changé depuis le jour (-1). Ses fichiers sont très petits. En retour, pour restaurer le jour 30, le logiciel doit assembler la Complète initiale suivie des séquences incrémentales des 30 jours, ce qui est long et fragile."
        },
        {
            question: "Pourquoi répète-t-on que « Le RAID n'est pas une sauvegarde » ?",
            options: [
                "Car le RAID n'autorise pas la restauration système (BMR)",
                "Car les logiciels de sauvegarde comme Veeam refusent de s'installer sur du RAID matériel",
                "Car si un utilisateur efface un fichier ou si un ransomware le chiffre, le RAID va immédiatement répliquer cette destruction sur tous les disques",
                "Car le RAID est une norme obsolète remplacée par le SSD"
            ],
            correctIndex: 2,
            explanation: "Le RAID gère uniquement la continuité face à une défaillance physique (panne mécanique d'un disque). Il est aveugle : toute action malveillante ou erreur humaine de suppression est instantanément validée. Seule la sauvegarde permet de remonter dans le temps."
        },
        {
            question: "Que signifie un RPO (Recovery Point Objective) défini à 4 heures ?",
            options: [
                "Il faut faire 4 sauvegardes complètes par jour",
                "Le système mettra 4 heures à redémarrer",
                "L'entreprise tolère de perdre au maximum les données créées ou modifiées durant les 4 dernières heures en cas de sinistre",
                "L'infrastructure garantit que les sauvegardes ne dépasseront jamais 4 heures d'exportation"
            ],
            correctIndex: 2,
            explanation: "Le RPO est la tolérance de perte de données. Un RPO de 4h exige qu'une sauvegarde différentielle, incrémentale ou de de type dump soit réalisée au minimum toutes les 4 heures."
        }
    ],

    flashcards: [
        {
            front: "Quelle est la différence fondamentale entre Sauvegarde et Archivage ?",
            back: "Sauvegarde : Prévue pour la restauration d'urgence post-incident (court/moyen terme, rapide d'accès).\n\nArchivage : Conservation légale et historique (long terme, plusieurs années), souvent sur bandes ou cold cloud, optimisé pour le coût unitaire et non la vitesse de restauration."
        },
        {
            front: "RTO vs RPO ?",
            back: "RTO (Recovery Time Objective) : Temps maximal d'indisponibilité toléré (Ex: redémarrer sous 4h).\n\nRPO (Recovery Point Objective) : Quantité de données perdues tolérée en durée temporelle (Ex: perdre 1h de saisie max)."
        },
        {
            front: "Expliquer la sauvegarde Différentielle.",
            back: "La différentielle sauvegarde toutes les données modifiées depuis la toute **dernière sauvegarde Complète**.\n\nFichiers ciblés de plus en plus gors jusqu'à la prochaine intégrale.\nRestauration = Complète Initiale + 1 seule différentielle cible."
        },
        {
            front: "Expliquer la sauvegarde Incrémentale.",
            back: "L'incrémentale sauvegarde toutes les données modifiées depuis la **dernière sauvegarde (peu importe son type)**.\n\nFichiers très petits et rapides à créer.\nRestauration lente = Complète + Toutes les incrémentales du maillon."
        },
        {
            front: "Qu'est-ce que la règle 3-2-1 de l'ANSSI ?",
            back: "3 Copies des données (Original + 2 backups)\n2 Supports différents (ex: Baie NAS + Bande LTO)\n1 Copie hors site (ex: Cloud ou Coffre-fort distant pour éviter feu/inondation/ransomware isolant le réseau local)."
        },
        {
            front: "RAID 1 (Mirroring) : Caractéristique principale ?",
            back: "Duplication stricte 1 pour 1.\nTolérance à la panne : 1 Disque sur un tandem.\n\nInconvénient : 50% de perte de stockage (2x 1To = 1To exploitable)."
        },
        {
            front: "RAID 5 : Comment fonctionne-t-il ?",
            back: "Striping + Parité Distribuée.\nMinimum 3 disques.\n\nLa parité (calcul mathématique de XOR) est répartie.\nTolère la panne de 1 seul disque dans la grappe avec un ratio de stockage total de [N-1]. Écritures ralenties à cause du calcul de parité."
        },
        {
            front: "RAID 10 : Pourquoi est-il souvent recommandé par les experts bases de données ?",
            back: "C'est un RAID 1+0 (Miroir Stripé).\nMinimum 4 disques.\n\nIl offre la vitesse vertigineuse du RAID 0 couplée à la forte vélocité sécuritaire des disques secondaires du RAID 1. (50% de perte totale)."
        },
        {
            front: "NAS (Network Attached Storage) vs SAN (Storage Area Network)",
            back: "NAS : Orienté Fichiers (SMB, NFS). Les utilisateurs du réseau accèdent à des dossiers partagés via la carte mère du boîtier NAS.\n\nSAN : Orienté Blocs de données nus (iSCSI, Fibre). Les serveurs voient l'espace SAN comme s'il s'agissait de disques physiques branchés à l'intérieur d'eux."
        },
        {
            front: "À quoi sert VSS (Volume Shadow Copy Service) sous Windows ?",
            back: "Il permet la 'sauvegarde à chaud'. VSS gèle instantanément un état du disque (Instantané/Snapshot) à la seconde près et ordonne aux applications de figer les transactions, pour rendre les données cohérentes sans éteindre le système."
        },
        {
            front: "Qu'est ce que la rotation GFS ?",
            back: "Grand-Père / Père / Fils\n(Grandfather-Father-Son)\n\nStratégie cyclique pour économiser l'usage des médias physiques/cloud :\n- Fils = Quotidienne courte\n- Père = Hebdomadaire pour le mois\n- Grand-Père = Mensuelle (retenue très long terme)"
        },
        {
            front: "Qu'est-ce qu'une restauration BMR ?",
            back: "Bare-Metal Recovery.\n\nRestauration d'une image intégrale complète (Système + Base de registre + Applications + Méta-données) prête à booter sur un matériel neuf vierge (Nu/Bare) sans pré-installation d'OS requise."
        },
        {
            front: "Différence PRA vs PCA ?",
            back: "PRA (Plan de Reprise d'Activité) : Procédures strictes d'ordre Informatique (Restaurer Veeam, Reconstruire le SAN).\n\nPCA (Plan de Continuité) : Plan de survie Macro de l'entreprise (PRA Informatique + Bureaux externalisés + Cellule de crise psychologique + Redirection standard)."
        },
        {
            front: "Pourquoi le RAID materiel ne peut-il pas remplacer la Sauvegarde ?",
            back: "Parce que le RAID copie bêtement ce qu'on lui ordonne sur tous ses disques restants. Si un Ransomware chiffre les données, ou si Root fait `rm -rf`, le RAID appliquera impeccablement cette destruction instantanément. Seule une Sauvegarde déconnectée permet le retour arrière."
        },
        {
            front: "Sur un site de production de haute disponibilité face aux cyber-attaques, que rajoute-t-on à la Règle 3-2-1 ?",
            back: "On en fait une Règle 3-2-1-1-0.\n\nLe deuxième '1' précise que la sauvegarde hors site doit être 'Immuable' (Air-Gappée isolée ou Write-Once). Le '0' valide qu'un Test de Restauration a levé 0 erreur de redémarrage."
        }
    ],

    exercises: [
        {
            id: 'ex-sr-1',
            title: "Scénario PRA : Saturation et Sauvegarde BDD",
            stars: 1,
            description: "Sur votre serveur Windows contenant l'instance SQL métier principale, l'administrateur précédent n'utilisait que de la sauvegarde complète tous les jours à 23h00. Le réseau et l'espace disque du NAS de backup saturent et les temps explosent.",
            instruction: "Proposez une évolution simple de cette politique de sauvegarde dans Veeam en conservant le RPO initial sans saturer les liens (une modification de type de sauvegarde).",
            hint: "Comment réduire la volumétrie sans perdre le point de repère quotidien ?",
            correction: "Passer sur une sauvegarde de type Incrémentale Synthétique ou Inverse, ou utiliser une cycle Complète le Samedi + Différentielle en semaine.",
            explanation: "Une Complète chaque nuit de 3 To consomme fortement les I/O du serveur et du LAN. En planifiant une Complète (Active) au week-end, et des Différentielles/Incrémentales du Lundi au Vendredi, on allège la pression du réseau d'au moins 90% en semaine, tout en conservant une garantie de restauration J-1 (RPO 24h)."
        },
        {
            id: 'ex-sr-2',
            title: "RAID en entreprise : Le serveur critique",
            stars: 2,
            description: "Une PME de 30 employés a acheté un très puissant serveur physique 1U contenant 6 emplacements pour disques durs NVMe 2To. L'ERP interne a besoin d'une fiabilité énorme pour tolérer de fortes contraintes, et ne pas tomber au premier disque défectueux.",
            instruction: "Quel RAID matériel devez-vous exiger ou monter sur la grappe des 6 disques (2To) pour supporter la panne SIMULTANÉE de 2 disques, tout en maximisant l'espace exploitable de la grappe par rapport au RAID 10 ?",
            hint: "Le RAID 5 tolère 1 panne. Quel est son successeur ? Quel sera l'espace utilisable sur 6 NVMe x 2To ?",
            correction: "Du RAID 6. L'espace utile final sera de 8 To, avec la perte volontaire de 4 To (soit 2 disques) dédiés à la double parité.",
            explanation: "Le RAID 6 répartit une double bande de parité asynchrone sur toute la grappe. Il exige au minimum 4 disques, et sur 6 disques de 2To, la formule [(N-2) x Taille] garantit 8 To utilisables face à n'importe quelle perte binaire de deux disques conjoints au cours d'un pic de tension ou d'une reconstruction critique (contrairement au RAID 5)."
        },
        {
            id: 'ex-sr-3',
            title: "Objectif de reprise suite à un sinistre",
            stars: 2,
            description: "La ligne directrice RTO/RPO de la DSI pour un serveur de billetterie en ligne stipule : RPO = 1 Heure. RTO = 4 Heures.",
            instruction: "Traduisez ces contrats SLA concernant la tâche de backup. Quelle est la fréquence minimale autorisée pour planifier la sauvegarde des bases de données ?",
            hint: "Si le RPO accepte la perte d'1 heure maximum de transactions des clients, on ne peut pas sauvegarder toutes les 2h.",
            correction: "Il faut impérativement lancer un dump, un snapshot ou une sauvegarde incrémentale toutes les heures (maximum 60 minutes).",
            explanation: "Le RPO de 1h indique que, lors du redémarrage, on accepte de perdre jusqu'aux 60 dernières minutes de billets vendus, c'est le grand maximum contractuel. Les sauvegardes doivent donc être programmées à la minute :00 de chaque heure. Le RTO de 4h indique le temps dont l'équipe support dispose de 14h à 18h par exemple pour migrer et rebooter les interfaces réseau."
        },
        {
            id: 'ex-sr-4',
            title: "SAN vs NAS : L'isolation",
            stars: 3,
            description: "Votre DSI décide de remplacer le vieux NAS partagé qui héberge les fichiers VMDK du cluster VMware ESXi, en raison de goulots d'étrangement lors des snapshots. Le budget de 30000€ est voté.",
            instruction: "Quel type d'infrastructure périphérique réseau, et via quel protocole, devez-vous déployer pour améliorer considérablement les échanges de Blocs RAW sans saturer le Switch LAN Utilisateurs ?",
            hint: "Ce n'est pas orienté fichier (NFS/SMB). C'est pour du bloc de la baie de stockage attachée au datacenter local.",
            correction: "L'installation d'une infrastructure en Storage Area Network (SAN) avec des liaisons Fibre Channel (16 ou 32 Gbps) ou iSCSI dédiées au V-Switch d'Hyperviseur.",
            explanation: "Un Datacenter exige un réseau parallèle hermétique pour la sauvegarde et le stockage à haut débit. Le SAN fournit directement la couche Blocs LUN à travers un protocole très peu verbeux (iSCSI MPIO ou Fibre), contrairement au NAS (TCP/SMB) qui subit les collisions Ethernet du réseau local de l'établissement."
        },
        {
            id: 'ex-sr-5',
            title: "Incident Ransomware : Validation Immuable",
            stars: 3,
            description: "Le serveur central a été frappé par le ransomware LockBit samedi soir. Dimanche, vous constatez que votre référentiel Veeam externe (qui montait un répertoire Windows partagé vers le lecteur z:\ du serveur de sauvegarde local) a également subi le cryptage car la machine avait les droits d'écriture sur Z:\.",
            instruction: "En tant qu'architecte SI pour reconstruire l'usine et son PRA, nommez techniquement la méthode ou l'isolation conceptuelle qu'il manqué dans la théorie du 3-2-1 pour empêcher ce drame.",
            hint: "L'erreur de base est de laisser le lecteur monté en permanence pour l'administrateur Windows.",
            correction: "Il a manqué l'isolation dite logicielle (Stockage Cloud Immuable, WORM S3 Object Lock) ou physique Air-Gappée de ce fameux 1 site distant.",
            explanation: "Si le serveur infecté possède des identifiants (ou pires, des tokens AD) qui montent le lecteur du backup BackupRepository au boot, le ransomware remontera le chemin et écrasera les VBK. La meilleure pratique exige des dépôts Linux Hardened Repository (immuables), ou d'envoyer la copie sur Amazon S3 object-lock où les droits IAM bloquent explicitement la suppression de l'archive (Write Once Read Many), ce que le Trojan ne peut pirater."
        }
    ]
};
