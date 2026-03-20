---
id: "systemes_microsoft"
title: "Systèmes Clients Microsoft"
icon: "🪟"
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
            <li><a href="#unite1">1. L'OS : Le Chef d'Orchestre</a>
                <ol>
                    <li><a href="#os-definition">Rôles & Structure</a></li>
                    <li><a href="#waas">Windows as a Service (WaaS)</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Éditions & Licences</a></li>
            <li><a href="#unite2bis">3. Installation & Migration (USMT)</a></li>
            <li><a href="#unite3">4. Stockage & Fichiers</a>
                <ol>
                    <li><a href="#partitionnement">MBR vs GPT</a></li>
                    <li><a href="#filesystem">NTFS, FAT32 & ReFS</a></li>
                </ol>
            </li>
            <li><a href="#unite4">5. Utilisateurs & Groupes</a>
                <ol>
                    <li><a href="#accounts">Types de comptes & SID</a></li>
                    <li><a href="#profiles">Profils Utilisateurs</a></li>
                </ol>
            </li>
            <li><a href="#unite5">6. Sécurité NTFS & Partage</a>
                <ol>
                    <li><a href="#ntfs-acl">ACL & Héritage</a></li>
                    <li><a href="#sharing">Droit de Partage vs NTFS</a></li>
                </ol>
            </li>
            <li><a href="#unite6">7. Bureau à distance (RDP)</a></li>
            <li><a href="#unite7">8. Impression & Spouleur</a></li>
            <li><a href="#unite8">9. Maintenance & Diagnostic</a></li>
            <li><a href="#unite9">10. Déploiement : Sysprep & DISM</a></li>
            <li><a href="#unite10">11. Le Registre Windows</a></li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. L'OS : Le Chef d'Orchestre</h2>

<h3 id="os-definition">1. Théorie : Rôles & Structure</h3>

Le **système d'exploitation (Operating System — OS)** est le logiciel fondamental qui permet l'interaction entre l'utilisateur, les applications et le matériel physique. Il assure la gestion des ressources critiques :

| Ressource | Rôle de l'OS |
| :--- | :--- |
| **CPU** | Répartit le temps de calcul entre les processus (**multitâche**). |
| **RAM** | Alloue l'espace mémoire nécessaire et garantit l'étanchéité entre programmes. |
| **Stockage** | Organise les données via le système de fichiers et gère les droits. |
| **Périphériques** | Pilote le matériel (clavier, réseau, écran) via les **drivers**. |

**Structure en couches :**
1. **Noyau (Kernel)** : Cœur du système, seul composant parlant directement au matériel.
2. **Système de fichiers** : Méthode d'organisation et de stockage des données.
3. **Interface (Shell)** : Graphique (GUI) ou textuelle (CLI), elle permet de piloter l'OS.

<h3 id="waas">2. Windows as a Service (WaaS)</h3>

Depuis Windows 10, Microsoft utilise un modèle de mise à jour continue :

- **Feature Update** : Version majeure (ex: 22H2), publiée une à deux fois par an.
- **Quality Update** : Correctifs de sécurité et bugs, publiés chaque 2ème mardi du mois (**Patch Tuesday**).

**Pratique : Identifier sa version système**

```powershell
# Afficher les informations de build et d'édition
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, WindowsBuild
```
**Résultat attendu :**
```text
WindowsProductName WindowsVersion WindowsBuild
------------------ -------------- ------------
Windows 10 Pro     22H2           19045
```

</section>

<section id="unite2-content">
<h2 id="unite2">2. Éditions et Licences</h2>

<h3 id="editions">1. Choix de l'édition : Famille vs Pro</h3>

En environnement professionnel, le choix de l'édition est critique pour la centralisation de l'administration.

| Fonctionnalité | Windows Famille | Windows Professionnel |
| :--- | :---: | :---: |
| **Usage Personnel** | ✅ | ✅ |
| **Jonction Domaine AD** | ❌ | ✅ |
| **Stratégies de groupe (GPO)**| ❌ | ✅ |
| **BitLocker (Chiffrement)** | ❌ | ✅ |
| **Bureau à distance (Hôte)** | ❌ | ✅ |

<h3 id="licensing">2. Modèles de licences en volume</h3>

Pour les parcs informatiques, on utilise des méthodes d'activation centralisées :

- **MAK (Multiple Activation Key)** : Une clé unique pour plusieurs postes. L'activation se fait auprès des serveurs Microsoft (Internet).
- **KMS (Key Management Service)** : Un serveur interne à l'entreprise gère les activations. Les postes se réactivent tous les 180 jours.
- **CAL (Client Access License)** : Ce n'est pas une licence Windows, mais un droit d'accès aux services serveurs (AD, Fichiers).

**Pratique : Vérifier l'état de la licence**

```cmd
# Outil de gestion des licences logicielles
slmgr.vbs /dlv
```
**Résultat attendu :** Une fenêtre contextuelle s'ouvre affichant l'édition, le canal de clé (Retail, OEM ou Volume) et l'état de l'activation.

</section>

<section id="unite2bis-content">
<h2 id="unite2bis">3. Installation et Migration (USMT)</h2>

<h3 id="usmt-theory">1. Théorie : La migration de profil</h3>

Lors d'un renouvellement de poste, le technicien doit transférer les données de l'utilisateur. Microsoft fournit l'outil **USMT (User State Migration Tool)** pour automatiser ce processus à grande échelle.

**Fonctionnement en deux étapes :**
1. **`scanstate`** : Capture les fichiers, les paramètres Windows et les profils sur l'ancien PC.
2. **`loadstate`** : Restaure ces données sur le nouveau PC.

<h3 id="winpe">2. WinPE (Preinstallation Environment)</h3>

C'est un Windows minimaliste utilisé pour lancer l'installation, capturer des images ou réparer un système qui ne démarre plus.

**Pratique : Capturer un profil avec USMT**

```cmd
# Exemple de commande scanstate pour capturer vers un partage réseau
scanstate \\Serveur\Migration\Store /i:migapp.xml /i:miguser.xml /o /c
```
**Explication** : `/i` spécifie les fichiers XML de règles de migration, `/o` autorise l'écrasement, `/c` continue en cas d'erreur non critique.

</section>

<section id="unite3-content">
<h2 id="unite3">4. Gestion du Stockage et Fichiers</h2>

<h3 id="partitionnement">1. Standard de table de partitions</h3>

Avant de formater, on définit comment le disque est structuré.

| Critère | MBR (Ancien) | GPT (Moderne) |
| :--- | :--- | :--- |
| **Taille Max** | 2 To | Pratiquement illimitée |
| **Partitions** | 4 principales max | Jusqu'à 128 |
| **Boot** | BIOS Classique | **UEFI** (Requis Windows 11) |
| **Résilience** | Faible | Excellente (tables dupliquées) |

<h3 id="filesystem">2. Systèmes de fichiers</h3>

| Système | Usage | Points forts |
| :--- | :--- | :--- |
| **FAT32** | Périphériques amovibles | Compatible partout, mais limite fichiers à 4 Go. |
| **NTFS** | Disques internes Windows | **Sécurité ACL**, Journalisation, Compression. |
| **ReFS** | Serveurs de stockage | Résilience aux corruptions, mais pas de droits fins. |

**Pratique : Lister les disques et leur style**

```powershell
# Vérifier si les disques utilisent MBR ou GPT
Get-Disk | Select-Object Number, FriendlyName, PartitionStyle
```
**Résultat attendu :**
```text
Number FriendlyName          PartitionStyle
------ ------------          --------------
0      Samsung SSD 970 EVO   GPT
```

</section>

<section id="unite4-content">
<h2 id="unite4">5. Utilisateurs, Groupes et Profils</h2>

<h3 id="accounts">1. Comptes & SID (Security Identifier)</h3>

Windows n'identifie pas un utilisateur par son nom (`admin`), mais par son **SID**, un identifiant unique (ex : `S-1-5-21...`). 
> [!IMPORTANT]
> Supprimer puis recréer un utilisateur avec le même nom génère un **nouveau SID**. Les accès liés à l'ancien compte seront perdus.

**Types de comptes :**
- **Local** : Valide uniquement sur la machine.
- **Domaine** : Géré par l'Active Directory, valide sur tout le parc.
- **Microsoft** : Lié à un compte en ligne (Outlook/Azure AD).

<h3 id="profiles">2. Le Profil Utilisateur</h3>

Il contient l'environnement personnel (Bureau, Documents, AppData).
- **Chemin par défaut** : `C:\Users\%USERNAME%`.
- **Registre** : La configuration utilisateur est stockée dans la ruche `NTUSER.DAT` (devient `HKEY_CURRENT_USER` à la connexion).

**Pratique : Lister les comptes locaux**

```powershell
# Afficher la liste des utilisateurs de la machine
Get-LocalUser
```
**Résultat attendu :**
```text
Name               Enabled  Description
----               -------  -----------
Administrateur     False    Compte d'administrateur...
Jean-Marc          True     Technicien Support
```

</section>

<section id="unite5-content">
<h2 id="unite5">6. Sécurité NTFS et Partage</h2>

<h3 id="ntfs-acl">1. ACL et Héritage</h3>

La sécurité NTFS repose sur l'**ACL** (Access Control List), composée d'entrées nommées **ACE** (Access Control Entry).

**Règles d'or :**
- Le **Refus explicite** est toujours prioritaire sur une **Autorisation**.
- **Héritage** : Par défaut, un fichier hérite des droits du dossier parent.

| Opération | Même Partition | Différentes Partitions |
| :--- | :--- | :--- |
| **Déplacement** | Conserve ses droits | Hérite de la destination |
| **Copie** | Hérite de la destination | Hérite de la destination |

<h3 id="sharing">2. Le Partage Réseau</h3>

L'accès à un dossier via le réseau (`\\SRV-FILE\Data`) cumule deux filtres :
1. Les droits de **Partage**.
2. Les droits **NTFS**.

> [!TIP]
> **Droit final = Le plus restrictif des deux.** 
> *Exemple : Partage (Contrôle total) + NTFS (Lecture seule) = L'utilisateur ne peut que lire.*

**Pratique : Créer un partage sécurisé**

```powershell
# Créer un dossier et le partager
New-Item -Path "C:\Partage_Interne" -ItemType Directory
New-SmbShare -Name "Donnees" -Path "C:\Partage_Interne" -FullAccess "Utilisateurs du domaine"
```
**Résultat attendu :** Le dossier est accessible via le chemin UNC `\\NomDuPC\Donnees`.

</section>

<section id="unite6-content">
<h2 id="unite6">7. Bureau à distance (RDP)</h2>

Le protocole **RDP (Remote Desktop Protocol)** permet d'ouvrir une session complète à distance.

- **Port** : **3389** (TCP).
- **Sécurité NLA (Network Level Authentication)** : Oblige l'utilisateur à s'authentifier *avant* d'ouvrir la session graphique (protection contre les DoS).
- **Accès** : Les utilisateurs doivent être membres du groupe local **Utilisateurs du Bureau à distance**.

**Pratique : Lancer une connexion rapide**
```cmd
# Outil MSTSC.exe
mstsc /v:192.168.1.50 /f
```
**Explication** : `/v` spécifie le serveur, `/f` lance en mode plein écran.

</section>

<section id="unite7-content">
<h2 id="unite7">8. Impression et Spouleur</h2>

En entreprise, on utilise souvent des **imprimantes réseau** (IP fixe) centralisées sur un serveur d'impression.

- **Spouleur** : Service `spooler` qui stocke temporairement les documents en file d'attente.
- **Pool d'impression** : Une seule imprimante logique liée à plusieurs périphériques physiques identiques (répartition de charge).

**Pratique : Débloquer une impression**
Si les documents ne sortent plus, redémarrer le service est souvent la solution :
```cmd
net stop spooler
net start spooler
```
**Résultat attendu :** La file d'attente est réinitialisée et le service tente de renvoyer les documents vers le matériel physique.

</section>

<section id="unite8-content">
<h2 id="unite8">9. Maintenance et Diagnostic</h2>

Le technicien dispose d'outils intégrés pour identifier les goulots d'étranglement :

| Outil | Commande | Usage |
| :--- | :--- | :--- |
| **Gestionnaire des tâches** | `taskmgr` | Vue rapide CPU/RAM/Disque et arrêt de processus. |
| **Observateur d'événements**| `eventvwr` | Analyse des erreurs système et applications. |
| **Moniteur de ressources**  | `resmon` | Vue détaillée (quel fichier utilise mon disque ?). |
| **Performance Monitor**     | `perfmon` | Graphiques en temps réel et logs historiques. |

**WinRE (Windows Recovery Environment)** : Environnement accessible si Windows ne démarre pas (Maintenir `Maj` + `Redémarrer`). Il permet de restaurer le système ou d'accéder à l'invite de commande.

</section>

<section id="unite9-content">
<h2 id="unite9">10. Déploiement : Sysprep et DISM</h2>

Pour installer Windows sur 50 postes, on utilise une **image de référence** (Master).

1. **Masterisation** : On installe un PC, on le configure et on installe les logiciels.
2. **Généralisation (Sysprep)** : Étape cruciale qui réinitialise le **SID** et le nom du PC.
3. **Capture** : On utilise **DISM** pour transformer le disque en fichier `.wim`.

**Pratique : Capturer une image avec DISM**
```cmd
dism /Capture-Image /ImageFile:D:\master.wim /CaptureDir:C:\ /Name:"Master_Windows_TSSR"
```
**Résultat attendu :** Un fichier `master.wim` est créé, prêt à être déployé via **WDS** ou une clé USB.

</section>

<section id="unite10-content">
<h2 id="unite10">11. Le Registre Windows</h2>

C'est la base de données centrale de configuration de Windows. Elle est divisée en **Ruches** :

- **HKLM (Local Machine)** : Paramètres globaux du PC et du matériel.
- **HKCU (Current User)** : Paramètres de l'utilisateur connecté.

**Lien avec les GPO** : Les stratégies de groupe ne sont que des scripts automatisés qui viennent modifier des clés spécifiques dans le registre.

**Pratique : Lire une valeur de registre**
```powershell
# Vérifier la version de Windows via le registre
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName
```
**Résultat attendu :**
```text
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion
    ProductName    REG_SZ    Windows 10 Pro
```

</section>
