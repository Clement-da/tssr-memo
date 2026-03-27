export const module7 = {
  id: 'rds-wds-mdt',
  title: 'RDS, WDS, MDT',
  description: 'Déploiement centralisé d\'OS, automatisation et virtualisation de bureaux Microsoft.',
  icon: '🖥️',
  color: '#0ea5e9',
  flashcards: [
    {
      id: 'm7_fc1',
      front: 'Qu\'est-ce que RDS (Remote Desktop Services) ?',
      back: 'Un ensemble de rôles Microsoft permettant de fournir des bureaux virtuels, des applications centralisées et des connexions distantes de façon unifiée à des clients légers/lourds.'
    },
    {
      id: 'm7_fc2',
      front: 'Quelles sont les caractéristiques d\'un Client Léger par rapport à RDS ?',
      back: 'La puissance de calcul et les applications de l\'utilisateur résident sur le serveur ; le client léger ne gère que le transfert de l\'affichage, du clavier et de la souris.'
    },
    {
      id: 'm7_fc3',
      front: 'Quel port et quel protocole sont principalement utilisés pour la technologie RDS ?',
      back: 'Le protocole RDP (Remote Desktop Protocol) utilisant par défaut le port 3389 en TCP/UDP.'
    },
    {
      id: 'm7_fc4',
      front: 'En architecture RDS, quel rôle est chargé d\'héberger concrètement les bureaux et applications des utilisateurs ?',
      back: 'Le rôle Session Host (Hôte de session Bureau à distance).'
    },
    {
      id: 'm7_fc5',
      front: 'Quel rôle RDS agit comme un routeur de trafic en attribuant et reconnectant les utilisateurs à leurs sessions actives sans doublon ?',
      back: 'Le rôle Connection Broker (Service Broker pour les connexions).'
    },
    {
      id: 'm7_fc6',
      front: 'Qu\'est-ce que la solution RemoteApp dans une infrastructure RDS ?',
      back: 'C\'est une fonctionnalité permettant de publier et streamer uniquement l\'interface visuelle d\'une application spécifique, comme si elle était installée localement sur la machine cliente.'
    },
    {
      id: 'm7_fc7',
      front: 'À quoi sert le rôle RDS Gateway (Passerelle RDS) ?',
      back: 'À encapsuler le trafic RDP (port 3389) dans un tunnel chiffré HTTPS (port 443) afin de sécuriser les accès de l\'extérieur (télétravailleurs) sans exposer RDP sur Internet.'
    },
    {
      id: 'm7_fc8',
      front: 'Qu\'est-ce que le service WDS (Windows Deployment Services) ?',
      back: 'Un rôle serveur Microsoft permettant le déploiement d\'un système d\'exploitation Windows en masse via le réseau sans requérir de support d\'installation physique (clé USB, DVD).'
    },
    {
      id: 'm7_fc9',
      front: 'Quelles sont les deux conditions réseaux primordiales pour faire fonctionner WDS lors de l\'amorçage (PXE) d\'un poste ?',
      back: 'Le poste doit avoir une carte réseau compatible PXE boot et pouvoir acquérir une IP et les informations Serveur de boot auprès d\'un serveur DHCP.'
    },
    {
      id: 'm7_fc10',
      front: 'WDS fait appel à deux images distinctes (format WIM) pour instancier un poste. Lesquelles ?',
      back: 'L\'image de Démarrage (Boot Image basée sur WinPE) et l\'image d\'Installation (Install Image contenant l\'OS complet en tant que cible).'
    },
    {
      id: 'm7_fc11',
      front: 'Quelle est la limitation majeure de la technologie WDS basique en entreprise ?',
      back: 'WDS s\'arrête globalement à la poussée de l\'image système. Il n\'inclut pas d\'automatisation native (post-installation) pour injecter des applicatifs métiers, configurer l\'AD ou intégrer massivement des pilotes personnalisés de manière structurée.'
    },
    {
      id: 'm7_fc12',
      front: 'Qu\'est-ce que concrètement le MDT (Microsoft Deployment Toolkit) ?',
      back: 'Une boîte à outils Microsoft (add-on gratuit) qui s\'articule souvent avec WDS permettant de scénariser, automatiser et centraliser l\'intégralité des tâches de bout en bout du cycle de déploiement des postes.'
    },
    {
      id: 'm7_fc13',
      front: 'Au sein de MDT, qu\'appelle-t-on une \\"Task Sequence\\" ?',
      back: 'C\'est l\'élément central qui regroupe la liste séquentielle d\'étapes exécutées sur le poste client : formatage, copie de l\'OS, jonction de domaine, paramétrage OOBE, et exécution d\'installateurs de logiciels.'
    },
    {
      id: 'm7_fc14',
      front: 'Pourquoi utilise-t-on un environnement WinPE (Windows Preinstallation Environment) ?',
      back: 'C\'est un micro OS embarqué en RAM lors du boot réseau WDS/MDT. Il est allégé et est dédié à lancer les processus d\'installation réseau et de diagnostic sans nécessiter le système final installé sur le disque physique.'
    },
    {
      id: 'm7_fc15',
      front: 'En termes d\'efficience temps, qu\'apporte le couple WDS + MDT par rapport à WDS seul (Zero Touch / Lite Touch) ?',
      back: 'Il assure un gain massif de temps technicien : alors que WDS nécessite d\'ouvrir des sessions et paramétrer les profils manuellement, MDT installe l\'ensemble et livre une machine 100% exploitables (logiciels intégrés) d\'un bloc.'
    }
  ],
  quiz: [
    {
      id: 'm7_q1',
      question: 'À quoi sert principalement la fonctionnalité RemoteApp comparativement à un accès Bureau complet (RDS) ?',
      options: [
        'A déployer plus rapidement les paquets MSI sur les clients en tâche de fond',
        'A distribuer la fenêtre unique d\'une application sur le poste local donnant l\'apparence d\'un logiciel local',
        'A partager son propre écran à l\'assistance TSSR en mode TeamViewer',
        'A déléguer le rendu 3D de l\'application aux ressources GPU des clients matériels'
      ],
      correctIndex: 1,
      explanation: 'RemoteApp découpe l\'expérience RDS pour n\'afficher que le flux visuel et les interactions de l\'application sélectionnée. Elle s\'intègre dans la barre des tâches de manière transparente, lissant l\'expérience utilisateur.'
    },
    {
      id: 'm7_q2',
      question: 'Quel composant RDS a pour responsabilité d\'empêcher un utilisateur de recréer une deuxième session alors que sa première session a été simplement interrompue sur le Session Host ?',
      options: [
        'RD Web Access',
        'RDS Connection Broker',
        'WDS PXE Server',
        'DHCP Relay'
      ],
      correctIndex: 1,
      explanation: 'Le Connection Broker garde en mémoire l\'état et la localisation des sessions. Il agit comme un aiguilleur : s\'il détecte la session disjointe d\'Alice, il l\'y reconnectera automatiquement à sa reconnexion.'
    },
    {
      id: 'm7_q3',
      question: 'Concernant la Passerelle RDS (Gateway), quelle affirmation réseau la qualifie correctement concernant les accès nomades ?',
      options: [
        'Elle traduit les paquets HTTP en un protocole TCP port 80 pour autoriser le cleartext',
        'Elle force le serveur AD à s\'exposer sur Internet pour auth nativement les utilisateurs',
        'Elle tunnelise le trafic RDP tcp/3389 de bout en bout dans une trame HTTPS cryptée port 443',
        'Elle demande à installer un client VPN IPsec logiciel lourd sur toutes les machines cibles'
      ],
      correctIndex: 2,
      explanation: 'RDS Gateway crée un pont SSL (HTTPS 443 proxyfié) pour l\'accès RDP standard. Elle est conçue pour être publiée en DMZ sur Internet (sans exposer de ports dangereux comme le 3389), permettant d\'utiliser nativement l\'application MSTSC (connexion Bureau Distant Windows).'
    },
    {
      id: 'm7_q4',
      question: 'WDS s\'appuie impérativement sur l\'association de certains processus d\'infrastructure. Lequel parmi cette liste s\'exécute lors du boot de la carte mère cible ?',
      options: [
        'La communication LDAP GPO Native',
        'Le protocole d\'amorçage PXE couplé avec le serveur DHCP',
        'Le montage de système iSCSI ou NFS',
        'L\'application de Master Boot Record (MBR)'
      ],
      correctIndex: 1,
      explanation: 'PXE boot requiert que la machine demande sur un broadcast une IP à travers DHCP. En réponse de DHCP figurent en général des en-têtes qui l\'orientent directement vers le serveur WDS (souvent options 66/67).'
    },
    {
      id: 'm7_q5',
      question: 'Quelles sont les deux images initiales qu\'un technicien doit intégrer au sein de l\'application serveur WDS pour déployer un Windows basique ?',
      options: [
        'ISO Image et VMDK Image',
        'Boot Image (Environnement boot) et Install Image (OS Cible)',
        'Reference Image et Offline Image',
        'Golden Image et Sysprep Image'
      ],
      correctIndex: 1,
      explanation: 'WDS utilise le format .wim (Windows Imaging Format). Une image boot.wim va déclencher le WinPE et l\'assistant d\'installation, et l\'image install.wim contiendra les entrailles du Windows à y injecter.'
    },
    {
      id: 'm7_q6',
      question: 'Parmi les scénarios suivants en administration TSSR, lequel démontre la plus-value de rajouter MDT au dessus d\'un WDS existant ?',
      options: [
        'Le déploiement manuel poste par poste via des requêtes ICMP',
        'La garantie que tous les clients utiliseront Windows Defender',
        'L\'industrialisation de la procédure (Zero-Touch) incluant noms de domaine, installation simultanée d\'Office 365, Edge, et pilotes dédiés lors du premier boot',
        'L\'interopérabilité pour déployer Ubuntu Desktop aux postes Linux cibles'
      ],
      correctIndex: 2,
      explanation: 'La véritable force de MDT est l\'automatisation des tâches complètes : il centralise (grâce à ses Task Sequences) toutes les applications tierces à installer pour livrer un poste 100% conforme pour la production (jonction domaine, logiciels métiers complets).'
    },
    {
      id: 'm7_q7',
      question: 'Que signifie \'WinPE\' dans le contexte du déploiement Windows ?',
      options: [
        'Windows Preinstallation Environment',
        'Windows Principal Emulator',
        'Windows Payload Extract',
        'Wins Network Preconfiguration'
      ],
      correctIndex: 0,
      explanation: 'WinPE est un environnement ultra-allégé, basé sur Windows et fonctionnant par chargement en mémoire qui sert à préparer l\'ordinateur à l\'installation d\'un système Windows distant, réaliser un dépannage ou un clonage.'
    },
    {
      id: 'm7_q8',
      question: 'Lequel n\'est PAS formellement un rôle des services de bureau à distance (RDS) tel que Microsoft le défini ?',
      options: [
        'RD Connection Broker',
        'RD Session Host',
        'SQL Server Reporting Services',
        'RD Gateway'
      ],
      correctIndex: 2,
      explanation: 'SSRS est un outil lié au système de gestion de bases de données de Microsoft. Les rôles RD (Remote Desktop) constituent l\'architecture Virtual Desktop Infrastructure (VDI).'
    },
    {
      id: 'm7_q9',
      question: 'Où précise-t\'on l\'action automatisée \'Installation d\'une application Silencieuse MSI\' dans votre console MDT ?',
      options: [
        'Directement dans l\'Active Directory Users and Computers',
        'Dans les propriétés du scope DHCP',
        'Dans une étape dédiée de la \'Task Sequence\' sélectionnée (Custom Task)',
        'Dans l\'installeur Setup.exe directement'
      ],
      correctIndex: 2,
      explanation: 'L\'outil (Workbench MDT) gère des Task Sequences. L\'ajout de processus, du partitionnement aux scripts applicatifs PowerShell ou MSI, dépend entièrement de ces séquences d\'étapes personnalisables.'
    },
    {
      id: 'm7_q10',
      question: 'Qu\'est ce qui différencie une architecture VDI Classique (Desktop Virtuel) et une architecture RDS Terminal Services stricto-sensu ?',
      options: [
        'RDS partage le même instance d\'OS Serveur (et noyau) entre tous ; le VDI alloue la véritable Machine Virtuelle distincte entière au client',
        'L\'un requiert Linux et l\'autre demande Windows pour marcher',
        'L\'architecture VDI dépend des scripts MDT locaux pour l\'affichage',
        'Il n\'y a techniquement aucune distinction au sens réseau'
      ],
      correctIndex: 0,
      explanation: 'Le modèle RDS Session Host concentre les utilisateurs comme des instances isolées de la *même* partition système du serveur global d\'applications. Un mode VDI complet démarre des Hyper-V pour servir de vrais Windows 10/11 pour 1 utilisateur 1 OS.'
    },
    {
      id: 'm7_q11',
      question: 'En déploiement WDS sur plusieurs subnets, parfois les requêtes Broadcast PXE ne sont pas lues par le serveur DHCP/WDS. Qu\'ajoute-on généralement au routeur réseau (ou pare-feu) pour pallier à cela ?',
      options: [
        'Un serveur mandataire proxy Squid',
        'Le protocole de routage dynamique BGP/OSPF',
        'Des IP Helpers (relais DHCP) ciblant les IP Serveur WDS et DHCP',
        'Un filtrage sur adresses MAC'
      ],
      correctIndex: 2,
      explanation: 'Les diffusions UDP (broadcasting bootpc port 67) d\'un nouveau poste restent circonscrites dans leur réseau IP L2/L3 originel. L\'IP Helper d\'un routeur transmet unitairement ces demandes à l\'IP de l\'infrastructure serveur distante à travers l\'entreprise pour débloquer le PXE Boot.'
    },
    {
      id: 'm7_q12',
      question: 'Que permet de réaliser la fonction intégrée \'Sysprep\' de Windows couplée au MDT ?',
      options: [
        'Désinfecter l\'OS en profondeur d\'éventuels malware',
        'Généraliser une image machine Master en supprimant l\'Identité Sécurité (SID) afin d\'en réaliser un template réseau clonable avec WDS',
        'Vérifier au premier boot les dépendances .NET de Windows Server RDS',
        'Accélérer la synchronisation Active Directory LDAP'
      ],
      correctIndex: 1,
      explanation: 'Sysprep (System Preparation) s\'assure qu\'une image disque d\'un master Windows est "généralisée". Elle supprime son Security ID ou ses identités uniques, pour pouvoir cloner et redéployer cette même image sur des dizaines de PC physiquement différents sans créer de conflits informatiques dans un annuaire.'
    }
  ],
  exercises: [
    {
      id: 'm7_ex1',
      title: 'Initialisation des images WDS',
      stars: 1,
      description: 'L\'entreprise déploie de nouveaux postes via le réseau avec une solution WDS flambant neuve, et un serveur DHCP à jour. Lors d\'un test PXE, la machine trouve bien un bail DHCP, ping l\'adresse du WDS mais s\'arrête avec une erreur bloquant le menu d\'installation.',
      instruction: 'Quels fichiers devez-vous obligatoirement fournir a WDS, l\'un pour amorcer l\'écran (préinstallation) et l\'autre en guise de cible du système ?',
      hint: 'Ces fichiers possèdent généralement l\'extension .wim (Windows Image).',
      correction: 'Une image de démarrage (boot.wim) et une image d\'installation (install.wim)',
      explanation: 'Le processus de base de WDS se divise techniquement en deux flux. WDS ne fera rien tant qu\'il ne dispose pas de son Boot Image (pour distribuer l\'amorce WinPE à l\'ordinateur client nu) puis de l\'Install Image, pour réellement appliquer les fichiers OS sur le disque de la machine en question.'
    },
    {
      id: 'm7_ex2',
      title: 'Scénario MDT "Zero Touch"',
      stars: 2,
      description: 'Vous pilotez un parc informatique de grande échelle. Pour équiper 80 commerciaux en 3 jours, WDS seul entraînerait des centaines de clics sur les configurations (Fuseaux horaires, installation d\'Adobe reader, paramètre IP).',
      instruction: 'Avec la technologie MDT, quel composant va orchestrer scrupuleusement chacune de ces étapes métiers (post-installation de logiciels, nommage de domaine et autres Scripts PowerShell) le tout en une seule ligne ?',
      hint: 'C\'est l\'équivalent d\'un "Script global d\'état", se configurant sur un format chronologique depuis MDT.',
      correction: 'Une Task Sequence',
      explanation: 'La Task Sequence sous-jacente au MDT sert de colonne vertébrale (Workflow). Là où WDS ne se contente que de vider le code OS, cette séquence automatise toutes les configurations post-installation (jonction AD, paramétrage, silent install des exe/msi métier). Cela favorise ainsi une approche "Zero-Touch", supprimant complétement l\'interaction du technicien poste à poste.'
    },
    {
      id: 'm7_ex3',
      title: 'Choix architectural RDS',
      stars: 2,
      description: 'Une grande direction administrative renouvelle son logiciel "SIG-RH". L\'outil est particulièrement gourmand en puissance graphique et RAM. Or les ordinateurs du service ont plus de 10 ans et aucun budget PC n\'est disponible. L\'équipe ne veut par ailleurs pas dépayser ses agents par "un écran dans un écran, double bureau Windows" pour une simple application.',
      instruction: 'Quel module/composant précis de la configuration RDS permet d\'exécuter l\'application lourde sur votre cluster central de serveurs, mais d\'en afficher que "l\'application nue" sur l\'ordinateur de l\'utilisateur avec sa barre des tâches d\'origine ?',
      hint: 'L\'utilisateur verra l\'application tourner sur son fond d\'écran personnel, même s\'il y \'joue\' à distance.',
      correction: 'RemoteApp (publication d\'application distante)',
      explanation: 'RemoteApp fait abstraction de l\'expérience bureau complet Microsoft (où l\'on voit le menu démarrer complet central). L\'exécution des calculs CPU/RAM s\'effectue rigoureusement sur le serveur backend de production Remote Desktop, mais les trames applicatives s\'intègrent virtuellement et uniformément dans le client Windows local comme n\'importe quel autre programme local.'
    },
    {
      id: 'm7_ex4',
      title: 'Dépannage de Boot Réseau Multi-VLAN',
      stars: 3,
      description: 'Votre Serveur DHCP et votre Serveur WDS se trouvent confinés dans la DMZ des Services (VLAN 100). Les salles de classes de nouveaux PCs se situent dans la VLAN 10 (IP : 10.0.10.x). Les ordinateurs n\'arrivent aucunement à intercepter les requêtes WDS en PXE en raison du cloisonnement réseau L3 au Switch/Routeur du bâtiment.',
      instruction: 'Quelles sont les "Options" universelles DHCP qui doivent absolument être programmées sur le relais VLAN vers les machines pour pointer du doigt et rediriger ces ordinateurs ciblées vars la machine hébergeant le WDS ?',
      hint: 'Ces Option ID demandent de donner "Next-Host-Server IP" (nom boot serveur) et "Bootfile name".',
      correction: 'Configurateur l\'option DHCP 66 et l\'option DHCP 67, avec un IP Helper-address',
      explanation: 'Afin d\'enjamber le routeur L3 entre VLAN qui brise le broadcast réseau local (découverte par défaut sur la sous-partie), il faut configurer un IP Helper. Ce dernier renvoie la requête DHCP vers le vrai serveur gérant DHCP et WDS, sur lequel vous devrez souvent manuellement définir l\'option 66 (IP du serv WDS) et la 67 (indiquant le nom exact du wdsnbp.com du processus WDS boot).'
    },
    {
      id: 'm7_ex5',
      title: 'Topologie d\'Encapsulation (Security par DMZ)',
      stars: 3,
      description: 'Vous administrez la ferme de serveurs en Datacenter (Session Hosts, Broker, etc.). Les accès en Télétravail sans le VPN strict (trop complexe) sont bloqués par les pares-feux de vos consultants. Exposer le serveur central RDP via du NAT direct sur le port TCP:3389 est hors de question pour des raisons de viabilité Cyber.',
      instruction: 'Quel est le Composant d\'Architecture RDS que vous devriez placer et héberger dans la DMZ pour accepter les demandes depuis n\'importe quel wifi (Hôtel / Aéroport) sous le port standard classique HTTPS (443) et transférer l\'information en sécurité SSL vers le réseau local RDP (3389) de vos employés ?',
      hint: 'C\'est la porte sécurisée du réseau RDS pour ceux provenant du WAN.',
      correction: 'RDS Gateway (Service Passerelle Bureau à Distance)',
      explanation: 'Exposer nativement un RDP (3389) entraîne obligatoirement de graves alertes de compromissions (Ransomwares ou Bruteforce massif). Le rôle de RD Gateway tunnelise d\'une manière sûre l\'enveloppe RDP brute en une enveloppe HTTPS s\'accouplant avec un un certificat d\'autorité. Conséquences: seuls les possesseurs d\'une certification SSL accèdent à la trame RDP interne et cela permet à de passer tous les dispositifs de blocage firewall externes très contraignants limitant au strict standard Web.'
    },
    {
      id: 'm7_ex-gen',
      title: 'Expert Déploiement (Générateur)',
      stars: 5,
      description: 'Générateur de scénarios complexes sur WDS, MDT et RDS.',
      isGenerator: true,
      scenarios: [
        {
          instruction: 'Scénario : Un client PXE boot mais reçoit l\'erreur "PXE-E32: TFTP open timeout". Le serveur WDS est pourtant bien démarré.',
          hint: 'Le TFTP utilise le port UDP 69.',
          correction: 'Vérifier l\'ouverture du port UDP 69 sur le firewall ou le service TFTP du WDS',
          explanation: 'L\'erreur TFTP timeout indique que le client ne parvient pas à télécharger le fichier d\'amorçage (wdsnbp.com).'
        },
        {
          instruction: 'Scénario : Vous voulez que MDT installe Chrome automatiquement sur tous les nouveaux postes. Comment s\'appelle l\'outil où vous importez l\'exécutable et configurez la ligne de commande silencieuse ?',
          hint: 'C\'est dans Deployment Workbench.',
          correction: 'Applications',
          explanation: 'Dans le Deployment Workbench, on ajoute des packages dans la section "Applications" avec des commandes du type `setup.exe /silent`.'
        },
        {
          instruction: 'Scénario : Un utilisateur RDS se plaint que sa session est "gelée". Vous voulez forcer la fermeture de sa session sur le serveur pour qu\'il puisse se reconnecter proprement. Quel outil utilisez-vous ?',
          hint: 'Gestionnaire de tâches ou Gestionnaire de serveur.',
          correction: 'Gestionnaire de services de bureau à distance (ou Task Manager > Users)',
          explanation: 'On peut déconnecter ou fermer la session (Log off) d\'un utilisateur spécifique depuis l\'onglet Utilisateurs du gestionnaire de tâches sur le serveur.'
        }
      ]
    }
  ]
};

