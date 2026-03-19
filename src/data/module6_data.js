export const module6 = {
  id: 'services-microsoft',
  title: 'Services Microsoft (AD, DNS, DHCP)',
  description: 'Administration Windows Server, Active Directory, GPO, DNS et DHCP.',
  icon: '🪟',
  color: '#00a4ef',
  flashcards: [
    { id: 'fc1', front: 'Quelle est la différence entre un disque de base et un disque dynamique ?', back: 'Disque de base = partitions fixes.\nDisque dynamique = volumes, permet le RAID logiciel et l\'extension sur plusieurs disques.' },
    { id: 'fc2', front: 'Quels sont les 3 protocoles clés sur lesquels repose Active Directory ?', back: '1. DNS (localisation)\n2. LDAP (accès annuaire)\n3. Kerberos (authentification)' },
    { id: 'fc3', front: 'Quel rôle FSMO est le plus sollicité au quotidien ?', back: 'L\'Émulateur PDC (gestion des mots de passe, priorité sur les GPO, synchronisation de l\'heure).' },
    { id: 'fc4', front: 'Règle d\'attribution des droits NTFS (AGDLP) ?', back: 'A = Comptes Utilisateurs\nG = Groupes Globaux\nDL = Groupes de Domaine Local\nP = Permissions (droits NTFS)' },
    { id: 'fc5', front: 'Dans quel cas le broadcast DHCP ne passe-t-il pas ? Et quelle est la solution ?', back: 'Le broadcast ne traverse pas les routeurs.\nSolution : mettre en place un agent relais DHCP.' },
    { id: 'fc6', front: 'Qu\'est-ce que le processus DORA en DHCP ?', back: 'D = Discover (cherche serveur)\nO = Offer (serveur propose)\nR = Request (client demande l\'IP proposée)\nA = Acknowledge (serveur confirme)' },
    { id: 'fc7', front: 'Quelle est la différence entre une GPO de domaine et une stratégie locale ?', back: 'GPO de domaine : gérée par Active Directory, s\'applique à un site/domaine/OU, l\'emporte sur la locale.\nStratégie locale : configurée poste par poste.' },
    { id: 'fc8', front: 'Quelle est la commande pour forcer l\'application de toutes les GPO ?', back: 'gpupdate /force' },
    { id: 'fc9', front: 'Dans une résolution DNS, après le cache local, que consulte Windows ?', back: 'Il interroge son serveur DNS configuré, puis le fichier hosts si aucune réponse n\'est trouvée.' },
    { id: 'fc10', front: 'À quoi sert un enregistrement SRV dans le DNS ?', back: 'À localiser un service. Il est indispensable pour qu\'un poste client trouve un contrôleur de domaine Active Directory.' }
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Laquelle de ces affirmations sur la table de partition GPT est vraie ?',
      options: [
        'Elle limite à 4 partitions principales.',
        'Elle utilise des partitions étendues.',
        'Elle ne gère pas les grands disques.',
        'Elle n\'utilise pas de partition étendue et autorise plus de partitions majeures.'
      ],
      correct: 3,
      correctIndex: 3,
      explanation: 'Le GPT (GUID Partition Table) est le format moderne. Contrairement au MBR, il n\'a pas de partition étendue et permet beaucoup plus de partitions principales, gérant de très grands disques.'
    },
    {
      id: 'q2',
      question: 'En cas de conflit entre les autorisations de partage et les autorisations NTFS, quelle règle s\'applique ?',
      options: [
        'Le droit le plus permissif l\'emporte.',
        'Le droit NTFS l\'emporte toujours sur le partage.',
        'Le droit de partage l\'emporte toujours sur le NTFS.',
        'Le droit le plus restrictif s\'applique.'
      ],
      correct: 3,
      correctIndex: 3,
      explanation: 'Lors de l\'accès via le réseau, les droits de partage et NTFS sont évalués, et c\'est le plus restrictif des deux qui l\'emporte.'
    },
    {
      id: 'q3',
      question: 'Que permet de faire un "pool d\'imprimantes" ?',
      options: [
        'Imprimer en couleur sur une imprimante monochrome.',
        'Regrouper plusieurs imprimantes physiques sous une seule logique pour répartir la charge.',
        'Partager une seule imprimante physique avec plusieurs domaines.',
        'Stocker les impressions de manière sécurisée.'
      ],
      correct: 1,
      correctIndex: 1,
      explanation: 'Le pool répartit la charge sur plusieurs imprimantes physiques identiques, via une seule imprimante partagée pour l\'utilisateur.'
    },
    {
      id: 'q4',
      question: 'Comment s\'appelle l\'espace adressable et distribuable par un serveur DHCP ?',
      options: [
        'Un domaine DHCP',
        'Une étendue DHCP',
        'Une réservation DHCP',
        'Une diffusion DHCP'
      ],
      correct: 1,
      correctIndex: 1,
      explanation: 'Une étendue DHCP définit la plage d\'adresses IP distribuables sur un réseau donné, avec le masque, la passerelle, etc.'
    },
    {
      id: 'q5',
      question: 'Quel est l\'enregistrement DNS requis pour qu\'un client trouve le contrôleur de domaine ?',
      options: ['Enregistrement A', 'Enregistrement MX', 'Enregistrement SRV', 'Enregistrement SOA'],
      correct: 2,
      correctIndex: 2,
      explanation: 'L\'enregistrement SRV (Service) est indispensable dans un annuaire AD car il permet aux clients de localiser des services comme LDAP et Kerberos sur les DC.'
    },
    {
      id: 'q6',
      question: 'Que regroupe une forêt Active Directory ?',
      options: [
        'Un groupe d\'utilisateurs ayant les mêmes droits.',
        'Plusieurs domaines partageant le même schéma et la configuration.',
        'Une série de contrôleurs de domaine sur un même site physique.',
        'Plusieurs serveurs DNS maîtres.'
      ],
      correct: 1,
      correctIndex: 1,
      explanation: 'La forêt est l\'ensemble le plus large. Elle peut regrouper plusieurs domaines partageant la même configuration et le même schéma.'
    },
    {
      id: 'q7',
      question: 'Quel rôle FSMO est unique par forêt et permet d\'ajouter de nouveaux attributs aux objets ?',
      options: ['Maître RID', 'Maître d\'infrastructure', 'Émulateur PDC', 'Maître de schéma'],
      correct: 3,
      correctIndex: 3,
      explanation: 'Le Maître de schéma gère les modifications du schéma de l\'AD, comme l\'ajout ou la modification de types d\'objets et attributs.'
    },
    {
      id: 'q8',
      question: 'Dans une infrastructure AD, à quel type de groupe doit-on attribuer des droits sur une ressource précise ?',
      options: ['Groupe Global (GG)', 'Groupe de Domaine Local (GDL)', 'Groupe Universel', 'Groupe de Distribution'],
      correct: 1,
      correctIndex: 1,
      explanation: 'Les Groupes de Domaine Local (GDL) sont utilisés pour appliquer les permissions sur une ressource locale selon la méthode AGDLP.'
    },
    {
      id: 'q9',
      question: 'Comment déploie-t-on le plus souvent une imprimante aux utilisateurs via GPO ?',
      options: [
        'Par un script PowerShell obligatoire.',
        'En la liant à l\'OU des ordinateurs.',
        'En liant une GPO Utilisateur (Préférences > Imprimantes) à l\'OU des utilisateurs.',
        'En modifiant le schéma Active Directory.'
      ],
      correct: 2,
      correctIndex: 2,
      explanation: 'L\'imprimante s\'installe quand l\'utilisateur se connecte : on déploie donc via GPO (Préférences) liée à son Unité d\'Organisation (OU Utilisateurs).'
    },
    {
      id: 'q10',
      question: 'Quel est le rôle d\'un serveur DNS esclave ?',
      options: [
        'Faire les requêtes récursives au lieu du maître.',
        'Posséder une copie en lecture seule de la zone pour assurer la haute disponibilité.',
        'Stocker les mots de passe de l\'AD.',
        'Héberger uniquement les enregistrements IPv6.'
      ],
      correct: 1,
      correctIndex: 1,
      explanation: 'Le serveur cible copie la zone (en lecture seule) depuis le maître pour assurer la tolérance aux pannes et la répartition de charge.'
    }
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Administration AD',
      stars: 1,
      description: 'Création d\'un compte utilisateur standard dans une OU spécifique.',
      instruction: 'Quel outil graphique ou quelle commande PowerShell utiliseriez-vous pour créer un utilisateur nommé "Jean Dupont" dans l\'OU "Compta" du domaine "entreprise.local" ?',
      hint: 'Vous pouvez utiliser la console Utilisateurs et Ordinateurs Active Directory (ADUC).',
      correction: 'Console : dsa.msc (ADUC) -> Clic droit sur l\'OU Compta -> Nouveau -> Utilisateur.\n\nEn PowerShell :\nNew-ADUser -Name "Jean Dupont" -Path "OU=Compta,DC=entreprise,DC=local"',
      explanation: 'L\'utilisation de la console graphique ou du cmdlet New-ADUser permet d\'ajouter un utilisateur avec les attributs de base et de le placer directement dans son Unité d\'Organisation (OU) cible.'
    },
    {
      id: 'ex2',
      title: 'Configuration d\'une Réservation DHCP',
      stars: 2,
      description: 'S\'assurer qu\'un équipement réseau obtient toujours la même adresse IP.',
      instruction: 'Une nouvelle imprimante réseau a l\'adresse MAC "00:11:22:33:44:55". Comment faire pour que le serveur DHCP de votre Windows Server lui attribue toujours l\'adresse IP 192.168.1.50 ?',
      hint: 'Cette adresse doit faire partie de la plage d\'étendue (ou être exclue des distributions automatiques globales) et un lien statique MAC/IP doit être créé.',
      correction: 'Dans la console DHCP (dhcpmgmt.msc), déroulez IPv4 > l\'étendue correspondante > "Réservations".\n\nFaites un clic droit > "Nouvelle réservation...". Indiquez l\'IP "192.168.1.50" et l\'adresse MAC "001122334455" (sans les deux points).',
      explanation: 'La réservation DHCP garantit qu\'un appareil identifié par son adresse physique (MAC) recevra systématiquement la configuration IP spécifiée, ce qui est indispensable pour la stabilité des serveurs ou imprimantes.'
    },
    {
      id: 'ex3',
      title: 'Mise en Place d\'un Redirecteur DNS',
      stars: 3,
      description: 'Permettre la résolution des noms externes au domaine (Internet).',
      instruction: 'Votre serveur DNS Active Directory est le seul DNS configuré sur la carte réseau des postes clients. Comment faire pour que les postes puissent accéder à Internet et résoudre "google.com" ?',
      hint: 'Le serveur local doit déléguer les requêtes qu\'il ne connaît pas à un autre serveur DNS d\'ordre supérieur.',
      correction: 'Dans la console DNS (dnsmgmt.msc), faire un clic droit sur le nom du serveur DNS > Propriétés > Onglet "Redirecteurs".\n\nAjoutez les adresses IP de serveurs DNS publics (ex: 8.8.8.8) ou ceux fournis par votre FAI.',
      explanation: 'Les redirecteurs DNS (Forwarders) permettent de transférer les requêtes concernant des zones non gérées sur le serveur local vers des serveurs externes. Sans cela, un serveur DNS "isolé" ne sait pas où trouver les racines d\'Internet (à moins d\'utiliser les indications de racine).'
    },
    {
      id: 'ex4',
      title: 'Déploiement Stratégie de Groupe (GPO)',
      stars: 3,
      description: 'Mapper automatiquement un dossier partagé à l\'ouverture de session.',
      instruction: 'Vous devez connecter le lecteur M: au partage "\\\\SRV-FICHIERS\\Marketing" pour tous les utilisateurs de l\'OU Marketing. Quelle est la méthode moderne recommandée avec les stratégies de groupe ?',
      hint: 'Évitez les vieux scripts .bat de "logon". Privilégiez l\'outil natif de configuration poussée de Windows.',
      correction: 'Créez une GPO, liez-la à l\'OU "Marketing", puis éditez-la.\nAllez dans : Configuration utilisateur > Préférences > Paramètres Windows > Mappages de lecteurs.\nCréez un nouvel élément, choisissez l\'action "Créer" (ou Mettre à jour), le chemin cible "\\\\SRV-FICHIERS\\Marketing", et attribuez-lui la lettre "M:".',
      explanation: 'Les "Préférences" de la stratégie de groupe permettent une administration simple, avec ciblage de niveau d\'élément (Item-Level Targeting) si besoin, sans complexité de scripts.'
    },
    {
      id: 'ex5',
      title: 'Application du Modèle A-G-DL-P',
      stars: 4,
      description: 'Attribuer les droits sur un dossier selon les bonnes pratiques Microsoft.',
      instruction: 'Vous devez donner les droits de modification sur le dossier partagé "Projets" aux utilisateurs "Alice" et "Bob". Décrivez précisément les 4 étapes selon le modèle AGDLP.',
      hint: 'A = Accounts, G = Global, DL = Domain Local, P = Permissions.',
      correction: '1. (A) Les comptes utilisateurs sont "Alice" et "Bob".\n2. (G) Créez un groupe global (ex: "GG_Equipe_Compta") et mettez-y Alice et Bob en tant que membres.\n3. (DL) Créez un groupe local de domaine (ex: "GDL_Projets_Modif").\n4. (P) Dans l\'onglet Sécurité NTFS du dossier "Projets", donnez le droit "Modification" au groupe "GDL_Projets_Modif".\n\nEnfin, ajoutez le groupe "GG_Equipe_Compta" comme membre du groupe "GDL_Projets_Modif".',
      explanation: 'Le modèle AGDLP sépare le fonctionnel (le métier: équipe, service via Global) de la ressource locale (la permission technique via Domaine Local). Cela facilite grandement la gestion de l\'empreinte de sécurité et les évolutions multi-domaines.'
    },
    {
      id: 'ex6',
      title: 'Dépannage Intégration / Jonction AD',
      stars: 4,
      description: 'Diagnostiquer l\'erreur réseau fréquente lors d\'une première jonction de domaine.',
      instruction: 'Un PC Windows 10 n\'arrive pas à rejoindre le domaine "entreprise.local". Vous recevez l\'erreur "Un contrôleur de domaine Active Directory pour ce domaine n\'a pas pu être contacté". Quelle est la cause la plus probable et comment le vérifier en ligne de commande ?',
      hint: 'Active Directory repose entièrement sur un service fondamental pour sa localisation des ressources.',
      correction: 'La cause principale est un mauvais serveur DNS configuré sur la carte IPv4 du poste client. (Le client utilise souvent la box FAI, incapable de connaître "entreprise.local").\n\nPour tester en ligne de commande :\nping entreprise.local\nou via PowerShell :\nResolve-DnsName -Name _ldap._tcp.dc._msdcs.entreprise.local -Type SRV',
      explanation: 'Pour devenir membre d\'un domaine, un poste client doit savoir localiser un contrôleur de domaine en contactant le DNS pour lire les enregistrements SRV (_ldap._tcp, etc.). Un DNS externe répondra par une erreur (NXDOMAIN).'
    }
  ]
};
