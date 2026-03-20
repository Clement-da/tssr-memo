/**
 * module_linux_data.js — Administration Linux (Base et avancée)
 * Source : LINUX_COMMANDES_clean.md
 */

export const moduleLinux = {
    id: 'administration-linux',
    title: 'Administration Linux',
    icon: '🐧',
    quiz: [
        {
            question: "Quelle commande affiche le chemin absolu du répertoire dans lequel vous vous trouvez ?",
            options: ["cd", "whereis", "pwd", "ls"],
            correctIndex: 2,
            explanation: "pwd (print working directory) affiche le chemin complet du répertoire courant."
        },
        {
            question: "Que permet l'option -h utilisée avec la commande 'df' ou 'du' ?",
            options: [
                "Affiche l'aide (Help)",
                "Affiche les tailles en format 'lisible par l'humain' (Mo, Go...)",
                "Cache les fichiers système (Hidden)",
                "Affiche l'historique des modifications"
            ],
            correctIndex: 1,
            explanation: "-h (human-readable) convertit les octets en Ko, Mo ou Go pour faciliter la lecture."
        },
        {
            question: "Quel est l'équivalent octal (chiffres) des droits 'rwxr-xr-x' ?",
            options: ["644", "700", "755", "777"],
            correctIndex: 2,
            explanation: "rwx=7 | r-x=5 | r-x=5. Soit 755."
        },
        {
            question: "Quelle commande permet de surveiller un fichier de log en temps réel ?",
            options: ["cat /var/log/syslog", "less +F /var/log/syslog", "tail -f /var/log/syslog", "grep watch /var/log/syslog"],
            correctIndex: 2,
            explanation: "tail -f (follow) affiche les nouvelles lignes ajoutées au fichier au fur et à mesure."
        },
        {
            question: "Comment forcer l'arrêt immédiat d'un processus dont le PID est 1234 ?",
            options: ["stop 1234", "kill -9 1234", "close 1234", "rm PID 1234"],
            correctIndex: 1,
            explanation: "le signal -9 (SIGKILL) force le noyau à arrêter le processus immédiatement."
        },
        {
            question: "Quelle commande remplace aujourd'hui 'ifconfig' pour voir les adresses IP ?",
            options: ["ip a", "netstat -i", "show ip", "ifaddr show"],
            correctIndex: 0,
            explanation: "La commande 'ip a' (ou show) fait partie de la suite iproute2 et remplace l'ancien ifconfig."
        },
        {
            question: "Dans quel répertoire se trouvent la plupart des fichiers de configuration globale du système ?",
            options: ["/bin", "/var", "/etc", "/home"],
            correctIndex: 2,
            explanation: "/etc est le répertoire standard pour la configuration (Everything To Configure)."
        },
        {
            question: "Que signifie le symbole '|' (pipe) entre deux commandes ?",
            options: [
                "Il indique une condition 'OU'",
                "Il permet de sauvegarder la sortie dans un fichier",
                "Il envoie la sortie de la première commande comme entrée de la seconde",
                "Il sépare deux commandes qui s'exécutent en parallèle"
            ],
            correctIndex: 2,
            explanation: "Le pipeline (|) permet de chaîner les commandes en transformant la sortie standard en entrée standard."
        },
        {
            question: "Quelle commande permet de changer le propriétaire d'un fichier ?",
            options: ["chmod", "chown", "passwd", "usermod"],
            correctIndex: 1,
            explanation: "chown (change owner) permet de définir l'utilisateur et le groupe propriétaire."
        },
        {
            question: "Comment extraire le contenu d'une archive compressée 'backup.tar.gz' ?",
            options: ["tar -czvf backup.tar.gz", "tar -xzvf backup.tar.gz", "tar -xvf backup.tar.gz", "unzip backup.tar.gz"],
            correctIndex: 1,
            explanation: "-x (extract) | -z (gzip) | -v (verbose) | -f (file)."
        }
    ],

    flashcards: [
        {
            front: "Où suis-je dans l'arborescence ?",
            back: "Commande 'pwd' (print working directory)."
        },
        {
            front: "Lister les dossiers avec détails et fichiers cachés ?",
            back: "Commande 'ls -la'."
        },
        {
            front: "Différence entre un chemin absolu et relatif ?",
            back: "Absolu : commence par / (ex: /etc/network).\nRelatif : commence par le dossier actuel (ex: network/)."
        },
        {
            front: "Signification de chmod 644 ?",
            back: "6 (Propriétaire : rw-) | 4 (Groupe : r--) | 4 (Autres : r--).\nLecture/écriture pour le proprio, lecture seule pour les autres."
        },
        {
            front: "Comment 'tuer' un processus récalcitrant ?",
            back: "Identifier le PID avec 'top' ou 'ps', puis lancer 'kill -9 PID'."
        },
        {
            front: "Dépannage réseau : voir les ports en écoute ?",
            back: "Commande 'ss -tuln' (TCP/UDP, Listening, Numeric ports)."
        },
        {
            front: "Vérifier l'espace disque restant ?",
            back: "Commande 'df -h' (disk free, human readable)."
        },
        {
            front: "Chercher un mot dans un gros fichier ?",
            back: "Commande 'grep \"mot\" nom_du_fichier'."
        },
        {
            front: "Sauvegarder le dossier /etc de manière compressée ?",
            back: "tar -czvf backup_etc.tar.gz /etc"
        },
        {
            front: "Regarder les 20 dernières lignes d'un fichier ?",
            back: "tail -n 20 nom_du_fichier"
        }
    ],

    exercises: [
        {
            id: 'ex1',
            title: 'Audit et Correction de Droits Web',
            stars: 1,
            description: 'Rétablir l\'accès à une application web bloquée.',
            instruction: 'Le serveur web Apache (utilisateur `www-data`) ne peut pas lire le fichier `/var/www/html/index.php`. Le fichier appartient à `root:root` avec les droits `600`. Quelles commandes permettent de corriger cela tout en respectant la sécurité standard ?',
            hint: 'Le serveur doit être propriétaire ou avoir le droit de lecture.',
            correction: 'chown www-data:www-data /var/www/html/index.php\nchmod 644 /var/www/html/index.php',
            explanation: 'On attribue la propriété au service web et on donne le droit de lecture à tout le monde (644) tout en gardant l\'écriture pour le service seulement.'
        },
        {
            id: 'ex2',
            title: 'Analyse Technique de Logs',
            stars: 2,
            description: 'Isoler un événement dans un fichier système.',
            instruction: 'Affichez les 50 dernières lignes du fichier de log `/var/log/syslog` mais n\'affichez que celles qui contiennent le mot "error" (minuscules ou majuscules).',
            hint: 'Combinez tail et grep avec un pipe.',
            correction: 'tail -n 50 /var/log/syslog | grep -i "error"',
            explanation: 'Tail extrait la fin du fichier, le pipe envoie le flux à grep qui filtre avec l\'option -i (insensible à la casse).'
        },
        {
            id: 'ex3',
            title: 'Urgence Saturation Disque',
            stars: 3,
            description: 'Nettoyage ciblé d\'une partition pleine.',
            instruction: 'La partition `/var` est à 100%. Identifiez les 3 plus gros sous-répertoires de `/var` pour trouver la source de la saturation.',
            hint: 'Utilisez `du` et `sort`.',
            correction: 'du -sh /var/* | sort -rh | head -n 3',
            explanation: 'du -sh calcule la taille par dossier, sort -rh trie par taille décroissante.'
        },
        {
            id: 'ex4',
            title: 'Diagnostic de Port Service',
            stars: 3,
            description: 'Vérifier l\'état d\'un daemon SSH.',
            instruction: 'Vous ne parvenez pas à vous connecter en SSH. Quelle commande permet de vérifier instantanément si le serveur écoute bien sur le port 22 et quel est le nom du processus (Daemon) responsable ?',
            hint: 'L\'outil `ss` est le plus rapide pour cela.',
            correction: 'ss -tulnp | grep :22',
            explanation: 'L\'option -p de ss affiche le nom du programme. On filtre sur le port 22 pour isoler la ligne du service SSH.'
        }
    ]
};
