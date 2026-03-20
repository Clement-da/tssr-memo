---
id: "powershell"
title: "PowerShell & Scripting"
icon: "🐚"
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
            <li><a href="#unite1">1. Introduction & Cmdlets</a>
                <ol>
                    <li><a href="#cmdlet-theory">Théorie : L'écosystème PowerShell</a></li>
                    <li><a href="#cmdlet-definition">Structure Verbe-Nom</a></li>
                    <li><a href="#execution-policy">Politique d'exécution</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Aide & Syntaxe</a>
                <ol>
                    <li><a href="#help-system">Le système d'aide (Get-Help)</a></li>
                    <li><a href="#modules-ps">Modules et Extensions</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Pipeline & Objets</a>
                <ol>
                    <li><a href="#pipeline-theory">Théorie : Pipeline d'objets (.NET)</a></li>
                    <li><a href="#filtering-sorting">Filtrage & Tri (Where/Select)</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Variables & Opérateurs</a>
                <ol>
                    <li><a href="#ps-variables">Déclaration ($)</a></li>
                    <li><a href="#ps-operators">Opérateurs (-eq, -gt, etc.)</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Automatisation & Boucles</a>
                <ol>
                    <li><a href="#ps-if">La condition If / Else</a></li>
                    <li><a href="#ps-case">Le Switch</a></li>
                    <li><a href="#ps-loop-for">La boucle For</a></li>
                    <li><a href="#ps-loop-foreach">La boucle ForEach</a></li>
                    <li><a href="#ps-loop-pipeline">Le Pipeline (While Read)</a></li>
                    <li><a href="#ps-loop-while">Les boucles While / Do-Until</a></li>
                </ol>
            </li>
            <li><a href="#unite7">6. Gestion des Erreurs</a>
                <ol>
                    <li><a href="#error-action">ErrorAction & Preferences</a></li>
                    <li><a href="#try-catch">Try / Catch / Finally</a></li>
                </ol>
            </li>
            <li><a href="#unite8">7. Remoting (Gestion à distance)</a>
                <ol>
                    <li><a href="#remoting-theory">Théorie : WinRM & WS-MAN</a></li>
                    <li><a href="#remoting-cmds">Commandes de session</a></li>
                    <li><a href="#double-hop">Le problème du Double Hop</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Introduction et Cmdlets</h2>

<h3 id="cmdlet-theory">1. Théorie : L'écosystème PowerShell</h3>
PowerShell est un shell (interpréteur) et un langage de script basé sur le framework .NET.

- **Windows PowerShell 5.1** : Version classique, intégrée à Windows, basée sur .NET Framework. Idéale pour l'AD et WMI.
- **PowerShell 7.x (Core)** : Version moderne, open-source et multi-plateforme (Linux/Mac), basée sur .NET Core.

| Critère | PowerShell 5.1 | PowerShell 7.x |
| :--- | :--- | :--- |
| **Plateforme** | Windows uniquement | Windows, Linux, macOS |
| **Base technique** | .NET Framework | .NET Core |
| **Usage** | Admin Windows classique | Cloud, Hybride, DevOps |

<h3 id="cmdlet-definition">2. Structure d'une Cmdlet (Verbe-Nom)</h3>
Les commandes (Cmdlets) suivent une nomenclature stricte pour être prévisibles :

- **Verbe** : L'action (`Get`, `Set`, `New`, `Remove`, `Start`, `Stop`).
- **Nom** : La ressource visée (`Service`, `ADUser`, `Item`, `Process`).

**Exemples :**

- `Get-Service` : Affiche les services.
- `Stop-Service -Name Spooler` : Arrête le service Spooler.
- `New-Item -Path C:\Test -ItemType Directory` : Crée un dossier.

<h3 id="execution-policy">3. Politique d'exécution (ExecutionPolicy)</h3>
C'est une barrière de sécurité qui empêche l'exécution de scripts malveillants par défaut.

- **Restricted** : Aucun script autorisé (Défaut).
- **RemoteSigned** : Scripts locaux ok, scripts Web signés requis (Standard pro).
- **AllSigned** : Tout doit être signé numériquement.
- **Unrestricted** : Tout est permis (Danger).

**Commandes :**

```powershell
Get-ExecutionPolicy              # Vérifier
Set-ExecutionPolicy RemoteSigned # Appliquer (Admin requis)
```

</section>

<section id="unite2-content">
<h2 id="unite2">2. Aide et Syntaxe</h2>

<h3 id="help-system">1. Le système d'aide</h3>
PowerShell est auto-documenté. En cas de doute, utilisez ces trois commandes :

1. `Get-Help Get-Service` : Affiche le manuel d'une commande.
2. `Get-Command *service*` : Cherche toutes les commandes contenant ce mot.
3. `Get-Member` : **L'outil le plus puissant**. Affiche les **Propriétés** (données) et **Méthodes** (actions) d'un objet.

**Exemple d'exploration :**

```powershell
$s = Get-Service -Name Spooler
$s.Status    # Propriété : affiche "Running"
$s.Stop()    # Méthode : arrête le service
```

<h3 id="modules-ps">2. Modules</h3>
Un module est une extension qui ajoute des commandes pour un rôle précis (Active Directory, Azure, Exchange).

- `Import-Module ActiveDirectory` : Charge le module.
- `Get-Module -ListAvailable` : Liste les modules installés sur le PC.

</section>

<section id="unite3-content">
<h2 id="unite3">3. Le Pipeline et les Objets</h2>

<h3 id="pipeline-theory">1. Théorie : Le Pipeline d'objets (.NET)</h3>
C'est la différence majeure avec Linux/Bash. Le pipeline (`|`) ne transmet pas du texte, mais des **objets structurés**.
Quand vous faites `Get-Service | ...`, vous envoyez des objets "Service" complets contenant des dizaines d'informations cachées, pas juste une liste de noms.

> **Variable spéciale `$_`** : Elle représente l'objet "actuel" qui traverse le pipeline à un instant T.

<h3 id="filtering-sorting">2. Filtrage et Tri</h3>

- **Where-Object** : Le filtre. `Get-Service | Where-Object { $_.Status -eq "Stopped" }`.
- **Select-Object** : Le choix des colonnes. `Get-Process | Select-Object Name, Id -First 5`.
- **Sort-Object** : Le tri. `Get-Service | Sort-Object Status -Descending`.

</section>

<section id="unite4-content">
<h2 id="unite4">4. Variables et Opérateurs</h2>

<h3 id="ps-variables">1. Déclaration : Le signe $</h3>
Une variable stocke n'importe quel élément (texte, nombre, tableau, objet).

| Type de donnée | Exemple de définition |
| :--- | :--- |
| **String** (Chaîne) | `$nom = "TSSR"` |
| **Int** (Nombre Entier) | `$age = 25` |
| **Boolean** (Vrai/Faux) | `$bool = $true` |
| **Array** (Tableau temporel) | `$arr = @(1, 2, 3)` |
| **Hashtable** (Tableau associatif) | `$hash = @{ Nom="Paul" ; Ville="Paris" }` |

<h3 id="ps-operators">2. Opérateurs de comparaison</h3>
Sur PowerShell, on n'utilise pas `=` ni `>`, car PowerShell les réserve pour d'autres commandes.

| Opérateur | Signification | Exemple |
| :--- | :--- | :--- |
| `-eq` / `-ne` | Égal à (`Equal`) / Différent (`Not Equal`) | `$age -eq 18` |
| `-gt` / `-lt` | Plus grand (`Greater Than`) / Plus petit (`Less Than`) | `$age -gt 18` |
| `-ge` / `-le` | Plus grand ou égal / Plus petit ou égal | `$age -ge 18` |
| `-match` | Recherche par expression régulière (Regex) | `$nom -match "^P.*"` |

</section>

<section id="unite5-content">
<h2 id="unite5">5. Automatisation & Boucles</h2>

<p>Pour qu'un script soit réellement efficace, il doit savoir prendre des décisions et répéter des tâches de manière autonome.</p>

<h3 id="ps-if">1. La condition If / Else</h3>
<p>On utilise cette structure pour vérifier une ou plusieurs conditions avant d'exécuter un code. C'est la base de tout script d'administration (ex: vérifier si un dossier existe avant d'écrire dedans).</p>

```powershell
# Syntaxe
if ($condition) {
    # Si vrai
}
elseif ($autreCondition) {
    # Si la première est fausse mais celle-ci vraie
}
else {
    # Si tout est faux
}
```

<p><strong>Exemple concret :</strong> Jean-Marc vérifie l'espace disque restant avant de lancer une sauvegarde.</p>

```powershell
$espaceLibre = 10 # en Go

if ($espaceLibre -lt 5) {
    Write-Host "Alerte : Espace insuffisant !" -ForegroundColor Red
}
else {
    Write-Host "Espace suffisant pour la sauvegarde." -ForegroundColor Green
}
# Résultat : Espace suffisant pour la sauvegarde. (en vert)
```

### 2. Le Switch (Choix multiples)

Pour gagner en lisibilité et éviter une longue suite de `if / elseif`, on utilise l'instruction `switch`. C'est le moyen le plus propre pour créer des menus interactifs.

**Syntaxe :**

```powershell
switch ($variable) {
    "Valeur1" { 
        # Action 1 
    }
    "Valeur2" { 
        # Action 2 
    }
    default { 
        # Si aucun choix ne correspond 
    }
}
```

**Exemple d'administration :** Jean-Marc crée un menu de diagnostic pour automatiser ses actions courantes.

```powershell
Write-Host "1) Afficher les fichiers du répertoire courant"
Write-Host "2) Afficher les répertoires de /"
Write-Host "3) Éteindre l'ordinateur"
Write-Host "4) Quitter"

$choix = Read-Host "Votre choix"

# Le mode -Regex permet de gérer plusieurs déclencheurs (ex: 1 ou fichier)
switch -Regex ($choix) {
    "1|fichier" { 
        Write-Host "📂 Fichiers du répertoire courant :" -ForegroundColor Yellow
        Get-ChildItem -File 
    }
    "2|repertoire" { 
        Write-Host "📂 Répertoires dans / :" -ForegroundColor Yellow
        Get-ChildItem -Path "/" -Directory 
    }
    "3|eteindre" { 
        Write-Host "⚠️ Extinction en cours..." -ForegroundColor Red
        Stop-Computer -Force 
    }
    "4|quitter" { 
        Write-Host "👋 Au revoir !" -ForegroundColor Green
        Exit 
    }
    default { 
        Write-Host "❌ Choix invalide" -ForegroundColor Red 
    }
}
```

**Explication :**

- **Choix 1** -> affiche uniquement les fichiers du dossier courant.
- **Choix 2** -> liste uniquement les répertoires situés à la racine `/`.
- **Choix 3** -> éteint l'ordinateur (⚠️ nécessite des droits administrateur).
- **Choix 4** -> quitte proprement le script.
- **`default`** -> capte toute autre saisie et affiche une erreur.

<hr />

<h3 id="ps-loop-for">3. La boucle For (Compteur)</h3>
<p>Elle est idéale quand on connaît exactement à l'avance le nombre de répétitions à effectuer (ex: de 1 à 10).</p>

```powershell
for ($i = 1; $i -le 10; $i++) {
    Write-Host "Étape numéro $i"
}
```

<p><strong>Exemple concret :</strong> Jean-Marc prépare 5 machines virtuelles de test en créant leurs dossiers de configuration.</p>

```powershell
for ($i = 1; $i -le 5; $i++) {
    New-Item -Path "C:\Lab\VM_$i" -ItemType Directory
}
```
<p><strong>Résultat attendu :</strong> PowerShell crée successivement 5 dossiers nommés VM_1, VM_2, VM_3, VM_4 et VM_5 dans le dossier C:\Lab.</p>

<h3 id="ps-loop-foreach">4. La boucle ForEach (Collection)</h3>
<p>C'est la boucle la plus utilisée pour traiter une liste d'objets déjà stockée dans une variable. Elle charge tout en mémoire avant de commencer.</p>

```powershell
foreach ($element in $liste) {
    # Action sur l'élément
}
```

<p><strong>Exemple concret :</strong> Jean-Marc doit lister les services qui sont actuellement arrêtés sur le serveur.</p>

```powershell
$servicesArretes = Get-Service | Where-Object Status -eq "Stopped"

foreach ($s in $servicesArretes) {
    Write-Host "Service à vérifier : $($s.DisplayName)"
}
```
<p><strong>Résultat attendu :</strong> Une liste s'affiche avec le nom complet de chaque service arrêté (ex: Spouleur d'impression, Windows Update, etc.).</p>

<h3 id="ps-loop-pipeline">5. Le Pipeline (ForEach-Object / While Read)</h3>
<p>C'est l'équivalent PowerShell du <code>while read line</code> de Bash. Contrairement au <code>foreach</code> classique, elle traite les objets un par un au fil de l'eau. C'est la méthode indispensable pour les fichiers lourds (plusieurs Go) car elle n'utilise presque pas de RAM.</p>

```powershell
Get-Content "Log_Geant.log" | ForEach-Object {
    # Action sur chaque ligne ($_)
}
```

<p><strong>Exemple concret :</strong> Jean-Marc analyse un fichier de log de 2 Go à la recherche de lignes contenant des erreurs.</p>

```powershell
Get-Content "C:\Audit\Access.log" | ForEach-Object {
    if ($_ -like "*ERROR*") { 
        Write-Host "Incident trouvé : $_" -ForegroundColor Red 
    }
}
```
<p><strong>Résultat attendu :</strong> Seules les lignes contenant le mot "ERROR" s'affichent en rouge à l'écran, peu importe la taille du fichier d'origine.</p>

<h3 id="ps-loop-while">6. Les boucles While et Do-Until</h3>
<p>Ces boucles servent à attendre un événement ou une condition précise.</p>
<ul>
    <li><strong>While :</strong> Répète TANT QUE c'est vrai (test au début).</li>
    <li><strong>Do-While :</strong> Répète TANT QUE c'est vrai (test à la fin).</li>
    <li><strong>Do-Until :</strong> Répète JUSQU'À CE QUE ce soit vrai (test à la fin).</li>
</ul>

```powershell
# Syntaxe While
while ($compteur -lt 5) {
    $compteur++
}

# Syntaxe Do-While
do { 
    Write-Host "Exécuté au moins une fois"
} while ($condition)
```

```powershell
# Attente de disponibilité (Exemple Jean-Marc)
do {
    Write-Host "Attente du serveur..."
    $ping = Test-Connection "SRV01" -Count 1 -Quiet
    Start-Sleep -Seconds 5
} until ($ping -eq $true)
```
<p><strong>Résultat attendu :</strong> Le message "Attente du serveur..." se répète toutes les 5 secondes jusqu'à ce que SRV01 réponde au ping.</p>

</section>

<section id="unite7-content">
<h2 id="unite7">6. Gestion des Erreurs</h2>

<h3 id="error-action">1. ErrorAction & Preferences</h3>
Chaque cmdlet possède le paramètre `-ErrorAction`.

- `Continue` : Affiche l'erreur et continue (Défaut).
- `SilentlyContinue` : Cache l'erreur mais continue.
- `Stop` : Arrête tout en cas d'erreur (Utile pour le Try/Catch).

<h3 id="try-catch">2. Try / Catch / Finally</h3>
La méthode pro pour gérer un crash :

```powershell
try {
    # Code à risque
    Stop-Service "ServiceInexistant" -ErrorAction Stop
} catch {
    # Code exécuté SI erreur
    "Erreur capturée : $($_.Exception.Message)"
} finally {
    # Code exécuté TOUJOURS (nettoyage)
}
```

</section>

<section id="unite8-content">
<h2 id="unite8">7. PowerShell Remoting</h2>

### 1. Théorie : WinRM & WS-MAN

Le Remoting permet d'administrer des serveurs à distance (via une console). Cela permet de ne plus utiliser le client visuel **Bureau à distance (RDP)**, qui consomme plus lourdement. Il utilise le protocole **WS-Management** via le service Windows **WinRM**.

**Ports :**

- HTTP (Interne) : **Port 5985**
- HTTPS (Sécurisé) : **Port 5986**

**Activation :** (Sur le serveur distant)

```powershell
Enable-PSRemoting -Force
```

### 2. Commandes de session

- `Enter-PSSession -ComputerName SRV01` : Ouvre un terminal **interactif** (un à un).
- `Invoke-Command -ComputerName S1, S2 -ScriptBlock { Get-Date }` : Exécute en **parallèle** sur plusieurs postes.
- `New-PSSession` : Crée une session persistante (plus rapide pour plusieurs commandes).

### 3. Le problème du Double Hop

**Le Concept :** Vous êtes sur PC-A, vous vous connectez en Remoting à SERVEUR-B. Depuis SERVEUR-B, vous tentez d'accéder à un partage sur SERVEUR-C. 

**Le problème :** Pour des raisons de sécurité, vos identifiants ne sont pas transmis au 2ème saut.

**Solutions :** Utiliser **CredSSP** (délégation) ou un **Serveur Bastion**.

</section>
