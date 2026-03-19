export const module11 = {
    id: 'virtualisation',
    title: 'Virtualisation',
    description: 'Découverte des hyperviseurs de Type 1 et 2, de VMware vSphere, et de la gestion de datacenter.',
    icon: '🖥️',
    color: '#8b5cf6',
    flashcards: [
        {
            front: "Différence entre un hyperviseur de Type 1 et de Type 2 ?",
            back: "Le Type 1 (Bare Metal) s'installe directement sur le matériel (ex: ESXi). Le Type 2 (Hosted) s'installe sur un système d'exploitation hôte existant (ex: VMware Workstation)."
        },
        {
            front: "Quel est le rôle du vCenter dans vSphere ?",
            back: "Console centrale permettant l'administration centralisée de plusieurs hôtes ESXi, la gestion des clusters, et les fonctions avancées comme vMotion ou HA."
        },
        {
            front: "Qu'est-ce que vMotion ?",
            back: "Une technologie permettant de déplacer à chaud l'exécution d'une VM (RAM) d'un hôte ESXi vers un autre sans aucune coupure de service pour les utilisateurs."
        },
        {
            front: "Quels sont les trois prérequis pour utiliser vMotion ?",
            back: "1) Stockage partagé (SAN/NAS)\n2) CPU des hôtes compatibles\n3) Licence vCenter."
        },
        {
            front: "Qu'est-ce que HA (High Availability) dans VMware ?",
            back: "Une fonction qui redémarre automatiquement les VM sur un autre hôte sain du cluster en cas de panne matérielle du premier hôte."
        },
        {
            front: "Format universel de template de VM ?",
            back: "OVF (Open Virtualization Format) ou OVA (le fichier unique zippé). Permet d'importer/exporter entre différents hyperviseurs."
        },
        {
            front: "À quoi sert un Pool de ressources ?",
            back: "À diviser et gérer logiquement les ressources matérielles (CPU/RAM) d'un cluster ou hôte afin de prioriser ou limiter certaines VM."
        },
        {
            front: "Qu'est-ce qu'un Switch Distribué (vDS) ?",
            back: "Un commutateur virtuel géré au niveau du vCenter, permettant de configurer uniformément le réseau sur tous les hôtes ESXi du cluster."
        },
        {
            front: "Quelle est la différence entre Thin et Thick Provisioning ?",
            back: "Thin n'alloue physiquement l'espace qu'au moment où les données sont écrites. Thick réserve immédiatement la totalité de l'espace alloué au moment de la création du disque."
        },
        {
            front: "Quel protocole est utilisé pour le stockage en mode BLOC sur IP ?",
            back: "iSCSI. Il encapsule des commandes SCSI sur un réseau TCP/IP standard."
        }
    ],
    quiz: [
        {
            question: "Laquelle de ces solutions est un hyperviseur de Type 1 ?",
            options: ["VMware Workstation", "Oracle VirtualBox", "VMware ESXi", "Windows 11"],
            correctIndex: 2,
            explanation: "ESXi est de type Bare Metal (Type 1), il s'installe sans avoir besoin de Windows ou d'un OS serveur au préalable."
        },
        {
            question: "Quelle fonction VMware équilibre dynamiquement et automatiquement la charge entre les serveurs physiques ESXi ?",
            options: ["HA (High Availability)", "DRS (Distributed Resource Scheduler)", "FT (Fault Tolerance)", "vMotion"],
            correctIndex: 1,
            explanation: "DRS surveille l'utilisation CPU/RAM et utilise vMotion pour déplacer à chaud les VM vers les hôtes les moins chargés du cluster."
        },
        {
            question: "En virtualisation réseau, quel comportement a une interface virtuelle configurée en mode 'Bridge' (Pont) ?",
            options: ["La VM obtient une IP sur le même réseau physique que son hôte.", "La VM partage l'adresse IP de l'hôte (côté extérieur).", "La VM ne peut pas accéder à Internet.", "La VM est dans un VLAN privé isolé."],
            correctIndex: 0,
            explanation: "En mode NAT, la VM partage l'IP de l'hôte. En Host-Only, elle est isolée. En Bridge, elle est un équipement à part entière sur le réseau physique local."
        },
        {
            question: "Laquelle de ces affirmations sur le Storage vMotion est vraie ?",
            options: ["Il migre la RAM d'une VM vers un autre ESXi.", "Il a besoin que la VM soit éteinte.", "Il déplace les fichiers disques (VMDK) vers un autre datastore sans éteindre la VM.", "Il est plus rapide qu'un vMotion de la RAM."],
            correctIndex: 2,
            explanation: "Storage vMotion s'occupe de la migration du stockage VMDK et des fichiers de config, à chaud."
        },
        {
            question: "Parmi les éléments suivants, quel protocole est typiquement utilisé par un NAS monté dans vSphere ?",
            options: ["Fibre Channel (FC)", "iSCSI", "NFS", "EtherChannel"],
            correctIndex: 2,
            explanation: "NFS est un partage de système de fichiers réseau, typique d'un NAS. Fibre Channel et iSCSI sont de l'accès par bloc propre au SAN/DAS."
        },
        {
            question: "À quoi correspond le 'Overcommit' (Abonnement excessif) de la mémoire ?",
            options: ["Donner plus de RAM à une VM que l'OS invité n'en supporte.", "Répartir logiciellement 100Go de RAM virtuelle alors que le serveur physique n'a que 64Go physiques.", "Installer plusieurs hyperviseurs sur la même machine.", "Une erreur lorsque la VM plante."],
            correctIndex: 1,
            explanation: "L'Overcommit profite du fait que toutes les VM n'utilisent jamais toute leur RAM allouée en même temps."
        },
        {
            question: "Dans vSphere, quelle est la politique de sécurité qui permet à une VM d'en voir le trafic des autres sur un vSwitch ?",
            options: ["Forged Transmits", "MAC Address Changes", "Promiscuous Mode", "vDS Security"],
            correctIndex: 2,
            explanation: "Activer le Mode Promiscuous (Mode de détection promiscuité) permet à une interface de voir tout le trafic du vSwitch local. Utile pour les sondes IDS virtuelles."
        },
        {
            question: "Que garantit l'outil Sysprep lors du clonage de VM sous Windows ?",
            options: ["Il régénère le SID Windows afin d'éviter d'avoir des postes avec le même ID dans un domaine Active Directory.", "Il efface les données personnelles de l'utilisateur.", "Il installe automatiquement les drivers matériels de base.", "Il désactive le pare-feu local."],
            correctIndex: 0,
            explanation: "Sysprep permet de préparer un OS au clonage, principalement en renouvelant l'identifiant de sécurité local (SID) et le nom de la machine."
        },
        {
            question: "Qu'est-ce qu'un SnapShot de Machine Virtuelle ?",
            options: ["Une capture d'écran du bureau Guest.", "La photographie de l'état, des données et de l'état mémoire d'une VM à l'instant T.", "Une sauvegarde complète chiffrée.", "La migration vers un stockage SSD."],
            correctIndex: 1,
            explanation: "Un snapshot permet de revenir à l'état précédent. Attention : ce n'est techniquement pas un 'backup / sauvegarde' fiable à long terme."
        },
        {
            question: "Que se passe-t-il lorsque la fonction FT (Fault Tolerance) de VMware gère une VM ?",
            options: ["Elle sauvegarde la VM toutes les nuits.", "Elle redémarre la VM en moins de 5 secondes si l'hôte primaire crash.", "Elle crée une copie fantôme synchronisée en temps réel sur un second ESXi : zero coupure en cas de crash.", "Elle transfère les données sur un NAS externe en continu."],
            correctIndex: 2,
            explanation: "HA redémarre (il y a donc coupure), mais FT exécute la VM en double synchronisé. Zero downtime."
        }
    ],
    exercises: [
        {
            id: 'ex1',
            title: 'Diagnostic d\'Espace Disque (Thin vs Thick)',
            stars: 1,
            description: 'Comprendre et repérer l\'allocation d\'un datastore.',
            instruction: 'Une LUN SAN de 500 Go possède trois VM. Créées avec de l\'espace disque "Thin Provisioned" : VM1 (100 Go alloués/20 Go écrits), VM2 (200 Go alloués/50 Go écrits), VM3 (300 Go alloués/100 Go écrits). Quelle est la taille consommée aujourd\'hui et le Datastore est-il en mode "Overcommit" de stockage ?',
            hint: 'Additionnez l\'espace virtuellement alloué total vs stockage total pour la partie Overcommit. Additionnez l\'espace écrit physiquement pour l\'actuel.',
            correction: 'L\'espace Total Actuel Consommé : 20 + 50 + 100 = 170 Go physiques. Espace Total Alloué : 100 + 200 + 300 = 600 Go. Oui, il y a un Overcommit de 100 Go par rapport aux 500 Go physique.',
            explanation: 'En mode Thin, le stockage croît avec l\'écriture. Cependant, à terme, si les 3 VM se remplissent à fond, le datastore saturera. Les 100 derniers gigas ne pourront jamais être écrits sans ajouter de l\'espace.'
        },
        {
            id: 'ex2',
            title: 'Création d\'un Switch Virtuel ISOLE',
            stars: 2,
            description: 'Concevoir un réseau cloisonné pour un laboratoire.',
            instruction: 'Comment configurer, côté hôte vSphere ESXi, un réseau afin que 4 VM de test (attaquant, victime, etc) puissent communiquer entre-elles mais sans jamais atteindre le réseau physique (LAN de production) ni internet ?',
            hint: 'Demandez-vous ce qui fait la liaison avec le réseau physique.',
            correction: 'Il faut créer un nouveau Standard vSwitch (vSS) et aucun adaptateur (pNIC / vmnic) physique ne devra lui être rattaché en mode Uplink. Il suffit ensuite de placer les vNIC des 4 VM dans le Port Group de ce vSwitch sans liaison externe.',
            explanation: 'Sans interface Physique (vmnic) uplinkée sur le vSwitch interne, ses paquets ne possèderont aucune sortie. C\'est un réseau isolé, équivalent à un switch physique sans aucun câble vers le routeur principal.'
        },
        {
            id: 'ex3',
            title: 'Planification d\'un cluster HA',
            stars: 3,
            description: 'Calculer la tolérance de panne (Admission Control).',
            instruction: 'Un cluster possède 4 serveurs ESXi ayant 100 Go de RAM chacun (400 Go RAM Total). Les VM consomment actuellement environ 60 Go par hôte (240 Go sur le cluster). Que se passe-t-il si un ESXi tombe en panne alors que la tolérance de pannes configurée est d\'accepter la perte d\'1 hôte (N-1) ?',
            hint: 'Vérifiez la capacité RAM restante sur les survivants lorsque celui comportant 60 Go de RAM crash.',
            correction: 'Il reste 3 hôtes. Leur RAM totale disponible est de 300 Go physiques. L\'ensemble des VM nécessite toujours 240 Go de RAM pour redémarrer.\nLa capacité des survivants (300 Go) est bien supérieure à 240 Go (l\'occupation actuelle). HA (High Availability) arrêtera momentanément ces VM, migrera leur affectation et les redémarrera avec succès (grace au stockage partagé de type SAN existant).',
            explanation: 'S\'il n\'y avait pas eu de marge de manœuvre, l\'"Admission Control" de vCenter aurait émis une alerte critique indiquant une fragilité du cluster avant cela.'
        },
        {
            id: 'ex4',
            title: 'Analyse et Priorisation (Pools de Ressources)',
            stars: 4,
            description: 'Partager les capacités hardware en situation de contention.',
            instruction: 'Sur un hôte surchargé, vous modifiez le paramétrage pour une VM nommée "SRV-BDD-CEO". Vous passez ses parts (Parts de Ressources CPU) à "Hautes" (High). Les autres VM restent "Normales" (Normal). En cas de contention (CPU à 100%), quelle sera la répartition de puissance brute entre SRV-BDD-CEO et une VM standard ?',
            hint: 'Typiquement, en virtualisation VMware, High = 8000, Normal = 4000 (ratio de 2:1).',
            correction: 'En cas de contention (manque de ressources), la VM configurée en Parts Hautes (SRV-BDD-CEO) obtiendra deux fois plus (ratio 8000 contre 4000) de temps CPU qu\'une VM en part Normale.',
            explanation: 'Si les ressources ne sont pas suffisantes pour tout le monde, le gestionnaire du noyau ESXi coupe ou suspend la VM avec un ratio bas en favorisant l\'accès immédiat pour les VM "High" prioritaires.'
        }
    ]
};
