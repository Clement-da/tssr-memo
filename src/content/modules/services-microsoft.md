---
id: "services-microsoft"
title: "Services Microsoft (AD, DNS, DHCP)"
icon: "🪟"
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
            <li><a href="#admin-windows">1. Administration Windows Server</a>
                <ol>
                    <li><a href="#admin-versions">Versions et éditions</a></li>
                    <li><a href="#admin-modes">Modes d'installation</a></li>
                    <li><a href="#admin-roles">Rôles et fonctionnalités</a></li>
                </ol>
            </li>
            <li><a href="#stockage">2. Gestion du stockage</a>
                <ol>
                    <li><a href="#stockage-mbr">Table de partition : MBR ou GPT</a></li>
                    <li><a href="#stockage-base">Disque dynamique</a></li>
                </ol>
            </li>
            <li><a href="#ad">3. L'Active Directory (AD DS)</a>
                <ol>
                    <li><a href="#ad-proto">Protocoles fondamentaux</a></li>
                    <li><a href="#ad-foret">Forêt et domaines</a></li>
                    <li><a href="#ad-fsmo">Contrôleurs et FSMO</a></li>
                </ol>
            </li>
            <li><a href="#objets-ad">4. Objets et groupes AD</a>
                <ol>
                    <li><a href="#objets-utilisateurs">Utilisateurs et ordinateurs</a></li>
                    <li><a href="#objets-groupes">Les groupes</a></li>
                    <li><a href="#objets-ou">Unités d'Organisation</a></li>
                </ol>
            </li>
            <li><a href="#agdlp">5. Méthode AGDLP et NTFS</a>
                <ol>
                    <li><a href="#ntfs-partage">NTFS vs Partage</a></li>
                </ol>
            </li>
            <li><a href="#impression">6. Serveur d'impression</a>
                <ol>
                    <li><a href="#impression-pool">Pool d'imprimantes</a></li>
                </ol>
            </li>
            <li><a href="#gpo">7. Stratégies de groupe (GPO)</a>
                <ol>
                    <li><a href="#gpo-ciblage">Liaison et ciblage</a></li>
                </ol>
            </li>
            <li><a href="#dhcp">8. Service DHCP</a>
                <ol>
                    <li><a href="#dhcp-dora">Le processus DORA</a></li>
                    <li><a href="#dhcp-excl">Exclusions et réservations</a></li>
                </ol>
            </li>
            <li><a href="#dns">9. Service DNS</a>
                <ol>
                    <li><a href="#dns-hierarchie">La hiérarchie DNS</a></li>
                    <li><a href="#dns-enregistrements">Enregistrements DNS</a></li>
                    <li><a href="#dns-serveurs">Serveur primaire et secondaire</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="admin-windows-content">
<h2 id="admin-windows">1. Administration Windows Server</h2>

Les environnements Microsoft distinguent les systèmes clients des systèmes serveurs. Un système client (Windows 10/11) est conçu pour l'utilisateur final : ergonomie et réactivité. Un système serveur (Windows Server 2022) privilégie la stabilité, la sécurité et la disponibilité continue.

> Un serveur peut fonctionner sans interface graphique, sans écran et sans clavier, mais pas sans connexion réseau.

<h3 id="admin-versions">Versions et éditions</h3>
Les versions (2016, 2019, 2022) marquent l'évolution dans le temps. Les éditions définissent les droits d'utilisation :

- **Standard** : couvre la majorité des besoins réseau (AD, DNS, DHCP, fichiers).
- **Datacenter** : orientée virtualisation massive, avec un nombre illimité de machines virtuelles.

<h3 id="admin-modes">Modes d'installation</h3>

- **Server Core** : installation minimale sans interface graphique. Plus sécurisée, moins gourmande en ressources. C'est le standard en production.
- **Interface graphique (GUI)** : confort visuel habituel. Recommandée pour l'apprentissage.

<h3 id="admin-roles">Rôles et fonctionnalités</h3>
Windows Server fonctionne de manière modulaire :

- Un **rôle** est un service majeur rendu au réseau (ex : Active Directory, DNS, serveur de fichiers).
- Une **fonctionnalité** est un composant secondaire ou un outil de support (ex : client Telnet, sauvegarde Windows Server).

> **Bonne pratique :** n'installer que les rôles strictement nécessaires à la mission du serveur.

</section>

<section id="stockage-content">
<h2 id="stockage">2. Gestion du stockage : partitionnement et volumes</h2>

<h3 id="stockage-mbr">Table de partition : MBR ou GPT</h3>

| Caractéristique | MBR | GPT |
| --- | --- | --- |
| **Partitions max** | 4 principales (ou 3 + 1 étendue) | Jusqu'à 128 principales |
| **Standard** | Ancien | Moderne, recommandé |
| **Tolérance aux pannes** | Faible | Améliorée |

> Les lecteurs logiques MBR servent au stockage de données, mais ne peuvent pas héberger un système d'exploitation. GPT est aujourd'hui la norme.

<h3 id="stockage-base">Disque de base vs disque dynamique</h3>

- **Disque de base** : fonctionne avec MBR ou GPT. Stable, adapté aux installations standards.
- **Disque dynamique** : remplace les partitions par des volumes. Permet le RAID logiciel natif Windows et l'extension d'un espace sur plusieurs disques physiques.

> En environnement serveur, le système de fichiers standard est NTFS.

</section>

<section id="ad-content">
<h2 id="ad">3. L'Active Directory (AD DS)</h2>

L'Active Directory est un service d'annuaire qui centralise l'authentification et l'administration d'un réseau Microsoft. Sans AD, chaque machine doit être gérée individuellement.

<h3 id="ad-proto">Les trois protocoles fondamentaux</h3>

- **DNS** : permet de localiser les services et les contrôleurs de domaine. Sans DNS, l'AD ne fonctionne pas.
- **LDAP** : organise et interroge les objets de la base de données.
- **Kerberos** : protocole d'authentification basé sur des tickets chiffrés.

> **Prérequis avant d'installer l'AD :** nom de machine définitif, adresse IP fixe, service DNS opérationnel.

<h3 id="ad-foret">Forêt et domaines</h3>

- Le **domaine** regroupe machines, utilisateurs et stratégies de sécurité partageant la même base de données.
- La **forêt** est le niveau le plus large : elle contient un ou plusieurs domaines.

![Composant d'un domaine](../../../image/Service%20microsoft/composant-domaine.png)

<h3 id="ad-fsmo">Contrôleurs de domaine et rôles FSMO</h3>
Les contrôleurs de domaine (DC) hébergent l'AD et valident les connexions. Dans un grand réseau, cinq rôles uniques appelés FSMO sont attribués à des DC spécifiques :

| Rôle | Portée | Fonction principale |
| --- | --- | --- |
| **Maître de schéma** | Forêt | Autorise les modifications de la structure de la base AD |
| **Maître d'attribution de noms** | Forêt | Gère l'ajout/suppression de domaines dans la forêt |
| **Maître RID** | Domaine | Distribue des blocs d'identifiants (SID) aux DC |
| **Maître d'infrastructure** | Domaine | Synchronise les références entre domaines |
| **Émulateur PDC** | Domaine | Gère les mots de passe, les GPO et l'heure réseau (NTP) |

> L'émulateur PDC est le rôle FSMO le plus critique au quotidien. Un décalage d'horloge peut bloquer l'authentification Kerberos.

</section>

<section id="objets-ad-content">
<h2 id="objets-ad">4. Objets et groupes AD</h2>

<h3 id="objets-utilisateurs">Utilisateurs et ordinateurs</h3>
Chaque utilisateur et chaque machine du réseau possède un compte dans l'AD, identifié par un identifiant unique mondial appelé SID.

<h3 id="objets-groupes">Les groupes</h3>

- **Groupes de sécurité** : regroupent les utilisateurs par rôle ou département. Ils permettent d'attribuer ou de restreindre les droits d'accès à des ressources (dossiers partagés, etc.).
- **Groupes de distribution** : utilisés uniquement pour la messagerie (listes d'envoi d'e-mails). Ils n'ont aucun effet sur les permissions réseau.

> **Bonne pratique :** on n'accorde jamais de droits directement à un utilisateur. On l'ajoute dans un groupe, et c'est le groupe qui reçoit les droits.

<h3 id="objets-ou">Unités d'Organisation (OU)</h3>
Une OU est un conteneur hiérarchique dans l'annuaire AD. Elle permet de trier les objets (utilisateurs, machines) par département ou fonction, et de leur appliquer des GPO (stratégies de groupe).

![Unité d'organisation](../../../image/Service%20microsoft/unite-organisation.png)
</section>

<section id="agdlp-content">
<h2 id="agdlp">5. Méthode AGDLP et NTFS</h2>

AGDLP est la méthode recommandée par Microsoft pour structurer les accès à un serveur de fichiers :

- **A — Account** : les comptes utilisateurs individuels (ex : alice.martin).
- **G — Groupe Global** : regroupe les utilisateurs par rôle métier à l'échelle de l'entreprise (ex : GG_Comptabilite).
- **DL — Groupe de Domaine Local** : représente une action sur une ressource précise (ex : GDL_ProjetX_Modification). Le groupe global y est ajouté.
- **P — Permissions** : le groupe DL reçoit les permissions NTFS sur le dossier cible.

![Privilège](../../../image/Service%20microsoft/privilege.png)

<h3 id="ntfs-partage">NTFS vs Partage : la règle du plus restrictif</h3>
Un dossier partagé est soumis à deux niveaux de permissions :
1. Les permissions de partage (réseau)
2. Les permissions NTFS (disque)

> Quand un utilisateur accède à un dossier à distance, Windows applique les deux niveaux et retient la permission la plus restrictive. Un refus explicite écrase tous les autres droits, même un contrôle total.

</section>

<section id="impression-content">
<h2 id="impression">6. Serveur d'impression</h2>

Un serveur d'impression centralise la gestion des imprimantes du réseau. Il gère les pilotes, les files d'attente (spools) et le déploiement automatique vers les postes clients, sans intervention manuelle sur chaque machine.

<h3 id="impression-pool">Pool d'imprimantes</h3>
Un pool d'imprimantes relie plusieurs imprimantes identiques sous une seule icône partagée. Les utilisateurs voient une seule imprimante, mais le serveur répartit automatiquement les tâches sur les équipements disponibles. Utile dans les environnements à fort volume d'impression.
</section>

<section id="gpo-content">
<h2 id="gpo">7. Stratégies de groupe (GPO)</h2>

Un GPO (Group Policy Object) est un ensemble de paramètres appliqués automatiquement à un ensemble de machines ou d'utilisateurs. Il est géré depuis la console GPMC.

Exemples de ce qu'un GPO peut faire :

- Imposer un fond d'écran
- Bloquer l'accès aux ports USB
- Déployer des applications au démarrage

<h3 id="gpo-ciblage">Liaison et ciblage</h3>
Un GPO est créé indépendamment, puis lié à une OU. Il s'applique alors à tous les objets contenus dans cette OU (utilisateurs, machines), quel que soit leur nombre.
</section>

<section id="dhcp-content">
<h2 id="dhcp">8. Service DHCP</h2>

Le DHCP (Dynamic Host Configuration Protocol) distribue automatiquement les paramètres réseau (adresse IP, masque, passerelle, DNS) aux machines qui se connectent. Cela évite toute configuration manuelle.

<h3 id="dhcp-dora">Le processus DORA</h3>

| Étape | Émetteur | Message |
| --- | --- | --- |
| **Discover** | Client | "Y a-t-il un serveur DHCP sur le réseau ?" (broadcast) |
| **Offer** | Serveur | "Voici une adresse IP disponible." |
| **Request** | Client | "J'accepte cette offre." |
| **Acknowledge** | Serveur | "C'est confirmé. Bail accordé." |

<h3 id="dhcp-excl">Exclusions et réservations</h3>

- **Exclusion** : plage d'adresses retirée de la distribution automatique (ex : adresses réservées aux serveurs statiques).
- **Réservation** : associe une adresse IP fixe à l'adresse MAC d'un équipement précis. Cet équipement recevra toujours la même IP.

![Etendue DHCP](../../../image/Service%20microsoft/etendue-dhcp.png)
</section>

<section id="dns-content">
<h2 id="dns">9. Service DNS</h2>

Le DNS (Domain Name System) traduit les noms de domaine lisibles (ex : <code>www.example.com</code>) en adresses IP (ex : <code>155.67.55.1</code>), et inversement.

<h3 id="dns-hierarchie">La hiérarchie DNS</h3>

```text
. (racine)
└── .com / .fr / .org  (TLD)
    └── example.com    (domaine)
        └── www        (hôte)
```

> Chaque niveau ne connaît que le niveau suivant. Il renvoie la requête vers le bon serveur jusqu'à résolution finale.

![Hiérarchie DNS](../../../image/Service%20microsoft/hierarchie-dns.png)

<h3 id="dns-enregistrements">Les principaux enregistrements DNS</h3>

| Type | Rôle |
| --- | --- |
| **A / AAAA** | Associe un nom à une adresse IPv4 / IPv6 |
| **CNAME** | Alias pointant vers un autre nom (ex : <code>www</code> → <code>serveur01</code>) |
| **MX** | Indique le serveur de messagerie du domaine |
| **SRV** | Localise les services AD (contrôleurs de domaine, etc.) |

<h3 id="dns-serveurs">Serveur primaire et secondaire</h3>

- **Serveur primaire** : contient la zone DNS en lecture/écriture. C'est la source officielle des enregistrements.
- **Serveur secondaire** : copie en lecture seule du serveur primaire. Assure la disponibilité en cas de panne du primaire.

</section>
