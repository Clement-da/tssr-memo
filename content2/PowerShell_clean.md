# PowerShell

## Introduction

PowerShell est un shell en ligne de commande et un langage de script développé par Microsoft, sorti en 2006. Il est basé sur le framework .NET et conçu spécifiquement pour l'administration de systèmes Windows.

**Versions principales :**

- **Windows PowerShell 5.1** : version classique, intégrée par défaut à Windows 10 et Windows Server 2019. Fonctionne uniquement sous Windows, fortement intégré aux technologies Microsoft (Active Directory, WMI, CIM...).
- **PowerShell Core 7.x** : version moderne, open source et multi-plateformes (Windows, Linux, macOS). Basée sur .NET Core. Certaines cmdlets Windows ne sont pas disponibles (WMI/CIM, tâches planifiées). Recommandée pour les environnements hybrides ou DevOps.

| Critère | Windows PowerShell 5.1 | PowerShell Core 7.x |
|---|---|---|
| Plateformes | Windows uniquement | Windows, Linux, macOS |
| Base technique | .NET Framework | .NET Core |
| Active Directory, WMI | Oui | Limité |
| Open source | Non | Oui |
| Usage typique | Administration Windows classique | Environnements hybrides, DevOps, Azure |

> PowerShell n'est plus seulement un outil Windows — c'est un vrai langage d'administration multi-OS.

---

## Les cmdlets — Verbe-Nom

Toutes les commandes PowerShell (appelées **cmdlets**) suivent la convention **Verbe-Nom**. Cela les rend prévisibles : une fois qu'on connaît les verbes courants, on peut deviner la plupart des commandes.

| Verbe | Rôle | Exemple |
|---|---|---|
| `Get` | Récupérer / afficher | `Get-Service` |
| `Set` | Modifier / configurer | `Set-Service -Name Spooler -StartupType Disabled` |
| `New` | Créer un objet | `New-Item -Path C:\Test -ItemType Directory` |
| `Remove` | Supprimer | `Remove-Item C:\Test` |
| `Start` | Démarrer | `Start-Service -Name Spooler` |
| `Stop` | Arrêter | `Stop-Service -Name Spooler` |
| `Enable` | Activer | `Enable-PSRemoting` |
| `Disable` | Désactiver | `Disable-PSRemoting` |
| `Import` | Charger un module ou fichier | `Import-Module ActiveDirectory` |
| `Export` | Exporter vers un fichier | `Export-Csv C:\Users.csv -NoTypeInformation` |

```powershell
# Exemple avec Active Directory
Get-ADUser    # récupérer un utilisateur
Set-ADUser    # modifier un utilisateur
New-ADUser    # créer un utilisateur
```

---

## Politique d'exécution (ExecutionPolicy)

Par défaut, PowerShell bloque l'exécution de scripts pour des raisons de sécurité. La politique d'exécution définit quels scripts peuvent être lancés.

| Politique | Description |
|---|---|
| `Restricted` | Aucun script autorisé (valeur par défaut sur certains Windows) |
| `AllSigned` | Seuls les scripts signés numériquement sont autorisés |
| `RemoteSigned` | Scripts locaux autorisés ; scripts téléchargés doivent être signés |
| `Unrestricted` | Tout est autorisé — à éviter en production |
| `Bypass` | Ignore toutes les restrictions |
| `Undefined` | Supprime la configuration actuelle |

> Bonne pratique en entreprise : utiliser `RemoteSigned`.

```powershell
Get-ExecutionPolicy                   # Vérifier la politique actuelle
Set-ExecutionPolicy RemoteSigned      # Modifier (nécessite les droits administrateur)
```

---

## Modules

Un module est un ensemble de cmdlets regroupées par domaine fonctionnel (Active Directory, Azure, VMware...). Les modules permettent d'étendre PowerShell selon le contexte.

```powershell
Import-Module ActiveDirectory          # Charger le module Active Directory
Get-Command -Module ActiveDirectory    # Lister toutes les cmdlets du module
Get-Module -ListAvailable              # Lister tous les modules disponibles sur le système
```

---

## PowerShell : langage orienté objet

### Texte brut vs objets

En Bash ou CMD, les commandes renvoient du **texte brut** qu'il faut ensuite analyser avec des outils comme `grep` ou `awk`. En PowerShell, les commandes renvoient des **objets .NET structurés** avec des propriétés (informations) et des méthodes (actions).

```bash
# En Bash — résultat en texte brut
id tom
# → uid=1001(tom) gid=1001(tom) groups=1001(tom)
```

```powershell
# En PowerShell — résultat structuré
Get-LocalUser -Name Tom
# → Objet utilisateur avec propriétés accessibles directement

(Get-LocalUser -Name Tom).Enabled    # Accès direct à une propriété
# → True
```

---

### Types de données courants

| Type | Description | Exemple |
|---|---|---|
| `String` | Texte | `"Bonjour"` |
| `Int` | Nombre entier | `42` |
| `Boolean` | Valeur logique | `$true`, `$false` |
| `Null` | Absence de valeur | `$null` |
| `Array` | Tableau (liste ordonnée) | `1, 2, 3` |
| Objet complexe | Résultat d'une cmdlet | `Get-Service` |

```powershell
$nom   = "Paul"    # String
$age   = 25        # Int
$actif = $true     # Boolean
$liste = 1, 2, 3   # Array
```

> `$true` et `$false` sont des valeurs logiques binaires qui expriment si quelque chose est actif/présent/possible ou non. Ils ne signifient pas forcément "vrai" ou "faux" au sens littéral.

---

### Propriétés et méthodes

Un objet contient :
- des **propriétés** : les informations de l'objet — on y accède avec `$objet.Propriété`
- des **méthodes** : les actions disponibles sur l'objet — on les appelle avec `$objet.Méthode()`

```powershell
# 1) Récupérer tous les services
Get-Service

# 2) Récupérer un service spécifique
Get-Service -Name Spooler

# 3) Explorer le contenu de l'objet (propriétés + méthodes disponibles)
Get-Service -Name Spooler | Get-Member

# 4) Lire des propriétés
$service = Get-Service -Name Spooler
$service.Name      # "Spooler"
$service.Status    # "Running"

# 5) Appeler des méthodes
$service.Stop()    # Arrête le service
$service.Start()   # Démarre le service
```

> `Get-Member` est l'outil pour explorer ce que contient n'importe quel objet PowerShell.

---

## Manipulation des objets avec le pipeline

Le pipeline `|` enchaîne les cmdlets : la sortie de l'une devient l'entrée de la suivante. C'est au cœur de la philosophie PowerShell.

> Dans les filtres et transformations, `$_` désigne **l'objet courant** traité à chaque itération du pipeline — l'équivalent d'une variable de boucle automatique.

| Cmdlet | Rôle | Exemple |
|---|---|---|
| `Where-Object` | Filtrer selon une condition | `Get-Service \| Where-Object {$_.Status -eq "Stopped"}` |
| `Select-Object` | Choisir des propriétés à afficher | `Get-Process \| Select-Object -First 5 Name, Id` |
| `Sort-Object` | Trier les objets | `Get-Service \| Sort-Object Status -Descending` |
| `Format-Table` | Affichage en tableau | `Get-Service \| Format-Table Name, Status -AutoSize` |
| `Format-List` | Affichage détaillé en liste | `Get-Service -Name Spooler \| Format-List *` |
| `Out-File` | Exporter en fichier texte | `Get-Service \| Out-File C:\services.txt -Encoding UTF8` |
| `Export-Csv` | Exporter vers CSV (Excel) | `Get-Process \| Export-Csv C:\proc.csv -NoTypeInformation -Delimiter ";"` |
| `Import-Csv` | Lire un CSV en objets | `Import-Csv C:\proc.csv -Delimiter ";"` |
| `ConvertTo-Json` | Exporter en JSON | `Get-Service \| ConvertTo-Json -Depth 3` |
| `Measure-Object` | Statistiques rapides | `Get-Process \| Measure-Object -Property CPU -Sum` |

```powershell
# Afficher les services arrêtés
Get-Service | Where-Object { $_.Status -eq "Stopped" }

# Lister les 5 premiers processus (nom + PID uniquement)
Get-Process | Select-Object -First 5 Name, Id

# Exporter tous les services vers un CSV
Get-Service | Export-Csv C:\services.csv -NoTypeInformation -Delimiter ";"
```

---

## Variables et structures de données

Une variable commence toujours par `$` et peut stocker n'importe quel type d'objet.

### Tableaux

Liste ordonnée d'éléments, indexée à partir de 0.

```powershell
$tableau = 1, 2, "jonquille", 4

$tableau[0]       # 1 (premier élément)
$tableau[1]       # 2
$tableau[-1]      # 4 (dernier élément)

$tableau += "phoque"          # Ajouter un élément
$tableau[0] = 8               # Modifier un élément
```

---

### Tables de hachage

Ensemble de paires **clé/valeur**, sans ordre garanti.

```powershell
$utilisateur = @{
    Nom   = "Paul"
    Age   = 25
    Actif = $true
}

$utilisateur["Nom"]    # "Paul"
$utilisateur.Age       # 25

$utilisateur.Ville = "Toulouse"    # Ajouter une clé
```

> La notation `$objet.Clé` fonctionne uniquement si la clé ne contient pas d'espace ni de caractère spécial.

---

### Objets personnalisés (PSCustomObject)

Permet de créer des objets structurés sur mesure, utiles pour générer des rapports ou préparer des exports.

```powershell
$personne = [PSCustomObject]@{
    Nom   = "Paul"
    Age   = 25
    Ville = "Toulouse"
}

$personne | Export-Csv C:\personnes.csv -NoTypeInformation
```

---

## Structures de contrôle (Séquence L-C-P)

C'est le rôle des structures de contrôle de rendre vos scripts "intelligents" et autonomes.

### Opérateurs de comparaison

| Opérateur | Signification | Exemple |
|---|---|---|
| `-eq` | Égal à | `$age -eq 18` |
| `-ne` | Différent de | `$statut -ne "Stopped"` |
| `-gt` | Supérieur à | `$age -gt 65` |
| `-lt` | Inférieur à | `$age -lt 18` |
| `-ge` | Supérieur ou égal | `$age -ge 18` |
| `-le` | Inférieur ou égal | `$score -le 100` |
| `-like` | Correspondance avec joker | `$nom -like "P*"` |
| `-match` | Correspondance regex | `$email -match "@"` |

---

### IF / ELSEIF / ELSE (La décision)

On utilise `if` pour vérifier une condition avant d'agir. C'est la base de tout script d'administration (ex: vérifier si un dossier existe).

```powershell
if ($condition) {
    # Instructions si vrai
}
elseif ($autreCondition) {
    # Instructions si cette condition est vraie
}
else {
    # Instructions si aucune condition précédente n'est vraie
}
```

**Exemple d'administration :** Jean-Marc vérifie l'espace disque libre avant de lancer une sauvegarde.

```powershell
$disque = 10 # Go
if ($disque -lt 5) {
    Write-Host "Alerte : Espace critique !" -ForegroundColor Red
} else {
    Write-Host "Espace suffisant." -ForegroundColor Green
}
```

**Résultat attendu :** Affiche "Espace suffisant." en vert car la condition (10 < 5) est fausse. Si le disque avait été à 2 Go, il aurait affiché l'alerte en rouge.

---

### Le Switch (Choix multiples)

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

---

### WHILE

Répète tant que la condition est vraie. La condition est vérifiée **avant** chaque itération.

```powershell
while ($condition) {
    # Instructions
}
```

```powershell
$compteur = 0

while ($compteur -lt 5) {
    Write-Host "Compteur : $compteur" -ForegroundColor Cyan
    $compteur++
}
Write-Host "Fin, compteur = $compteur" -ForegroundColor Green
# Affiche : 0, 1, 2, 3, 4 puis "Fin, compteur = 5"
```

---

### FOR (La répétition programmée)

On utilise `for` lorsqu'on sait exactement combien de fois on doit répéter une action (ex: créer un nombre fixe de dossiers numérotés).

```powershell
for ($i = 1; $i -le 10; $i++) {
    # $i est le compteur qui s'incrémente à chaque tour
}
```

**Exemple d'administration :** Jean-Marc prépare 10 dossiers pour un projet client.

```powershell
for ($i = 1; $i -le 10; $i++) {
    New-Item -Path "C:\Projets\P_$i" -ItemType Directory
    Write-Host "Dossier P_$i créé" -ForegroundColor Green
}
```

**Résultat attendu :** Création successive de 10 dossiers (P_1 à P_10) dans `C:\Projets` avec une notification verte pour chaque création.

---

### DO / WHILE et DO / UNTIL (Les boucles d'attente)

Ces boucles sont parfaites pour attendre qu'un événement extérieur se produise (ex: un serveur qui redémarre). Le code est exécuté **au moins une fois** avant le test.

*   `while` : Continue TANT QUE c'est vrai.
*   `until` : Continue JUSQU'À CE QUE ce soit vrai.

```powershell
# Syntaxe Do-While
do { 
    # Action exécutée au moins une fois
} while ($condition)

# Syntaxe Do-Until
do { 
    # Action exécutée au moins une fois
} until ($condition)
```

**P (Pratique) :** Jean-Marc attend que le serveur de base de données soit accessible avant de lancer une migration.

```powershell
do {
    Write-Host "Vérification de SQL-SRV..."
    $status = Test-Connection "SQL-SRV" -Count 1 -Quiet
    Start-Sleep -Seconds 2
} until ($status -eq $true)
```

**Résultat attendu :** Affiche "Vérification de SQL-SRV..." toutes les 2 secondes. Dès que le serveur répond (ping OK), la boucle s'arrête et le script continue.

---

### FOREACH (Parcours de collection en mémoire)

C'est la boucle standard pour traiter une liste d'objets stockée dans une variable (ex: liste d'utilisateurs extraite de l'AD). Elle charge tout en mémoire avant de commencer.

```powershell
foreach ($item in $liste) {
    # Code à exécuter pour chaque $item
}
```

**Exemple d'administration :** Jean-Marc liste les services qui sont actuellement arrêtés sur le serveur.

```powershell
$servicesArretes = Get-Service | Where-Object Status -eq "Stopped"
foreach ($s in $servicesArretes) {
    Write-Host "Service à vérifier : $($s.DisplayName)"
}
```

**Résultat attendu :** Affiche une ligne pour chaque service Windows actuellement arrêté sur le système (ex: Spouleur d'impression, Windows Update...).

> `$($u.Name)` est la syntaxe pour insérer une expression dans une chaîne de texte (`"..."`) en PowerShell.

---

### ForEach-Object / Pipeline (L'équivalent "while read")

C'est la méthode de flux (streaming). Elle traite chaque objet un par un à la volée. C'est l'outil indispensable pour traiter des fichiers énormes sans saturer la RAM, exactement comme le `while read line` de Bash.

```powershell
# Syntaxe
Get-Content "fichier.txt" | ForEach-Object {
    # $_ est l'objet courant traversant le tuyau (|)
}
```

**Exemple d'administration :** Jean-Marc audite un fichier de logs de 2 Go à la recherche d'erreurs.

```powershell
Get-Content "C:\Audit\Access.log" | ForEach-Object {
    if ($_ -like "*ERROR*") { 
        Write-Host "Incident trouvé : $_" -ForegroundColor Red 
    }
}
```

**Résultat attendu :** Lit le fichier de log ligne par ligne et n'affiche que les lignes contenant le mot "ERROR" (en rouge), sans charger l'intégralité du fichier en mémoire vive.

---

## Écriture d'un script

Un script PowerShell est un fichier texte avec l'extension `.ps1` contenant une suite de commandes. L'objectif est d'automatiser des tâches répétitives.

### Étape 1 — Vérifier et configurer l'ExecutionPolicy

```powershell
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned    # En mode administrateur
```

### Étape 2 — Créer et exécuter le script

```powershell
# Créer le fichier
New-Item MonScript.ps1

# Contenu du fichier
Write-Host "Bonjour, le script fonctionne !"

# Exécuter le script
.\MonScript.ps1
```

### Paramètres

Les paramètres rendent un script réutilisable sans le modifier.

```powershell
param(
    [string]$Nom,
    [int]$Age
)

Write-Host "Nom : $Nom"
Write-Host "Age : $Age"
```

Exécution :
```powershell
.\MonScript.ps1 -Nom "Julie" -Age 30
```

---

## Gestion des erreurs

### La variable `$Error`

Toutes les erreurs rencontrées sont stockées dans `$Error`. `$Error[0]` contient la dernière erreur.

```powershell
Get-ChildItem C:\Dossier -ErrorVariable MesErreurs
# Les erreurs sont stockées dans $MesErreurs au lieu de $Error
```

### Le paramètre `-ErrorAction`

Contrôle le comportement d'une cmdlet en cas d'erreur.

| Valeur | Comportement |
|---|---|
| `Continue` | Affiche l'erreur et continue (valeur par défaut) |
| `SilentlyContinue` | Ignore l'erreur mais la stocke dans `$Error` |
| `Ignore` | Ignore l'erreur, ne la stocke pas |
| `Stop` | Transforme l'erreur en erreur bloquante |
| `Inquire` | Demande à l'utilisateur quoi faire |

```powershell
Get-ChildItem "C:\PasLa" -ErrorAction SilentlyContinue
# Aucun message d'erreur affiché, mais l'erreur est disponible dans $Error[0]
```

La variable `$ErrorActionPreference` définit le comportement global pour tout le script :
```powershell
$ErrorActionPreference = "SilentlyContinue"
```

### Try / Catch / Finally

Méthode recommandée en production pour gérer les erreurs de façon structurée.

```powershell
try {
    # On utilise -ErrorAction Stop pour forcer l'interruption et passer dans le catch
    Get-ChildItem "C:\PasLa" -ErrorAction Stop
}
catch {
    Write-Host "Erreur : $($_.Exception.Message)" -ForegroundColor Red    # Exécuté si erreur
}
finally {
    Write-Host "Bloc finally — s'exécute toujours" -ForegroundColor Yellow
}
```

- `try` : contient le code à risque.
- `catch` : contient la gestion de l'erreur — `$_` contient l'objet erreur.
- `finally` : s'exécute dans tous les cas (avec ou sans erreur) — utile pour nettoyer des ressources.

---

### 1. Théorie : WinRM & WS-MAN

Le Remoting permet d'administrer des serveurs à distance (via une console). Cela permet de ne plus utiliser le client visuel **Bureau à distance (RDP)**, qui consomme plus lourdement. Il utilise le protocole **WS-Management** via le service Windows **WinRM**.

### Activation

Sur la machine distante (en mode administrateur) :
```powershell
Enable-PSRemoting -Force
# Configure WinRM et ouvre les règles de pare-feu nécessaires
```

### Commandes principales

| Cmdlet | Rôle | Exemple |
|---|---|---|
| `Invoke-Command` | Exécuter une commande à distance | `Invoke-Command -ComputerName SRV1 -ScriptBlock { Get-Service }` |
| `New-PSSession` | Créer une session persistante | `$s = New-PSSession -ComputerName SRV1` |
| `Enter-PSSession` | Connexion interactive (shell distant) | `Enter-PSSession -ComputerName SRV1` |
| `Exit-PSSession` | Quitter la session interactive | `Exit-PSSession` |
| `Get-PSSession` | Lister les sessions ouvertes | `Get-PSSession` |
| `Remove-PSSession` | Fermer une session | `Remove-PSSession -Id 1` |

```powershell
# Commande ponctuelle sur une machine distante
Invoke-Command -ComputerName SRV-WEB -ScriptBlock { Get-Service Spooler }

# Session persistante (plus efficace pour plusieurs commandes)
$s = New-PSSession -ComputerName SRV-SQL
Invoke-Command -Session $s -ScriptBlock { hostname; Get-Date }
Remove-PSSession -Session $s
```

### Le problème du double hop

Lorsqu'on est connecté à une machine distante via PSSession, on ne peut pas, depuis cette machine, se connecter à une troisième machine avec les mêmes identifiants. C'est une restriction de sécurité appelée **"double hop"**.

**Solutions :**
- **CredSSP** : permet la délégation des identifiants pour franchir cette limite (plus souple, mais introduit un risque de sécurité).
- **Serveur bastion / jump server** : serveur d'administration central qui dispose des droits d'accès aux autres machines — solution recommandée en entreprise.
