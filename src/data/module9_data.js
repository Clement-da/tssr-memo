export const module9 = {
  id: 'script-bash',
  title: 'Scripting Bash',
  description: 'Automatisation, variables, boucles, conditions et fonctions sous GNU/Linux.',
  icon: '📜',
  color: '#10b981',
  flashcards: [
    {
      id: 'm9_f1',
      front: 'À quoi sert le Shebang en première ligne d\'un script ?',
      back: 'Il indique au système quel interpréteur utiliser pour exécuter le fichier (ex: #!/bin/bash).'
    },
    {
      id: 'm9_f2',
      front: 'Quelle commande permet de rendre un script autorisé à l\'exécution ?',
      back: 'chmod +x nom_du_script.sh'
    },
    {
      id: 'm9_f3',
      front: 'Que contient la variable système `$?` ?',
      back: 'Le code retour (exit status) de la dernière commande exécutée (0 indique un succès, un autre chiffre indique une erreur).'
    },
    {
      id: 'm9_f4',
      front: 'À quoi correspondent les variables `$1, $2, $3...` ?',
      back: 'Elles correspondent aux arguments positionnels passés lors de l\'exécution du script.'
    },
    {
      id: 'm9_f5',
      front: 'Que contient la variable réservée `$#` ?',
      back: 'Le nombre total d\'arguments passés en paramètres au script.'
    },
    {
      id: 'm9_f6',
      front: 'Quelle est la différence entre les guillemets `" "` (doubles) et `\' \'` (simples) ?',
      back: 'Les doubles guillemets interpolent (évaluent) les variables à l\'intérieur, tandis que les simples traitent tout comme du texte brut strict.'
    },
    {
      id: 'm9_f7',
      front: 'À quoi sert l\'opérateur conditionnel `&&` ?',
      back: 'C\'est un ET logique. La seconde commande ne s\'exécute que si la première a réussi (code retour 0).'
    },
    {
      id: 'm9_f8',
      front: 'À quoi sert l\'opérateur `||` entre deux commandes ?',
      back: 'C\'est un OU logique. La seconde commande ne s\'exécute que si la première a ÉCHOUÉ (code retour > 0).'
    },
    {
      id: 'm9_f9',
      front: 'Quel test de condition permet de vérifier si un objet est un répertoire existant ?',
      back: 'Le test `[ -d /chemin ]`'
    },
    {
      id: 'm9_f10',
      front: 'Quel test permet de s\'assurer qu\'un fichier existe et n\'est PAS vide ?',
      back: 'Le test `[ -s /chemin/fichier ]` (s = size > 0).'
    },
    {
      id: 'm9_f11',
      front: 'Quel attribut doit-on ajouter pour déclarer une constante en Bash ?',
      back: 'Le mot-clé `declare -r MA_VAR="valeur"` (Read-only).'
    },
    {
      id: 'm9_f12',
      front: 'Dans une fonction, quel mot-clé garantit qu\'une variable ne polluera pas le reste du script ?',
      back: 'Le mot-clé `local` (ex: `local resultat="ok"`).'
    },
    {
      id: 'm9_f13',
      front: 'Comment capturer la sortie d\'une commande dans une variable ?',
      back: 'En utilisant la substitution de commande : `ma_var=$(commande)`'
    },
    {
      id: 'm9_f14',
      front: 'Quelle boucle utiliser pour parser un long fichier (ex: `/etc/passwd`) sans saturer la RAM ?',
      back: 'La boucle `while read` combinée à une redirection de l\'entrée `<` ou un pipe `|`.'
    },
    {
      id: 'm9_f15',
      front: 'Quelle syntaxe de condition est recommandée pour utiliser nativement des expressions régulières (Regex) ?',
      back: 'La syntaxe de test étendue `[[ "$var" =~ ^[0-9]+$ ]]` plutôt que les simples crochets.'
    }
  ],
  quiz: [
    {
      id: 'm9_q1',
      question: 'Lequel de ces shebangs est correctement formaté pour forcer l\'interpréteur Bash ?',
      options: [
        '#!/bin/bash',
        '#/bin/bash',
        '!/bin/bash',
        '//bin/bash'
      ],
      correctIndex: 0,
      explanation: 'Le shebang valide commence toujours par les deux caractères dièse et point d\'exclamation (`#!`), suivis du chemin absolu de l\'interpréteur.'
    },
    {
      id: 'm9_q2',
      question: 'Quel est le code de retour d\'une commande qui s\'est exécutée sans aucune erreur en Bash ?',
      options: [
        '1',
        '-1',
        '255',
        '0'
      ],
      correctIndex: 3,
      explanation: 'Le code retour 0 (succès absolu) est la norme des processus sous Linux. Toute autre valeur indique une anomalie.'
    },
    {
      id: 'm9_q3',
      question: 'Dans une structure if, quelle option teste si l\'entier `x` est strictement inférieur à 10 ?',
      options: [
        '[ $x -le 10 ]',
        '[ $x -lt 10 ]',
        '[ $x < 10 ]',
        '[ $x -eq 10 ]'
      ],
      correctIndex: 1,
      explanation: 'L\'argument POSIX pour inférieur Strictement (Less Than) est `-lt`. L\'alternative serait d\'utiliser l\'arithmétique double parenthèses `(( x < 10 ))`.'
    },
    {
      id: 'm9_q4',
      question: 'Quelle boucle faut-il utiliser pour réitérer une action TANT QUE la condition évaluée reste FAUSSE (s\'arrête quand elle devient vraie) ?',
      options: [
        'while',
        'foreach',
        'until',
        'for'
      ],
      correctIndex: 2,
      explanation: 'La boucle `until` patiente jusqu\'à ce qu\'une condition soit réalisée, idéale pour scruter l\'apparition d\'un fichier.'
    },
    {
      id: 'm9_q5',
      question: 'Que permet de réaliser la commande `bash -x monscript.sh` ?',
      options: [
        'Elle exporte le script en format binaire.',
        'Elle octroie les droits d\'exécution avant de lancer 1 seule fois le code.',
        'Elle lance le script en mode "Trace" (débogage pas à pas).',
        'Elle archive le répertoire courant.'
      ],
      correctIndex: 2,
      explanation: 'Le flag `-x` (xtrace) affiche la ligne du script avec ses variables interpolées juste avant de l\'exécuter, une arme fondamentale pour debugger un Bash défectueux.'
    },
    {
      id: 'm9_q6',
      question: 'Comment afficher proprement les variables `$1` puis `$2` en les séparant par un tiret, en excluant une évaluation shell additionnelle ou risque d\'erreur ?',
      options: [
        'echo $1-$2',
        'echo "$1 - $2"',
        'echo \'$1 - $2\'',
        'print ($1 "-" $2)'
      ],
      correctIndex: 1,
      explanation: 'Les doubles guillemets protégent la chaîne globale et permettent l\'interpolation exacte des variables à l\'affichage.'
    },
    {
      id: 'm9_q7',
      question: 'Quel caractère en fin d\'expression est nécessaire dans un bloc `case ... esac` pour valider la fin d\'un motif testé ?',
      options: [
        ';',
        'break',
        ';;',
        'done'
      ],
      correctIndex: 2,
      explanation: 'Le double point-virgule `;;` signale au démon Bash la fin immédiate des instructions pour la clause courante du case, entrainant la sortie propre du bloc.'
    },
    {
      id: 'm9_q8',
      question: 'Lequel de ces tests sur fichier vérifie à la fois s\'il existe ET si l\'utilisateur lançant le script a le droit d\'exécuter ce fichier ?',
      options: [
        '[ -e fichier ]',
        '[ -w fichier ]',
        '[ -x fichier ]',
        '[ -r fichier ]'
      ],
      correctIndex: 2,
      explanation: 'Le test `-x` s\'assure non seulement que le fichier est présent sur le disque mais valide spécifiquement la permission (eXecutable).'
    },
    {
      id: 'm9_q9',
      question: 'En comparaison string simple, avec la syntaxe `[ "$A" ... "$B" ]`, quel est l\'opérateur valide pour déterminer "Différent de" ?',
      options: [
        '-ne',
        '!==',
        '!=',
        '<>'
      ],
      correctIndex: 2,
      explanation: 'Pour valider deux chaînes différentes en bash on utilise `!=`. En revanche, pour valider que deux NOMBRES sont différents en POSIX, ce serait `-ne`.'
    },
    {
      id: 'm9_q10',
      question: 'A quoi sert la variable IFS dans une boucle `while read` ?',
      options: [
        'Interpoler un Fichier Systeme (IFS).',
        'Définir le séparateur interne pour formater la donnée (Internal Field Separator).',
        'Assurer la boucle infinie pour un stream.',
        'Intégrer les fonctions spéciales.'
      ],
      correctIndex: 1,
      explanation: 'Placer `IFS=:` force la boucle `read` à découper la ligne lue en multiples variables dès qu\'un deux-points `:` est rencontré.'
    },
    {
      id: 'm9_q11',
      question: 'Si j\'implémente une fonction `startProcess() { ... }`, comment puis-je l\'appeler depuis mon script avec un paramètre "force" ?',
      options: [
        'startProcess(force)',
        'startProcess -p force',
        'startProcess "force"',
        'call startProcess force'
      ],
      correctIndex: 2,
      explanation: 'En bash, appeler une fonction se fait exactement comme appeler une commande binaire standard : Le nom de la fonction suivi du contexte argumentaire avec un espace.'
    },
    {
      id: 'm9_q12',
      question: 'Au niveau philosophique et architectural, quelle est la principale différence prônée de PowerShell par rapport à Bash ?',
      options: [
        'PowerShell gère du texte brut plus rapidement.',
        'PowerShell traite des objets structurés et non pas des flux texte basiques.',
        'PowerShell est exclusivement fonctionnel sur Windows et n\'existe pas sous Linux.',
        'Bash gagne par le biais natif de WMI.'
      ],
      correctIndex: 1,
      explanation: 'Le Core PowerShell repose sur .NET : un output de commande amène directement un OBJET avec propriétés (par ex: fichier.size, processus.name). Bash traite des suites de "caractères" que l\'on doit parser.'
    }
  ],
  exercises: [
    {
      id: 'm9_ex1',
      title: 'Premières variables Bash',
      stars: 1,
      description: 'Déclarer et injecter des variables dans un message de log.',
      instruction: 'Scénario : Vous créez un script de log. Comment capturer dynamiquement le nom de l\'utilisateur actuel (via la commande `whoami`) dans une variable nommée `USER_NOW` ?',
      hint: 'Utilisez la syntaxe avec des parenthèses.',
      correction: 'USER_NOW=$(whoami)',
      explanation: 'La syntaxe $(commande) est la norme moderne en Bash. Elle permet l\'imbrication de commandes et remplace avantageusement les backticks `` ` ``.'
    },
    {
      id: 'm9_ex2',
      title: 'Contrôle d\'existence et Privilèges',
      stars: 2,
      description: 'Sécuriser le démarrage d\'un script d\'administration.',
      instruction: 'Quel test de condition `if` permet de vérifier si le fichier `/etc/shadow` est accessible en lecture (`-r`) POUR l\'utilisateur actuel ?',
      hint: 'if [ -x ... ] ? Non, lecture seule.',
      correction: 'if [ -r /etc/shadow ]; then',
      explanation: 'Le flag -r vérifie les permissions réelles de lecture au moment de l\'exécution. Indispensable avant de tenter un parsurage de fichier sensible.'
    },
    {
      id: 'm9_ex3',
      title: 'Logique de Boucle Foreach',
      stars: 2,
      description: 'Automatiser une action sur une liste de serveurs.',
      instruction: 'Dans une boucle `for`, quelle variable automatique contient l\'élément de l\'itération en cours si j\'écris : `for serveur in srv1 srv2; do ... done` ?',
      hint: 'Regardez le nom défini juste après le mot-clé for.',
      correction: '$serveur',
      explanation: 'La variable `serveur` prend successivement la valeur de chaque élément de la liste. On y accède avec le symbole $ à l\'intérieur du bloc do/done.'
    },
    {
      id: 'm9_ex4',
      title: 'Menu Interactif Case',
      stars: 2,
      description: 'Créer un menu de gestion de service simple.',
      instruction: 'Quel symbole double permet de terminer une clause (une option) dans un bloc `case` ?',
      hint: 'C\'est un double ponctuation.',
      correction: ';;',
      explanation: 'Le double point-virgule `;;` est impératif en Bash pour signaler la fin des instructions d\'un motif et sortir proprement du bloc case.'
    },
    {
      id: 'm9_ex5',
      title: 'Parsing de fichier (Expert)',
      stars: 3,
      description: 'Extraire les utilisateurs système du fichier passwd.',
      instruction: 'Quelle variable d\'environnement interne faut-il modifier JUSTE AVANT un `read` pour découper une ligne selon le séparateur ":" ?',
      hint: 'Internal Field Separator.',
      correction: 'IFS=:',
      explanation: 'En redéfinissant l\'IFS (Internal Field Separator), on force la commande read à ventiler les colonnes du fichier /etc/passwd dans différentes variables nommées.'
    },
    {
      id: 'm9_ex-gen',
      title: 'Entraînement Infini (Générateur Bash)',
      stars: 5,
      description: 'Un générateur qui crée à la volée des scénarios de scripting Bash (boucles, test, fonctions, case...).',
      isGenerator: true,
      scenarios: [
        {
          instruction: 'Scénario : Créez un script qui prend un paramètre. Si aucun paramètre n\'est fourni, affichez "Usage: script.sh <dossier>" et quittez avec une erreur (1). Sinon, créez le dossier.',
          hint: 'Vérifiez $# (nombre d\'arguments) avec -eq 0. Utilisez exit 1 pour quitter.',
          correction: 'if [ $# -eq 0 ]; then\n    echo "Usage: $0 <dossier>"\n    exit 1\nfi\nmkdir -p "$1"',
          explanation: 'Vérifier la présence des arguments avant de les utiliser prévient les comportements inattendus. `$0` contient le nom du script, `$1` le premier argument.'
        },
        {
          instruction: 'Scénario : Écrivez une boucle for qui parcourt tous les fichiers `.txt` du répertoire courant et les renomme avec l\'extension `.bak`.',
          hint: 'Utilisez `for fichier in *.txt`, et la substitution de sous-chaîne `"${fichier%.txt}.bak"`.',
          correction: 'for fichier in *.txt; do\n    mv "$fichier" "${fichier%.txt}.bak"\ndone',
          explanation: 'La syntaxe `${var%motif}` permet de supprimer le suffixe d\'une variable. Très puissant pour renommer en masse.'
        },
        {
          instruction: 'Scénario : Avec une boucle while, lisez le fichier `/etc/passwd`. Pour chaque ligne, extrayez séparément le login (champ 1) et le shell (champ 7) sachant que le séparateur est `:`. Affichez "User: [login] - Shell: [shell]".',
          hint: 'Utilisez `while IFS=: read -r login x x x x x shell; do ... done < /etc/passwd`',
          correction: 'while IFS=: read -r login x x x x x shell; do\n    echo "User: $login - Shell: $shell"\ndone < /etc/passwd',
          explanation: 'Le read va automatiquement séparer la ligne selon la valeur de IFS. On attribue les champs non désirés à une variable "poubelle" (comme x).'
        },
        {
          instruction: 'Scénario : Créez une fonction `check_service()` qui prend en paramètre le nom d\'un service. Si la commande `systemctl is-active --quiet $1` réussit, affichez "[Service] OK", sinon "[Service] KO".',
          hint: 'Les paramètres de fonction sont dans $1. Utilisez `local` pour la variable temporelle. Testez la commande avec if.',
          correction: 'check_service() {\n    local srv="$1"\n    if systemctl is-active --quiet "$srv"; then\n        echo "$srv OK"\n    else\n        echo "$srv KO"\n    fi\n}',
          explanation: 'Une commande peut être évaluée directement par un `if`. L\'utilisation du mot-clé `local` garantit que la variable `$srv` ne corrompt pas le reste du script global.'
        },
        {
          instruction: 'Scénario : Mettez en place un menu interactif avec `case` qui demande à l\'utilisateur son choix (1, 2 ou q). Si 1: affichez la date. Si 2: affichez l\'espace disque (df -h). Si q: quittez avec exit 0. Si autre chose: affichez "Invalide".',
          hint: 'Utilisez `read -p` pour la saisie, puis `case $choix in ... esac`. Terminez chaque sous-bloc par `;;`.',
          correction: 'read -p "Choix: " choix\ncase $choix in\n    1)\n        date\n        ;;\n    2)\n        df -h\n        ;;\n    q)\n        exit 0\n        ;;\n    *)\n        echo "Invalide"\n        ;;\nesac',
          explanation: 'La structure `case` est parfaite pour créer des menus shell textuels. Le motif `*)` agit comme solution de repli (défaut).'
        }
      ]
    }
  ]
};
