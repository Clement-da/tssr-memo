---
id: "powershell"
title: "PowerShell & Scripting"
icon: "🐚"
---

<!-- SOMMAIRE FLOTTANT -->
<nav class="lesson-toc" aria-label="Sommaire de la leçon">
    <div class="lesson-toc__tab" aria-hidden="true">
        <span class="lesson-toc__tab-icon">📋</span>
        Plan du cours
    </div>
    <div class="lesson-toc__body">
        <h3 class="lesson-toc__title">Sommaire</h3>
        <ol class="lesson-toc__list">
            <li><a href="#unite1">1. Introduction & Cmdlets</a>
                <ol>
                    <li><a href="#cmdlet-definition">Qu'est-ce qu'une Cmdlet ?</a></li>
                    <li><a href="#execution-policy">Politique d'exécution</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Aide & Syntaxe</a>
                <ol>
                    <li><a href="#help-system">Le système d'aide</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Pipeline & Objets</a>
                <ol>
                    <li><a href="#pipeline-theory">Le Pipeline (|)</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Variables & Opérateurs</a></li>
            <li><a href="#unite5">5. Structures de Contrôle</a></li>
            <li><a href="#unite6">6. Scripts & Sécurité</a></li>
            <li><a href="#unite7">7. Gestion des Erreurs</a></li>
            <li><a href="#unite8">8. Remoting (Gestion à distance)</a></li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
    <h2 id="unite1">Unité 1 : Introduction et Cmdlets</h2>
    <p>PowerShell est à la fois un <strong>interpréteur de commandes (shell)</strong> et un <strong>langage de script</strong> orienté objet, conçu par Microsoft pour l'automatisation des tâches d'administration.</p>
    
    <h3 id="cmdlet-definition">1. Qu'est-ce qu'une Cmdlet ?</h3>
    <p>Une <strong>Cmdlet</strong> (prononcé "command-let") est une commande légère intégrée au shell. Elles suivent toujours une structure <strong>Verbe-Nom</strong> en anglais.</p>
    <ul>
        <li><code>Get</code> : Récupérer des informations.</li>
        <li><code>Set</code> : Modifier ou définir une configuration.</li>
        <li><code>New</code> : Créer un nouvel objet (utilisateur, fichier, etc.).</li>
        <li><code>Remove</code> : Supprimer un objet.</li>
    </ul>

    <h3 id="execution-policy">2. Politique d'exécution</h3>
    <p>Par défaut, Windows bloque l'exécution des scripts pour des raisons de sécurité. On utilise <code>Set-ExecutionPolicy</code> pour modifier ce comportement.</p>
    <table>
        <thead><tr><th>Politique</th><th>Description</th></tr></thead>
        <tbody>
            <tr><td><strong>Restricted</strong></td><td>Aucun script ne peut être exécuté (Défaut sur Client).</td></tr>
            <tr><td><strong>AllSigned</strong></td><td>Seuls les scripts signés par un éditeur de confiance fonctionnent.</td></tr>
            <tr><td><strong>RemoteSigned</strong></td><td>Scripts locaux autorisés, scripts Internet doivent être signés.</td></tr>
            <tr><td><strong>Unrestricted</strong></td><td>Tous les scripts fonctionnent (Attention !).</td></tr>
        </tbody>
    </table>
</section>

<section id="unite2-content">
    <h2 id="unite2">Unité 2 : Obtenir de l'aide et explorer le système</h2>
    
    <h3 id="help-system">1. Le système d'aide</h3>
    <ul>
        <li><code>Get-Help Command-Name</code> : Affiche l'aide d'une commande (ex: <code>Get-Help Get-Service</code>).</li>
        <li><code>Get-Command *service*</code> : Liste toutes les commandes contenant le mot "service".</li>
        <li><code>Get-Member</code> : Affiche les <strong>Propriétés</strong> et <strong>Méthodes</strong> d'un objet (Crucial !).</li>
    </ul>

    <h3 id="modules-ps">2. Modules et Snap-ins</h3>
    <p>PowerShell est extensible. Des modules ajoutent des commandes pour des rôles spécifiques (Active Directory, Azure, SQL Server).</p>
    <ul>
        <li><code>Get-Module -ListAvailable</code> : Voir les modules installés.</li>
        <li><code>Import-Module Name</code> : Charger un module manuellement.</li>
    </ul>
</section>

<section id="unite3-content">
    <h2 id="unite3">Unité 3 : Le Pipeline et les Objets</h2>
    
    <h3 id="pipeline-theory">1. Le Pipeline (|)</h3>
    <p>Contrairement à Linux où le pipeline transmet du texte, PowerShell transmet des <strong>objets complets</strong>.</p>
    <p><em>Exemple : <code>Get-Service | Stop-Service</code> transmet l'objet "Service" directement, pas juste son nom.</em></p>

    <h3 id="filtering-sorting">2. Filtrage et Tri</h3>
    <ul>
        <li><code>Where-Object</code> : Filtrer les objets selon une condition.
            <br><code>Get-Service | Where-Object Status -eq "Running"</code></li>
        <li><code>Select-Object</code> : Choisir uniquement certaines propriétés (ex: Name, Status).</li>
        <li><code>Sort-Object</code> : Trier les résultats.</li>
    </ul>

    <pre><code class="language-powershell"># Exemple : Liste les 5 processus utilisant le plus de RAM
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5 Name, ID, WorkingSet</code></pre>
</section>

<section id="unite4-content">
    <h2 id="unite4">Unité 4 : Variables et Opérateurs</h2>
    
    <h3 id="ps-variables">1. Déclaration</h3>
    <p>Toutes les variables commencent par le signe <strong>$</strong>.</p>
    <pre><code class="language-powershell">$nom = "Serveur01"
$nombre = 10
$services = Get-Service  # Stocke une collection d'objets</code></pre>

    <h3 id="ps-operators">2. Opérateurs de comparaison</h3>
    <p>Attention : PowerShell n'utilise pas <code>></code> ou <code><</code> mais des abréviations :</p>
    <ul>
        <li><code>-eq</code> : Égal (Equal)</li>
        <li><code>-ne</code> : Différent (Not Equal)</li>
        <li><code>-gt</code> : Plus grand que (Greater Than)</li>
        <li><code>-lt</code> : Plus petit que (Less Than)</li>
        <li><code>-like</code> : Comparaison avec joker (*)</li>
    </ul>
</section>

<section id="unite5-content">
    <h2 id="unite5">Unité 5 : Structures de Contrôle</h2>
    
    <h3 id="ps-if">1. Conditions (If / Else)</h3>
    <pre><code class="language-powershell">if ($valeur -gt 100) {
    Write-Host "Valeur trop haute !" -ForegroundColor Red
} else {
    Write-Host "Valeur OK"
}</code></pre>

    <h3 id="ps-loops">2. Boucles (ForEach / While)</h3>
    <pre><code class="language-powershell"># Parcourir une liste d'utilisateurs
$users = "Alice", "Bob", "Charlie"
foreach ($u in $users) {
    Write-Host "Traitement de l'utilisateur : $u"
}</code></pre>
</section>

<section id="unite6-content">
    <h2 id="unite6">Unité 6 : Écriture de Scripts</h2>
    <p>Un script PowerShell porte l'extension <strong>.ps1</strong>.</p>
    
    <h3 id="ps-parameters">1. Paramètres</h3>
    <p>On utilise le bloc <code>param()</code> en début de script pour le rendre dynamique.</p>
    <pre><code class="language-powershell">param(
    [string]$NomMachine = "Localhost",
    [int]$SeuilAlerte = 90
)</code></pre>
</section>

<section id="unite7-content">
    <h2 id="unite7">Unité 7 : Gestion des Erreurs</h2>
    
    <h3 id="try-catch">1. Try / Catch / Finally</h3>
    <p>Permet d'éviter que le script ne s'arrête brutalement en cas d'erreur.</p>
    <pre><code class="language-powershell">try {
    # Commande risquée
    Stop-Service "ServiceInexistant" -ErrorAction Stop
} catch {
    Write-Host "Erreur capturée : $($_.Exception.Message)"
}</code></pre>
</section>

<section id="unite8-content">
    <h2 id="unite8">Unité 8 : PowerShell Remoting</h2>
    <p>Permet d'exécuter des commandes sur des machines distantes via le protocole <strong>WinRM (Web Services for Management)</strong>.</p>
    
    <h3 id="ps-remoting-cmds">1. Commandes clés</h3>
    <ul>
        <li><code>Enter-PSSession -ComputerName SRV01</code> : Ouvre un shell interactif distant.</li>
        <li><code>Invoke-Command -ComputerName PC01, PC02 -ScriptBlock { Get-Service }</code> : Exécute une commande en parallèle sur plusieurs postes.</li>
    </ul>
</section>
