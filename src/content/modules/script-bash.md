---
id: "script-bash"
title: "Scripting Bash"
icon: "📜"
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
            <li><a href="#unite1">1. Principes et Conception</a>
                <ol>
                    <li><a href="#conception-theory">Le rôle central du scripting</a></li>
                    <li><a href="#conception-concept">Méthodologie et exécution</a></li>
                    <li><a href="#conception-context">Processus de création en entreprise</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Variables et Environnement</a>
                <ol>
                    <li><a href="#vars-theory">Gestion de l'état</a></li>
                    <li><a href="#vars-concept">Types de variables Bash</a></li>
                    <li><a href="#vars-context">Automatisation paramétrée</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Logique et Conditions</a>
                <ol>
                    <li><a href="#cond-theory">Théorie : L'arbre de décision</a></li>
                    <li><a href="#cond-if">La condition "If"</a></li>
                    <li><a href="#cond-case">Le "Case" (Menus)</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Les Boucles (Itérations)</a>
                <ol>
                    <li><a href="#loop-theory">Théorie : L'automatisation par la répétition</a></li>
                    <li><a href="#loop-while">La boucle "While"</a></li>
                    <li><a href="#loop-until">La boucle "Until"</a></li>
                    <li><a href="#loop-for">La boucle "For" (Liste)</a></li>
                    <li><a href="#loop-read">Le Pipeline (While Read)</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Couleurs dans le Shell</a>
                <ol>
                    <li><a href="#colors-theory">Séquences d'échappement ANSI</a></li>
                    <li><a href="#colors-concept">Attributs et codes couleurs</a></li>
                    <li><a href="#colors-context">Expertise : Logs formatés</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. Fonctions et Factorisation</a>
                <ol>
                    <li><a href="#func-theory">Modularité du code</a></li>
                    <li><a href="#func-concept">Déclaration et arguments</a></li>
                    <li><a href="#func-context">Librairies de scripts d'administration</a></li>
                </ol>
            </li>
            <li><a href="#unite7">7. Bash vs PowerShell</a>
                <ol>
                    <li><a href="#powershell-theory">Le choc des deux mondes</a></li>
                    <li><a href="#powershell-concept">Comparatif des approches</a></li>
                    <li><a href="#powershell-context">Quel outil choisir ?</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Principes et Conception</h2>

<h3 id="conception-theory">Théorie : Le rôle central du scripting</h3>
<p>Un administrateur système ou ingénieur réseau ne peut pas se permettre d'exécuter manuellement des tâches répétitives. Un <strong>script Bash</strong> est bien plus qu'une simple suite de commandes : c'est un programme réunissant la logique d'exécution, la robustesse et l'automatisation. Plutôt que de saisir les mêmes commandes à la main, on consigne ce processus de manière reproductible et fiable.</p>

<h3 id="conception-concept">Méthodologie et syntaxe de base</h3>
<p>Un script commence toujours par la ligne définissant l'interpréteur (le <strong>shebang</strong>), suivi de l'organisation séquentielle des commandes.</p>

| Élément | Syntaxe / Commande | Signification |
| :--- | :--- | :--- |
| **Shebang** | `#!/bin/bash` | Force le shell parent à exécuter le script avec l'interpréteur donné. |
| **Exécutable** | `chmod +x script.sh` | Permet le lancement du script directement via `./script.sh` |
| **Mode trace** | `bash -x script.sh` | Affiche chaque commande avant son exécution (débogage essentiel). |
| **Vérification** | `bash -n script.sh` | Vérifie la syntaxe du fichier sans l'exécuter. |

<h3 id="conception-context">Expertise : Processus de création en entreprise</h3>
<p>En entreprise, on n'écrit jamais un script "à l'aveugle". Il faut d'abord poser l'algorithme sur papier. La méthode standard est : <strong>Besoin ➔ Cahier des charges ➔ Pseudo-code ➔ Script</strong>.</p>
<blockquote>
<p><strong>Mise en situation :</strong> Vous devez créer un backup d'un répertoire métier.<br>
1. <strong>Besoin</strong> : Archiver un dossier métier tous les soirs.<br>
2. <strong>Contrainte</strong> : Nommé avec la date du jour et compressé en minimalisant l'espace.<br>
3. <strong>Algorithme</strong> : Extraire date du jour, appliquer `tar`, déplacer dans un share distant.<br>
Un script non commenté est considéré comme une dette technique. Vous devez obligatoirement placer un bloc de commentaires en en-tête mentionnant le nom de l'auteur, la date et la finalité du script.
</p>
</blockquote>
</section>

<section id="unite2-content">
<h2 id="unite2">2. Variables et Environnement</h2>

<h3 id="vars-theory">Théorie : Gestion de l'état système</h3>
<p>Afin d'écrire des scripts dynamiques et génériques, l'utilisation de variables est primordiale. Les variables contiennent temporairement des chaînes, des nombres ou des configurations, isolant ainsi la configuration (en haut de script) de l'exécution pure (dans le corps du script).</p>

<h3 id="vars-concept">Les 4 natures de variables Bash</h3>
<p>Il est crucial de maîtriser comment le scope (portée) de la variable agit selon son type d'assignement.</p>

| Type | Déclaration | Portée \/ Utilisation |
| :--- | :--- | :--- |
| **Variable locale** | `fichier="log.txt"` | Exclusive au script ou au shell en cours d'exécution. |
| **Constante** | `declare -r VERS="1.0"` | Lecture seule, impossible de modifier la valeur de sécurité par la suite. |
| **Environnement** | `export CONFIG="bdd"` | Transmise aux sous-processus et enfants invoqués par le script. |
| **Réservée (interne)** | `$0, $1, $?` | Informations automatiquement générées par Bash. |

<p>Les variables réservées permettent à l'administrateur d'interagir avec les appels au script :</p>
<ul>
    <li><code>$0</code> : Nom du script exécuté.</li>
    <li><code>$1, $2, $@</code> : Arguments passés en position.</li>
    <li><code>$?</code> : Code retour de la dernière commande (0 = succès, 1+ = échec).</li>
</ul>

<h3 id="vars-context">Expertise : Automatisation paramétrée sécurisée</h3>
<p>Un script d'entreprise ne demande quasi jamais de saisie interactive via `read`, car il tourne souvent de nuit via <code>cron</code>. Tous les paramètres essentiels sont attendus en arguments (`$1`, `$2`), ce qui exige une vérification stricte :</p>

```bash
#!/bin/bash
# Vérification immédiate de la présence d'arguments
if [ -z "$1" ]; then
    echo -e "\033[31m[ERREUR]\033[0m Le nom du répertoire source est requis." >&2
    exit 1
fi
declare -r SOURCE="$1"
# L'exécution métier suit ici...
```
</section>

<section id="unite3-content">
<h2 id="unite3">3. Logique et Conditions</h2>

<h3 id="cond-theory">Théorie : L'arbre de décision</h3>
<p>Un script robuste passe son temps à vérifier l'état du système : "Le fichier est-il présent ?", "Ai-je les droits root ?", "Le processus X tourne-t-il ?". La structure décisionnelle est le garant de la fiabilité pour ne pas écraser des données ou échouer en silence.</p>

<h3 id="cond-if">La condition "If" (Si / Alors)</h3>
<p>On utilise cette structure pour valider des conditions binaires (Vrai/Faux). C'est le pilier du contrôle d'erreurs.</p>

| Syntaxe | Action technique |
| :--- | :--- |
| **`[ -f file ]`** | Teste si le fichier existe et est un fichier régulier. |
| **`[ -d dir ]`** | Teste si le répertoire existe. |
| **`[ $A -eq $B ]`** | Teste l'égalité numérique. |
| **`[[ $A == $B ]]`** | Teste l'égalité de chaînes (Bash étendu). |

> **Exemple concret :** Un technicien vérifie si l'utilisateur est bien **root** avant de modifier un fichier système.

```bash
if [ "$USER" != "root" ]; then
    echo "Erreur : Ce script doit être lancé en tant que root."
    exit 1
fi
```

<h3 id="cond-case">Le "Case" (Choix multiples / Menus)</h3>
<p>Pour gérer plusieurs options proprement sans enchaîner les <code>if/elif</code>, on utilise <code>case</code>. C'est idéal pour les scripts de gestion de services (start/stop/restart).</p>

> **Mise en situation :** Création d'un sélecteur d'action pour un serveur web.

```bash
case "$1" in
    "start")
        systemctl start nginx
        ;;
    "stop")
        systemctl stop nginx
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        ;;
esac
```
<p><strong>Explication :</strong> Le script regarde le premier argument (`$1`). S'il vaut "start", il lance Nginx. S'il vaut "stop", il l'arrête. Dans tous les autres cas (`*`), il affiche l'aide.</p>

</section>

<section id="unite4-content">
<h2 id="unite4">4. Les Boucles (Itérations)</h2>

<h3 id="loop-theory">Théorie : L'automatisation par la répétition</h3>
<p>Une boucle permet de répéter un bloc de commandes sans avoir à le réécrire. Elle est indispensable pour traiter des listes d'utilisateurs, de serveurs ou de fichiers.</p>

<h3 id="loop-while">La boucle "While" (Tant que)</h3>
<p>Répète une action tant qu'une condition reste <strong>Vraie</strong>. On l'utilise souvent pour des compteurs ou des attentes système.</p>

> **Exemple concret :** Un technicien crée un compte à rebours avant une opération de maintenance.

```bash
compteur=5
while [ $compteur -gt 0 ]; do
    echo "Maintenance dans $compteur secondes..."
    sleep 1
    ((compteur--))
done
echo "Opération lancée !"
```

<h3 id="loop-until">La boucle "Until" (Jusqu'à ce que)</h3>
<p>C'est l'inverse de <code>while</code> : elle répète l'action tant que la condition est <strong>Fausse</strong>. Elle s'arrête dès que la condition devient vraie.</p>

> **Mise en situation :** Attendre qu'un serveur distant réponde au ping.

```bash
until ping -c 1 192.168.1.10 &>/dev/null; do
    echo "Serveur indisponible, nouvelle tentative..."
    sleep 2
done
echo "Serveur opérationnel !"
```

<h3 id="loop-for">La boucle "For" (Parcours de liste)</h3>
<p>La boucle <code>for</code> est la plus utilisée en administration. Elle parcourt une liste définie d'éléments (fichiers, IPs, noms).</p>

> **Exemple concret :** Un administrateur veut lister tous les répertoires personnels et calculer leur taille.

```bash
for utilisateur in /home/*; do
    echo "Analyse de : $utilisateur"
    du -sh "$utilisateur"
done
```
<p><strong>Résultat attendu :</strong> Pour chaque dossier dans <code>/home</code>, Bash affiche son nom et sa taille occupée sur le disque.</p>

<h3 id="loop-read">Le Pipeline (While Read)</h3>
<p>C'est la méthode la plus puissante pour traiter un fichier ligne par ligne (ex: un export CSV ou <code>/etc/passwd</code>). Elle traite les données au fil de l'eau sans saturer la mémoire vive.</p>

> **Mise en situation :** Isoler les noms d'utilisateurs ayant le shell <strong>/bin/bash</strong>.

```bash
grep "/bin/bash" /etc/passwd | while IFS=":" read -r user x uid gid info home shell; do
    echo "Utilisateur avec Bash : $user (Home: $home)"
done
```
<p><strong>Explication :</strong> On envoie la liste des utilisateurs à <code>while read</code>. L'IFS (Internal Field Separator) ":" découpe chaque ligne en variables précises (user, uid, home, etc.).</p>

</section>

<section id="unite5-content">
<h2 id="unite5">5. Couleurs dans le Shell</h2>

<h3 id="colors-theory">Théorie : Les séquences d'échappement ANSI</h3>
<p>Pour rendre un script professionnel et faciliter la lecture des logs, un administrateur utilise des <strong>codes couleurs ANSI</strong>. Ces séquences, bien que cryptiques au premier abord, permettent de mettre en relief les erreurs (rouge), les succès (vert) ou les avertissements (jaune) directement dans le terminal.</p>

<h3 id="colors-concept">Attributs et codes couleurs</h3>
<p>La structure d'un code couleur suit le motif : <code>\033[ATTRIBUT;COULEURm</code>. Il est impératif de <strong>réinitialiser</strong> le style avec <code>\033[0m</code> à la fin du message pour ne pas colorer tout le terminal.</p>

| Couleur | Code Texte | Code Fond |
| :--- | :--- | :--- |
| **Rouge** | 31 | 41 |
| **Vert** | 32 | 42 |
| **Jaune** | 33 | 43 |
| **Bleu** | 34 | 44 |
| **Reset** | 0 | - |

<p><strong>Attributs courants :</strong> <code>0</code> (Normal), <code>1</code> (Gras), <code>4</code> (Souligné).</p>

<h3 id="colors-context">Expertise : Création de logs formatés</h3>
<p>L'expertise consiste à ne pas utiliser les codes bruts dans le code métier, mais à les stocker dans des variables claires au début du script pour une maintenance aisée.</p>

> **Mise en situation :** Création d'un système de log visuel pour un script de sauvegarde.

```bash
# Définition des constantes de style
GREEN="\033[1;32m"
RED="\033[1;31m"
RESET="\033[0m"

# Utilisation dans le script
if [ -d "/backup" ]; then
    echo -e "${GREEN}[OK]${RESET} Répertoire de sauvegarde trouvé."
else
    echo -e "${RED}[ERREUR]${RESET} Point de montage absent !"
    exit 1
fi
```
<p><strong>Explication :</strong> L'option <code>-e</code> de la commande <code>echo</code> est obligatoire pour que Bash interprète les caractères d'échappement (le <code>\</code>).</p>

</section>

<section id="unite6-content">
<h2 id="unite6">6. Fonctions et Factorisation</h2>

<h3 id="func-theory">Théorie : La modularité du code</h3>
<p>Lorsqu'un script dépasse les 50 lignes ou effectue les mêmes validations de code erreur à plusieurs endroits, il viole le principe "DRY" (Don't Repeat Yourself). Encapsuler le code métier dans des fonctions nommées augmente drastiquement la maintenabilité et la lisibilité du programme.</p>

<h3 id="func-concept">Déclaration et usage</h3>

```bash
# Les arguments de la fonction se récupèrent via $1, $2 (comme un script isolée)
afficher_erreur() {
    local message="$1"
    echo -e "\033[31m[ERREUR] $message\033[0m" >&2
}

# Appel métier simplifié dans le code principal :
if [ ! -d "/backup" ]; then
    afficher_erreur "Le point de montage de sauvegarde est manquant."
    exit 1
fi
```

| Propriété | Comportement | Remarques |
| :--- | :--- | :--- |
| **Variables encapsulées** | Mot-clé `local` | Empêche que la fonction ne pollue les variables d'environnement. |
| **Valeur de retour** | `return X` | Définit le Exit Code `0` à `255` analysable après sa tâche via `$?`. |
| **Import externe** | `source ./utils.sh` | Charge un fichier contenant un pack de fonctions dans le script actuel. |

<h3 id="func-context">Expertise : Le Framework d'administration interne</h3>
<p>Dans un système informatique d'envergure, plutôt que de copier-coller les fonctions de login ou de formatage (couleurs, timestamp), l'équipe TSSR crée une "librairie partagée" sous forme de script externe `utils.sh`. Chaque administrateur exécute `source /opt/scripts/utils.sh` ("sourcer") et bénéficie instantanément des logs formatés pour toute son équipe.</p>
</section>

<section id="unite7-content">
<h2 id="unite7">7. Bash vs PowerShell</h2>

<h3 id="powershell-theory">Théorie : Le choc des deux mondes</h3>
<p>Bash gère l'information comme du <strong>Titre/Texte brut</strong>. Le pipe est fait de flux caractères, nécessitant des outils lourds de parsage (`awk`, `cut`, `grep`). <br>
De l'autre côté, PowerShell repose sur le framework <strong>.NET Core</strong>. Tout y est manipulé sous forme <strong>d'Objets structurels</strong> dotés de propriétés et de méthodes intrinsèques.</p>

<h3 id="powershell-concept">Comparatif des approches techniques</h3>

| Caractéristique | GNU/Bash | PowerShell |
| :--- | :--- | :--- |
| **Format natif de données** | Chaînes de caractères texte (Stream) | Objets orientés (Propriétés et Méthodes) |
| **Outils de filtre** | `grep`, `sed`, `awk` | `.Where{}`, et attributs `.Property` directs |
| **Portabilité** | Standard de facto sur tout serveur Linux/Unix | Multi-plateforme (Core 7.x) mais de facto orienté Win/AD |
| **Commandes (nommage)** | Noms cryptiques (`ls`, `awk`, `pwd`) | Verbe-Nom standardisé (`Get-ChildItem`, `Set-Content`) |

<h3 id="powershell-context">Expertise : Quel outil choisir pour quelle mission ?</h3>
<p>L'excellence d'un ingénieur TSSR s'exprime dans le choix intelligent de l'outil adéquat au cas d'usage.</p>
<blockquote>
<p><strong>Mise en situation métier :</strong></p>
<ul>
<li><strong>Parc 100% Linux</strong> et conteneurs ultra-légers type Docker. Besoin d'automatiser des dépendances réseau à une vitesse maximale, aucun framework lourd disponible. ➔ <strong>Le Bash pur est roi.</strong></li>
<li><strong>Parc hybride lourd</strong>, fort recours à Azure AD et Active Directory local. Besoin de traiter les utilisateurs et extraire facilement l'attribut `Description` à travers tout le parc sans regex. ➔ <strong>PowerShell 7.x sera déployé pour injecter du code objet puissant.</strong></li>
</ul>
</blockquote>
</section>

