/**
 * module5_data.js — PowerShell & Scripting (Niveau Expert TSSR)
 * Source : PowerShell_clean.md — VERSION INTÉGRALE ET EXHAUSTIVE
 */

export const module5 = {
    id: 'powershell',
    title: 'PowerShell & Scripting',
    icon: '🐚',
    lessonHTML: `
        <!-- SOMMAIRE FLOTTANT -->
        <nav class="lesson-toc" aria-label="Sommaire de la leçon">
            <div class="lesson-toc__tab" aria-hidden="true">
                <span class="lesson-toc__tab-icon">📋</span>
                Plan
            </div>
            <div class="lesson-toc__body">
                <h3 class="lesson-toc__title">Sommaire</h3>
                <ol class="lesson-toc__list">
                    <li><a href="#intro">1. Introduction</a></li>
                    <li><a href="#cmdlets">2. Les cmdlets — Verbe-Nom</a></li>
                    <li><a href="#execution-policy">3. Politique d'exécution</a></li>
                    <li><a href="#modules">4. Modules</a></li>
                    <li><a href="#oop">5. Langage orienté objet</a>
                        <ol>
                            <li><a href="#objects-vs-text">Texte brut vs objets</a></li>
                            <li><a href="#data-types">Types de données</a></li>
                            <li><a href="#props-methods">Propriétés et méthodes</a></li>
                        </ol>
                    </li>
                    <li><a href="#pipeline">6. Manipulation avec le pipeline</a></li>
                    <li><a href="#variables">7. Variables et structures de données</a>
                         <ol>
                            <li><a href="#arrays">Tableaux</a></li>
                            <li><a href="#hashtables">Tables de hachage</a></li>
                            <li><a href="#custom-objects">Objets personnalisés</a></li>
                        </ol>
                    </li>
                    <li><a href="#control-structures">8. Structures de contrôle</a>
                        <ol>
                            <li><a href="#operators">Opérateurs</a></li>
                            <li><a href="#if-else">IF / ELSEIF / ELSE</a></li>
                            <li><a href="#switch">SWITCH</a></li>
                            <li><a href="#while">WHILE / DO</a></li>
                            <li><a href="#foreach">FOREACH</a></li>
                        </ol>
                    </li>
                    <li><a href="#script-writing">9. Écriture d'un script</a></li>
                    <li><a href="#errors">10. Gestion des erreurs</a></li>
                    <li><a href="#remoting">11. Remoting (Distance)</a></li>
                </ol>
            </div>
        </nav>

        <h2 id="intro">1. Introduction</h2>
        <p>PowerShell est un shell en ligne de commande et un langage de script développé par Microsoft, sorti en 2006. Il est basé sur le framework .NET et conçu spécifiquement pour l'administration de systèmes Windows.</p>
        
        <p><strong>Versions principales :</strong></p>
        <ul>
            <li><strong>Windows PowerShell 5.1</strong> : version classique, intégrée par défaut à Windows 10 et Windows Server 2019. Fonctionne uniquement sous Windows, fortement intégré aux technologies Microsoft (Active Directory, WMI, CIM...).</li>
            <li><strong>PowerShell Core 7.x</strong> : version moderne, open source et multi-plateformes (Windows, Linux, macOS). Basée sur .NET Core. Recommandée pour les environnements hybrides ou DevOps.</li>
        </ul>

        <table>
            <thead>
                <tr><th>Critère</th><th>Windows PowerShell 5.1</th><th>PowerShell Core 7.x</th></tr>
            </thead>
            <tbody>
                <tr><td>Plateformes</td><td>Windows uniquement</td><td>Windows, Linux, macOS</td></tr>
                <tr><td>Base technique</td><td>.NET Framework</td><td>.NET Core</td></tr>
                <tr><td>Active Directory, WMI</td><td>Oui</td><td>Limité</td></tr>
                <tr><td>Open source</td><td>Non</td><td>Oui</td></tr>
                <tr><td>Usage typique</td><td>Administration Windows classique</td><td>Environnements hybrides, DevOps, Azure</td></tr>
            </tbody>
        </table>
        <blockquote>PowerShell n'est plus seulement un outil Windows — c'est un vrai langage d'administration multi-OS.</blockquote>

        <hr>

        <h2 id="cmdlets">2. Les cmdlets — Verbe-Nom</h2>
        <p>Toutes les commandes PowerShell (appelées <strong>cmdlets</strong>) suivent la convention <strong>Verbe-Nom</strong>. Cela les rend prévisibles.</p>
        
        <table>
            <thead>
                <tr><th>Verbe</th><th>Rôle</th><th>Exemple</th></tr>
            </thead>
            <tbody>
                <tr><td><code>Get</code></td><td>Récupérer / afficher</td><td><code>Get-Service</code></td></tr>
                <tr><td><code>Set</code></td><td>Modifier / configurer</td><td><code>Set-Service -Name Spooler -StartupType Disabled</code></td></tr>
                <tr><td><code>New</code></td><td>Créer un objet</td><td><code>New-Item -Path C:\\Test -ItemType Directory</code></td></tr>
                <tr><td><code>Remove</code></td><td>Supprimer</td><td><code>Remove-Item C:\\Test</code></td></tr>
                <tr><td><code>Start</code></td><td>Démarrer</td><td><code>Start-Service -Name Spooler</code></td></tr>
                <tr><td><code>Stop</code></td><td>Arrêter</td><td><code>Stop-Service -Name Spooler</code></td></tr>
                <tr><td><code>Enable</code></td><td>Activer</td><td><code>Enable-PSRemoting</code></td></tr>
                <tr><td><code>Disable</code></td><td>Désactiver</td><td><code>Disable-PSRemoting</code></td></tr>
                <tr><td><code>Import</code></td><td>Charger un module ou fichier</td><td><code>Import-Module ActiveDirectory</code></td></tr>
                <tr><td><code>Export</code></td><td>Exporter vers un fichier</td><td><code>Export-Csv C:\\Users.csv -NoTypeInformation</code></td></tr>
            </tbody>
        </table>

        <pre><code class="language-powershell"># Exemple avec Active Directory
Get-ADUser    # récupérer un utilisateur
Set-ADUser    # modifier un utilisateur
New-ADUser    # créer un utilisateur</code></pre>

        <hr>

        <h2 id="execution-policy">3. Politique d'exécution (ExecutionPolicy)</h2>
        <p>Définit quels scripts peuvent être lancés pour des raisons de sécurité.</p>
        
        <table>
            <thead>
                <tr><th>Politique</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr><td><code>Restricted</code></td><td>Aucun script autorisé (valeur par défaut sur certains Windows)</td></tr>
                <tr><td><code>AllSigned</code></td><td>Seuls les scripts signés numériquement sont autorisés</td></tr>
                <tr><td><code>RemoteSigned</code></td><td>Scripts locaux autorisés ; scripts téléchargés doivent être signés</td></tr>
                <tr><td><code>Unrestricted</code></td><td>Tout est autorisé — à éviter en production</td></tr>
                <tr><td><code>Bypass</code></td><td>Ignore toutes les restrictions</td></tr>
                <tr><td><code>Undefined</code></td><td>Supprime la configuration actuelle</td></tr>
            </tbody>
        </table>
        <blockquote>Bonne pratique en entreprise : utiliser <code>RemoteSigned</code>.</blockquote>

        <pre><code class="language-powershell">Get-ExecutionPolicy                   # Vérifier la politique actuelle
Set-ExecutionPolicy RemoteSigned      # Modifier (nécessite les droits administrateur)</code></pre>

        <hr>

        <h2 id="modules">4. Modules</h2>
        <p>Un module est un ensemble de cmdlets regroupées par domaine fonctionnel.</p>
        <pre><code class="language-powershell">Import-Module ActiveDirectory          # Charger le module Active Directory
Get-Command -Module ActiveDirectory    # Lister toutes les cmdlets du module
Get-Module -ListAvailable              # Lister tous les modules disponibles</code></pre>

        <hr>

        <h2 id="oop">5. PowerShell : langage orienté objet</h2>
        <h3 id="objects-vs-text">Texte brut vs objets</h3>
        <p>En Bash ou CMD, on manipule du <strong>texte brut</strong>. En PowerShell, on manipule des <strong>objets .NET structurés</strong>.</p>
        
        <pre><code class="language-bash"># En Bash — résultat en texte brut
id tom
# → uid=1001(tom) gid=1001(tom) groups=1001(tom)</code></pre>

        <pre><code class="language-powershell"># En PowerShell — résultat structuré
Get-LocalUser -Name Tom
# → Objet utilisateur avec propriétés accessibles directement

(Get-LocalUser -Name Tom).Enabled    # Accès direct à une propriété
# → True</code></pre>

        <h3 id="data-types">Types de données courants</h3>
        <table>
            <thead><tr><th>Type</th><th>Description</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><code>String</code></td><td>Texte</td><td><code>"Bonjour"</code></td></tr>
                <tr><td><code>Int</code></td><td>Nombre entier</td><td><code>42</code></td></tr>
                <tr><td><code>Boolean</code></td><td>Valeur logique</td><td><code>$true, $false</code></td></tr>
                <tr><td><code>Null</code></td><td>Absence de valeur</td><td><code>$null</code></td></tr>
                <tr><td><code>Array</code></td><td>Tableau (liste ordonnée)</td><td><code>1, 2, 3</code></td></tr>
            </tbody>
        </table>

        <h3 id="props-methods">Propriétés et méthodes</h3>
        <ul>
            <li><strong>Propriétés</strong> : les informations de l'objet — <code>$objet.Propriété</code></li>
            <li><strong>Méthodes</strong> : les actions disponibles sur l'objet — <code>$objet.Méthode()</code></li>
        </ul>
        <pre><code class="language-powershell"># Explorer le contenu d'un objet
Get-Service -Name Spooler | Get-Member

# Lire des propriétés
$service = Get-Service -Name Spooler
$service.Status    # "Running"

# Appeler des méthodes
$service.Stop()    # Arrête le service
$service.Start()   # Démarre le service</code></pre>

        <hr>

        <h2 id="pipeline">6. Manipulation des objets avec le pipeline</h2>
        <p>Le pipeline <code>|</code> enchaîne les cmdlets : la sortie de l'une devient l'entrée de la suivante. <code>$_</code> désigne <strong>l'objet courant</strong>.</p>
        
        <table>
            <thead><tr><th>Cmdlet</th><th>Rôle</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><code>Where-Object</code></td><td>Filtrer selon une condition</td><td><code>Get-Service | Where-Object {$_.Status -eq "Stopped"}</code></td></tr>
                <tr><td><code>Select-Object</code></td><td>Choisir des propriétés</td><td><code>Get-Process | Select-Object -First 5 Name, Id</code></td></tr>
                <tr><td><code>Sort-Object</code></td><td>Trier les objets</td><td><code>Get-Service | Sort-Object Status -Descending</code></td></tr>
                <tr><td><code>Format-Table</code></td><td>Affichage en tableau</td><td><code>Get-Service | Format-Table Name, Status -AutoSize</code></td></tr>
                <tr><td><code>Export-Csv</code></td><td>Exporter vers CSV</td><td><code>Get-Process | Export-Csv C:\\proc.csv -NoTypeInformation -Delimiter ";"</code></td></tr>
                <tr><td><code>ConvertTo-Json</code></td><td>Exporter en JSON</td><td><code>Get-Service | ConvertTo-Json -Depth 3</code></td></tr>
            </tbody>
        </table>

        <hr>

        <h2 id="variables">7. Variables et structures de données</h2>
        
        <h3 id="arrays">Tableaux</h3>
        <pre><code class="language-powershell">$tableau = 1, 2, "jonquille", 4
$tableau[0]       # 1
$tableau[-1]      # 4 (dernier)
$tableau += "phoque"          # Ajouter
$tableau[0] = 8               # Modifier</code></pre>

        <h3 id="hashtables">Tables de hachage (Clé/Valeur)</h3>
        <pre><code class="language-powershell">$utilisateur = @{
    Nom   = "Paul"
    Age   = 25
    Actif = $true
}
$utilisateur["Nom"]    # "Paul"
$utilisateur.Ville = "Toulouse"    # Ajouter</code></pre>

        <h3 id="custom-objects">Objets personnalisés (PSCustomObject)</h3>
        <pre><code class="language-powershell">$personne = [PSCustomObject]@{
    Nom   = "Paul"
    Age   = 25
    Ville = "Toulouse"
}</code></pre>

        <hr>

        <h2 id="control-structures">8. Structures de contrôle</h2>
        
        <h3 id="operators">Opérateurs de comparaison</h3>
        <table>
            <thead><tr><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr></thead>
            <tbody>
                <tr><td><code>-eq</code></td><td>Égal à</td><td><code>$age -eq 18</code></td></tr>
                <tr><td><code>-ne</code></td><td>Différent de</td><td><code>$statut -ne "Stopped"</code></td></tr>
                <tr><td><code>-gt</code></td><td>Supérieur à</td><td><code>$age -gt 65</code></td></tr>
                <tr><td><code>-like</code></td><td>Correspondance avec joker</td><td><code>$nom -like "P*"</code></td></tr>
                <tr><td><code>-match</code></td><td>Correspondance regex</td><td><code>$email -match "@"</code></td></tr>
            </tbody>
        </table>

        <h3 id="if-else">IF / ELSEIF / ELSE</h3>
        <pre><code class="language-powershell">$age = 20
if ($age -lt 18) { Write-Host "Mineur" -ForegroundColor Cyan }
elseif ($age -lt 65) { Write-Host "Adulte" -ForegroundColor Green }
else { Write-Host "Senior" -ForegroundColor Yellow }</code></pre>

        <h3 id="switch">SWITCH</h3>
        <pre><code class="language-powershell">$choix = "1"
switch ($choix) {
    "1"     { Write-Host "Date : $(Get-Date -Format 'dd/MM/yyyy')" }
    "2"     { Write-Host "Heure : $(Get-Date -Format 'HH:mm')" }
    default { Write-Host "Choix invalide" }
}</code></pre>

        <h3 id="while">WHILE et DO / WHILE / UNTIL</h3>
        <pre><code class="language-powershell"># WHILE : Vérifie AVANT
$c = 0
while ($c -lt 5) { Write-Host $c; $c++ }

# DO / UNTIL : Exécute AU MOINS UNE FOIS, jusqu'à ce que la condition soit vraie
do {
    $essai = Read-Host "Proposez un nombre"
} until ($essai -eq 7)</code></pre>

        <h3 id="foreach">FOREACH</h3>
        <pre><code class="language-powershell">$utilisateurs = Get-ADUser -Filter *
foreach ($u in $utilisateurs) {
    Write-Host "Nom : $($u.Name)"
}</code></pre>

        <hr>

        <h2 id="script-writing">9. Écriture d'un script (.ps1)</h2>
        <ol>
            <li><strong>Configurer la politique</strong> : <code>Set-ExecutionPolicy RemoteSigned</code></li>
            <li><strong>Créer et exécuter</strong> : <code>New-Item script.ps1</code> puis <code>.\\script.ps1</code></li>
        </ol>
        <pre><code class="language-powershell">param(
    [string]$Nom,
    [int]$Age
)
Write-Host "Nom : $Nom, Age : $Age"</code></pre>

        <hr>

        <h2 id="errors">10. Gestion des erreurs</h2>
        <p><strong>$Error[0]</strong> contient la dernière erreur. </p>
        
        <p><strong>Paramètre -ErrorAction :</strong></p>
        <table>
            <thead><tr><th>Valeur</th><th>Comportement</th></tr></thead>
            <tbody>
                <tr><td><code>Continue</code></td><td>Affiche et continue (Défaut)</td></tr>
                <tr><td><code>SilentlyContinue</code></td><td>Ignore visuellement mais stocke dans $Error</td></tr>
                <tr><td><code>Stop</code></td><td>Rends l'erreur bloquante (nécessaire pour Try/Catch)</td></tr>
            </tbody>
        </table>

        <pre><code class="language-powershell">try {
    Get-ChildItem "C:\\Introuvable" -ErrorAction Stop
}
catch {
    Write-Host "Erreur : $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Write-Host "Nettoyage terminé"
}</code></pre>

        <hr>

        <h2 id="remoting">11. Remoting (Administration à distance)</h2>
        <p>Basé sur <strong>WinRM</strong> (ports 5985/5986).</p>
        <pre><code class="language-powershell">Enable-PSRemoting -Force    # Activation

Invoke-Command -ComputerName SRV1 -ScriptBlock { Get-Service }   # Commande distante
Enter-PSSession -ComputerName SRV1                                # Session interactive</code></pre>

        <p><strong>Le défi du "Double Hop" :</strong><br>
        Restriction empêchant de rebondir d'un serveur distant vers un autre (identifiants non transmis).<br>
        <strong>Solutions :</strong> CredSSP, Kerberos Delegation ou Jump Server.</p>
    `,

    quiz: [
        {
            question: "Quelle est la principale différence technique entre PowerShell 5.1 et PowerShell 7 ?",
            options: ["L'un est bleu, l'autre noir", "5.1 utilise .NET Framework, 7 utilise .NET Core (multi-plateforme)", "La 7 ne supporte plus l'Active Directory", "La 5.1 est plus récente"],
            correctIndex: 1,
            explanation: "PowerShell 7 est basé sur .NET Core, ce qui lui permet d'être open-source et de fonctionner sous Linux et macOS."
        },
        {
            question: "Que représente la variable `$_` dans un pipeline ?",
            options: ["Une erreur système", "L'objet courant en cours de traitement", "Le dossier racine", "Une variable de fin de script"],
            correctIndex: 1,
            explanation: "$_ (ou $PSItem) représente l'objet passé à travers le pipeline à l'instant T."
        },
        {
            question: "Quelle politique d'exécution permet de lancer ses propres scripts mais exige une signature pour ceux venant d'Internet ?",
            options: ["Restricted", "AllSigned", "RemoteSigned", "Unrestricted"],
            correctIndex: 2,
            explanation: "RemoteSigned est le compromis sécurité/flexibilité recommandé en entreprise."
        },
        {
            question: "Pourquoi utilise-t-on `-ErrorAction Stop` avant un bloc Catch ?",
            options: ["Pour éteindre l'ordinateur en cas d'erreur", "Pour transformer une erreur légère en exception capturable", "Pour masquer l'erreur à l'utilisateur", "Pour accélérer le script"],
            correctIndex: 1,
            explanation: "Sans -ErrorAction Stop, beaucoup de cmdlets continuent malgré l'erreur, et le bloc catch n'est jamais déclenché."
        },
        {
            question: "Quel protocole est utilisé par le Remoting PowerShell (WinRM) ?",
            options: ["RDP", "SSH", "WS-Management (HTTP/HTTPS)", "Telnet"],
            correctIndex: 2,
            explanation: "WinRM utilise WS-Management sur les ports 5985 (HTTP) et 5986 (HTTPS)."
        },
        {
            question: "Comment accède-t-on à la dernière erreur survenue au cours de la session ?",
            options: ["$LastError", "$Error[0]", "$Exception", "$?"],
            correctIndex: 1,
            explanation: "$Error est un tableau de toutes les erreurs de la session. L'index 0 est toujours la plus récente."
        },
        {
            question: "Quelle est la différence entre une boucle WHILE et une boucle DO/UNTIL ?",
            options: ["Aucune", "WHILE vérifie la condition avant, DO vérifie après (s'exécute au moins une fois)", "DO est plus rapide", "WHILE est réservée à Linux"],
            correctIndex: 1,
            explanation: "Une boucle DO s'exécute au moins une fois car la condition n'est testée qu'en fin d'itération."
        },
        {
            question: "Qu'est-ce que le 'Double Hop' en remoting ?",
            options: ["Utiliser deux cartes réseau", "Rebondir d'un serveur distant vers un autre sans pouvoir transmettre ses identifiants", "Installer PowerShell deux fois", "Une erreur de boucle infinie"],
            correctIndex: 1,
            explanation: "C'est une restriction de sécurité qui empêche la délégation des identifiants au-delà du premier saut réseau."
        },
        {
            question: "Quel opérateur permet de comparer une chaîne avec des wildcards (*) ?",
            options: ["-eq", "-match", "-like", "-contains"],
            correctIndex: 2,
            explanation: "-like utilise les caractères jokers (*, ?). -match utilise les expressions régulières."
        },
        {
            question: "Laquelle de ces syntaxes crée un objet personnalisé (PSCustomObject) ?",
            options: ["$obj = @{ }", "$obj = New-Object", "$obj = [PSCustomObject]@{ }", "$obj = Object.create()"],
            correctIndex: 2,
            explanation: "[PSCustomObject]@{ Key=Value } est la méthode moderne et performante pour créer des objets structurés."
        }
    ],

    flashcards: [
        {
            front: "Différence fondamentale PS vs Shell classique ?",
            back: "PS manipule des OBJETS .NET structurés, les autres manipulent du TEXTE brut."
        },
        {
            front: "Ports par défaut WinRM ?",
            back: "HTTP : 5985 | HTTPS : 5986"
        },
        {
            front: "Convention de nommage des commandes ?",
            back: "Verbe-Nom (ex: Get-Service, New-Item)."
        },
        {
            front: "Comment explorer un objet ?",
            back: "Utiliser la cmdlet 'Get-Member' (ou gm) après un pipeline."
        },
        {
            front: "Rôle du bloc 'Finally' ?",
            back: "S'exécuter dans TOUS les cas (succès ou erreur), idéal pour le nettoyage."
        },
        {
            front: "Comment forcer un Catch ?",
            back: "Utiliser '-ErrorAction Stop' sur la commande dans le Try."
        },
        {
            front: "Syntaxe Hash Table vs Tableau ?",
            back: "Tableau : 1, 2, 3\nHash Table : @{ Clé = Valeur }"
        },
        {
            front: "Qu'est-ce que WinRM ?",
            back: "Le service Windows implémentant WS-Management pour la gestion à distance."
        },
        {
            front: "À quoi sert Invoke-Command ?",
            back: "À exécuter des commandes ou scripts sur un ou plusieurs ordinateurs distants en parallèle."
        },
        {
            front: "Variable de l'objet courant ?",
            back: "$_ (dollar underscore)."
        }
    ],
    exercises: [
        {
            id: 'ex1',
            title: 'Gestion des Services',
            stars: 1,
            description: 'Vérifier l\'état et manipuler un service Windows.',
            instruction: 'Trouvez l\'état du service "Spouleur d\'impression" (Spooler). S\'il est arrêté, démarrez-le. S\'il est démarré, redémarrez-le.',
            hint: 'Utilisez Get-Service et Restart-Service.',
            correction: 'Get-Service -Name Spooler | Restart-Service',
            explanation: 'La commande Get-Service récupère l\'objet service, et le pipe (|) l\'envoie à Restart-Service qui gère intelligemment le démarrage ou le redémarrage.'
        },
        {
            id: 'ex2',
            title: 'Inventaire Réseau IPv4',
            stars: 2,
            description: 'Filtrer les adresses IP actives.',
            instruction: 'Affichez uniquement les adresses IPv4 des interfaces dont le statut est "Up". Affichez le nom de l\'interface (Alias) et l\'adresse IP.',
            hint: 'Le module NetTCPIP contient Get-NetIPAddress. Filtrez sur AddressFamily et l\'alias pour éviter les cartes de bouclage.',
            correction: 'Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Pseudo*" } | Select-Object InterfaceAlias, IPAddress',
            explanation: 'Where-Object permet d\'exclure les interfaces virtuelles "Loopback" ou "Pseudo-Interface" pour ne garder que le physique/VPN.'
        },
        {
            id: 'ex3',
            title: 'Audit des Logs Système',
            stars: 3,
            description: 'Extraire des erreurs récentes du journal d\'événements.',
            instruction: 'Affichez les 10 dernières erreurs (Level 2) du journal "System" survenues durant les dernières 24 heures.',
            hint: 'Get-WinEvent est plus performant que Get-EventLog. Utilisez un FilterHashtable.',
            correction: 'Get-WinEvent -FilterHashtable @{LogName=\'System\'; Level=2; StartTime=(Get-Date).AddDays(-1)} -MaxEvents 10',
            explanation: 'FilterHashtable est la méthode la plus rapide pour interroger les journaux d\'événements Windows.'
        },
        {
            id: 'ex4',
            title: 'Analyse du Stockage System32',
            stars: 3,
            description: 'Recherche de fichiers volumineux.',
            instruction: 'Listez tous les fichiers ".exe" de "C:\\Windows\\System32" dépassant 5 Mo, triés par taille décroissante.',
            hint: 'Utilisez Get-ChildItem avec -Filter, puis Where-Object avec l\'unité 5MB.',
            correction: 'Get-ChildItem -Path C:\\Windows\\System32 -Filter *.exe -File | Where-Object { $_.Length -gt 5MB } | Sort-Object Length -Descending',
            explanation: 'PowerShell comprend nativement les unités comme KB, MB, GB. $_.Length représente la taille en octets.'
        },
        {
            id: 'ex5',
            title: 'Automatisation de Sauvegarde',
            stars: 4,
            description: 'Logique conditionnelle et gestion de fichiers.',
            instruction: 'Créez un script qui vérifie si "C:\\Backup" existe. Sinon, créez-le. Copiez ensuite tous les fichiers ".txt" de votre Bureau ($HOME\\Desktop) vers ce dossier.',
            hint: '-not (Test-Path path) permet de vérifier l\'absence d\'un dossier. $HOME est une variable d\'environnement vers votre profil.',
            correction: '$path = "C:\\Backup"\nif (-not (Test-Path $path)) {\n    New-Item -Path $path -ItemType Directory\n}\nCopy-Item -Path "$HOME\\Desktop\\*.txt" -Destination $path',
            explanation: 'Ce script combine test d\'existence, création d\'infrastructure et mouvement de données.'
        },
        {
            id: 'ex6',
            title: 'Rapport de Consommation RAM',
            stars: 4,
            description: 'Calculs et export de données.',
            instruction: 'Identifiez les processus utilisant plus de 200 Mo de RAM. Exportez un CSV sur votre bureau contenant le Nom, l\'ID et la mémoire en Mo (arrondie à 2 décimales).',
            hint: 'Utilisez une propriété calculée dans Select-Object : @{Name="MB"; Expression={[math]::Round($_.WorkingSet / 1MB, 2)}}',
            correction: 'Get-Process | Where-Object { $_.WorkingSet -gt 200MB } | Select-Object Name, Id, @{Name="MemoryMB"; Expression={[math]::Round($_.WorkingSet / 1MB, 2)}} | Export-Csv -Path "$HOME\\Desktop\\ProcessAudit.csv" -NoTypeInformation',
            explanation: 'Les propriétés calculées permettent de transformer les données (octets -> Mo) avant l\'exportation finale.'
        },
        {
            id: 'ex-gen-ps',
            title: 'Entraînement Infini (Générateur PowerShell)',
            stars: 5,
            description: 'Un générateur qui crée à la volée des scénarios de scripting PowerShell avancés.',
            isGenerator: true,
            scenarios: [
                {
                    instruction: 'Scénario : Créez un script qui prend un paramètre `$Dossier`. Si le dossier n\'existe pas, créez-le sans afficher de sortie. Ensuite, copiez-y tous les fichiers `.log` depuis `C:\\App\\Logs` en ignorant silencieusement les erreurs.',
                    hint: 'Utilisez param(), Test-Path, New-Item avec Out-Null, et Copy-Item avec -ErrorAction SilentlyContinue.',
                    correction: 'param($Dossier)\nif (-not (Test-Path $Dossier)) {\n    New-Item -ItemType Directory -Path $Dossier | Out-Null\n}\nCopy-Item -Path "C:\\App\\Logs\\*.log" -Destination $Dossier -ErrorAction SilentlyContinue',
                    explanation: 'Un script typique d\'administration : utilisation d\'un paramètre, structure conditionnelle IF pour vérifier l\'état du système, et ErrorAction pour une exécution propre sans polluer la console.'
                },
                {
                    instruction: 'Scénario : Écrivez un script qui identifie tous les services arrêtés et regroupe leurs noms. Retournez ensuite un objet personnalisé (PSCustomObject) contenant la propriété `TotalArretes` (le nombre) et `Noms` (la liste des noms).',
                    hint: 'Filtrez Get-Service sur Status, bouclez pour extraire les noms, et créez un [PSCustomObject].',
                    correction: '$stopped = Get-Service | Where-Object Status -eq \'Stopped\'\n$noms = foreach ($s in $stopped) { $s.Name }\n[PSCustomObject]@{\n    TotalArretes = $stopped.Count\n    Noms = $noms\n}',
                    explanation: 'La boucle Foreach extrait une propriété spécifique (nom). Le PSCustomObject structure les résultats proprement, une pratique essentielle en automatisation.'
                },
                {
                    instruction: 'Scénario : Construisez une boucle qui vérifie l\'état du service "Spooler". Tant qu\'il n\'est pas "Running", attendez 5 secondes puis tentez de le démarrer (en ignorant les erreurs).',
                    hint: 'Utilisez une boucle while avec (Get-Service).Status -ne \'Running\', Start-Sleep -Seconds, et Start-Service.',
                    correction: 'while ((Get-Service -Name Spooler).Status -ne \'Running\') {\n    Start-Sleep -Seconds 5\n    Start-Service -Name Spooler -ErrorAction SilentlyContinue\n}',
                    explanation: 'La boucle while évalue la condition dynamiquement à chaque itération. Start-Sleep est crucial pour ne pas surcharger le processeur le temps que le service démarre.'
                },
                {
                    instruction: 'Scénario : Considérez un fichier `C:\\users.csv` avec une colonne `Login`. Écrivez le script qui importe ce fichier et crée chaque compte localement sans mot de passe, en affichant "Création de [Login]" pour chacun.',
                    hint: 'Utilisez Import-Csv, une boucle foreach, Write-Host et la cmdlet New-LocalUser avec -NoPassword.',
                    correction: '$csv = Import-Csv -Path "C:\\users.csv"\nforeach ($user in $csv) {\n    Write-Host "Création de $($user.Login)"\n    New-LocalUser -Name $user.Login -NoPassword\n}',
                    explanation: 'L\'importation de CSV automatise le traitement en lot. Les valeurs du fichier (login) deviennent des propriétés de l\'objet PowerShell directement utilisables dans la boucle.'
                },
                {
                    instruction: 'Scénario : Écrivez un bloc try/catch/finally. Tentez de forcer la suppression récursive de `C:\\OldData` avec une erreur rendue bloquante. En cas d\'échec, affichez un message jaune avertissant que "Le dossier est introuvable ou verrouillé". Quel que soit le résultat, affichez "Opération terminée".',
                    hint: 'Utilisez try/catch/finally, Remove-Item avec -Recurse -Force -ErrorAction Stop, et Write-Host avec -ForegroundColor.',
                    correction: 'try {\n    Remove-Item -Path "C:\\OldData" -Recurse -Force -ErrorAction Stop\n}\ncatch {\n    Write-Host "Le dossier est introuvable ou verrouillé" -ForegroundColor Yellow\n}\nfinally {\n    Write-Host "Opération terminée"\n}',
                    explanation: 'En PowerShell, `-ErrorAction Stop` est indispensable pour qu\'une erreur non critique déclenche l\'entrée dans le bloc `catch`. Le bloc `finally` s\'exécute systématiquement pour le nettoyage.'
                },
                {
                    instruction: 'Scénario : Créez une fonction `Test-Port` qui prend `$IP` et `$Port` en paramètres. Elle doit retourner `$true` si le port est ouvert, sinon `$false`. Cachez l\'affichage d\'erreur.',
                    hint: 'Utilisez `Test-NetConnection -ComputerName $IP -Port $Port -InformationLevel Quiet`.',
                    correction: 'function Test-Port($IP, $Port) {\n    return Test-NetConnection -ComputerName $IP -Port $Port -InformationLevel Quiet\n}',
                    explanation: 'L\'option -InformationLevel Quiet transforme la sortie complexe de TNC en un simple booléen (True/False).'
                },
                {
                    instruction: 'Scénario : Parcourez tous les fichiers `.docx` de `C:\\Docs`. Pour chaque fichier, si sa taille dépasse 10 Mo, déplacez-le vers `C:\\Archives`. Affichez le nom du fichier déplacé.',
                    hint: 'Utilisez `Get-ChildItem -Filter *.docx`, `Where-Object { $_.Length -gt 10MB }`, et `Move-Item`.',
                    correction: 'Get-ChildItem -Path C:\\Docs -Filter *.docx | Where-Object { $_.Length -gt 10MB } | ForEach-Object {\n    Write-Host "Déplacement de $($_.Name)"\n    Move-Item -Path $_.FullName -Destination "C:\\Archives"\n}',
                    explanation: 'L\'utilisation de $($_.Name) dans une chaîne de caractères permet d\'accéder à la propriété d\'un objet lors d\'une interpolation.'
                }
            ]
        }
    ]
};



