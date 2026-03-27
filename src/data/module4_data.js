/**
 * module4_data.js — Systèmes Clients Microsoft
 * Architecture pédagogique : Unités d'apprentissage structurées
 * Niveau : EXPERT TSSR (Technicien Supérieur Systèmes et Réseaux)
 */

export const module4 = {
    id: 'systemes-microsoft',
    title: 'Systèmes Clients Microsoft',
    icon: '💻',
    quiz: [
        {
            question: "Lequel de ces rôles n'est PAS une fonction principale du système d'exploitation ?",
            options: [
                "Gestion de l'allocation RAM",
                "Réparation physique du disque dur",
                "Gestion des pilotes de périphériques",
                "Répartition du temps CPU entre les processus"
            ],
            correctIndex: 1,
            explanation: "L'OS gère les ressources logicielles et l'accès au matériel, mais il ne peut pas effectuer de réparation physique (mécanique) d'un composant."
        },
        {
            question: "Qu'est-ce qu'une CAL (Client Access License) Microsoft ?",
            options: [
                "La licence d'installation de Windows 10/11",
                "Le droit légal pour un utilisateur/périphérique d'accéder aux services d'un serveur",
                "Une clé d'activation pour la suite Office",
                "Un outil de déploiement d'images système"
            ],
            correctIndex: 1,
            explanation: "Les CAL sont obligatoires en entreprise pour autoriser les postes clients à se connecter aux partages, à l'AD ou aux applications hébergées sur un serveur Windows."
        },
        {
            question: "Lors d'un déplacement de fichier d'un volume C: vers un volume D:, comment se comportent les permissions NTFS ?",
            options: [
                "Le fichier conserve ses permissions d'origine",
                "Le fichier hérite des permissions du dossier de destination sur D:",
                "Le fichier perd toutes ses permissions",
                "L'opération est impossible"
            ],
            correctIndex: 1,
            explanation: "Lors d'un déplacement entre deux volumes physiques/logiques différents (C vers D), Windows effectue techniquement une copie suivie d'une suppression. Le fichier hérite donc des droits de la destination."
        },
        {
            question: "Quel outil Microsoft permet de capturer et d'appliquer des images système au format .WIM en ligne de commande ?",
            options: ["Sysprep", "USMT", "DISM", "WinRE"],
            correctIndex: 2,
            explanation: "DISM (Deployment Image Servicing and Management) est le 'couteau suisse' utilisé pour capturer, monter ou appliquer des images système Windows."
        },
        {
            question: "Dans le registre Windows, quelle ruche contient la configuration spécifique au matériel et au système, commune à tous les utilisateurs ?",
            options: ["HKEY_CURRENT_USER", "HKEY_USERS", "HKEY_LOCAL_MACHINE", "HKEY_CURRENT_CONFIG"],
            correctIndex: 2,
            explanation: "HKEY_LOCAL_MACHINE (HKLM) stocke les paramètres globaux de la machine (Software, System, Hardware, Security)."
        },
        {
            question: "Pourquoi l'activation du NLA (Network Level Authentication) est-elle recommandée pour le RDP ?",
            options: [
                "Pour accélérer les transferts de fichiers",
                "Pour permettre l'impression distante",
                "Pour authentifier l'utilisateur via le réseau avant d'instancier la session graphique locale",
                "Pour crypter les mots de passe avec BitLocker"
            ],
            correctIndex: 2,
            explanation: "Le NLA améliore la sécurité en empêchant l'ouverture d'un écran de login graphique gourmand en ressources avant que l'utilisateur n'ait prouvé son identité."
        },
        {
            question: "Un technicien souhaite redémarrer spécifiquement le service qui gère la file d'attente d'impression. Quel est le nom du service ?",
            options: ["PrintManager", "Spooler", "WDS", "RPC"],
            correctIndex: 1,
            explanation: "Le 'Spouleur d'impression' (spooler) est le moteur qui gère les documents en attente. Un 'net stop spooler && net start spooler' résout souvent les blocages."
        },
        {
            question: "Quelle est la particularité du système de fichiers FAT32 utilisée sur les supports amovibles ?",
            options: [
                "Il est beaucoup plus sécurisé que NTFS",
                "Il ne supporte pas les fichiers de plus de 4 Go",
                "Il permet de compresser les dossiers nativement",
                "Il est réservé uniquement aux serveurs"
            ],
            correctIndex: 1,
            explanation: "FAT32 est universel mais a des limites techniques : pas de gestion de droits NTFS et une taille de fichier maximale de 4 Go."
        },
        {
            question: "À quoi sert la commande 'scanstate' dans l'outil USMT ?",
            options: [
                "À vérifier l'intégrité du disque dur",
                "À capturer les profils et paramètres utilisateurs d'un PC source",
                "À scanner le réseau pour trouver des serveurs WDS",
                "À analyser le registre pour trouver des erreurs"
            ],
            correctIndex: 1,
            explanation: "Scanstate analyse et 'aspire' les données configurées pour être migrées (profil, documents, paramètres) avant que loadstate ne les réinjecte."
        },
        {
            question: "Dans le cadre de Windows as a Service (WaaS), quand sont publiés les correctifs de sécurité critiques ?",
            options: [
                "Chaque lundi matin",
                "Une fois par an lors de la mise à jour de Build",
                "Le deuxième mardi de chaque mois (Patch Tuesday)",
                "Uniquement quand l'utilisateur redémarre son PC"
            ],
            correctIndex: 2,
            explanation: "Microsoft suit un calendrier strict appelé Patch Tuesday pour la diffusion des Quality Updates."
        }
    ],
    flashcards: [
        {
            front: "Rôle du Noyau (Kernel) ?",
            back: "C'est le cœur de l'OS. Il gère l'allocation des ressources et est le seul à parler directement au matériel."
        },
        {
            front: "Différence majeure entre Windows Home et Pro ?",
            back: "La version Pro permet la jonction au domaine Active Directory et l'application des GPO (indispensable en entreprise)."
        },
        {
            front: "Port par défaut du RDP ?",
            back: "TCP 3389."
        },
        {
            front: "Droit le plus restrictif (Partage vs NTFS) ?",
            back: "Calcul : Droit final = Point commun le plus bas entre les deux listes de droits."
        },
        {
            front: "Commande pour lancer l'Observateur d'évènements ?",
            back: "eventvwr.msc"
        },
        {
            front: "Utilité du Sysprep ?",
            back: "Généraliser une installation Windows en changeant le SID et le nom pour permettre le clonage sans conflits."
        },
        {
            front: "Qu'est-ce qu'un Pool d'impression ?",
            back: "Associer 1 imprimante (Windows) à plusieurs périphériques physiques pour répartir la charge de travail."
        },
        {
            front: "Limite RAM de l'architecture x86 (32 bits) ?",
            back: "Environ 3,2 à 4 Go maximum."
        },
        {
            front: "Fonction du SID ?",
            back: "Identifiant unique interne d'un objet de sécurité (utilisateur/groupe). Windows ne travaille pas avec les noms mais avec les SIDs."
        },
        {
            front: "Support maximal de partitionnement sur GPT ?",
            back: "Jusqu'à 128 partitions et supporte les disques > 2 To."
        }
    ],
    exercises: [
        {
            id: 'ex1',
            title: 'Diagnostic du Spouleur',
            stars: 1,
            description: 'Résoudre un blocage d\'impression.',
            instruction: 'Donnez les deux commandes successives en ligne de commande (CMD) permettant de réinitialiser le service de spouleur d\'impression.',
            hint: 'Le nom du service est spooler.',
            correction: 'net stop spooler && net start spooler',
            explanation: 'Arrêter puis redémarrer le service permet de vider les fichiers temporaires corrompus et de relancer la file d\'attente.'
        },
        {
            id: 'ex2',
            title: 'Analyse d\'image DISM',
            stars: 2,
            description: 'Vérifier le contenu d\'un fichier WIM.',
            instruction: 'Quelle commande DISM permet d\'afficher les informations (éditions présentes) à l\'intérieur du fichier "C:\\sources\\install.wim" ?',
            hint: 'Utilisez l\'option /Get-ImageInfo.',
            correction: 'dism /Get-ImageInfo /ImageFile:C:\\sources\\install.wim',
            explanation: 'Cette commande permet de lister les index et les noms des versions de Windows contenues dans le fichier image.'
        },
        {
            id: 'ex3',
            title: 'Droits NTFS : Le Déplacement',
            stars: 3,
            description: 'Comprendre l\'héritage lors des mouvements de fichiers.',
            instruction: 'Vous déplacez un dossier "Archives" du disque C: vers le disque D:. Quel sera le comportement des permissions NTFS sur la destination ?',
            hint: 'Le déplacement entre volumes différents équivaut à une copie.',
            correction: 'Le dossier hérite des permissions du dossier parent sur D:',
            explanation: 'Comme il s\'agit d\'un changement de volume, Windows recrée le dossier sur D:, il hérite donc naturellement des permissions de son nouveau conteneur.'
        },
        {
            id: 'ex4',
            title: 'Sécurité RDP',
            stars: 3,
            description: 'Configuration sécurisée de l\'accès distant.',
            instruction: 'Citez le nom de la fonctionnalité de sécurité qui oblige Windows à authentifier un utilisateur avant de charger l\'interface graphique du Bureau à distance.',
            hint: 'L\'acronyme est NLA.',
            correction: 'NLA (Network Level Authentication)',
            explanation: 'Le NLA protège le serveur distant en exigeant une preuve d\'identité réseau avant de consommer des ressources graphiques pour la session.'
        },
        {
            id: 'm4_ex-gen',
            title: 'Expert Windows (Générateur)',
            stars: 5,
            description: 'Générateur de scénarios de support et administration Windows.',
            isGenerator: true,
            scenarios: [
                {
                    instruction: 'Scénario : Un utilisateur ne peut plus imprimer. Vous voulez vider la file d\'attente. Quelle est la commande pour ARRETER le service spouleur ?',
                    hint: 'net stop nom_du_service.',
                    correction: 'net stop spooler',
                    explanation: 'L\'arrêt du service est la première étape pour vider le dossier C:\\Windows\\System32\\spool\\PRINTERS.'
                },
                {
                    instruction: 'Scénario : Vous voulez voir la liste de tous les pilotes installés sur la machine Windows. Quelle commande CMD utilisez-vous ?',
                    hint: 'C\'est une commande qui liste les drivers.',
                    correction: 'driverquery',
                    explanation: '`driverquery` fournit un tableau récapitulatif de tous les pilotes de périphériques chargés.'
                },
                {
                    instruction: 'Scénario : Un fichier est verrouillé sur le disque C:. Vous voulez forcer la vérification du système de fichiers au prochain redémarrage. Quelle commande ?',
                    hint: 'C\'est la commande Check Disk.',
                    correction: 'chkdsk c: /f',
                    explanation: 'L\'option /f (fix) demande à Windows de réparer les erreurs sur le disque spécifié.'
                }
            ]
        }
    ]
};

