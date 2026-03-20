---
id: "services-microsoft"
title: "Services Microsoft"
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
            <li><a href="#unite1">1. Administration Windows Server</a>
                <ol>
                    <li><a href="#srv-theory">Théorie : Le rôle du serveur</a></li>
                    <li><a href="#srv-concept">Concepts : Éditions et Modes</a></li>
                    <li><a href="#srv-context">Le choix du socle technique</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Active Directory (AD DS)</a>
                <ol>
                    <li><a href="#ad-theory">Théorie : L'annuaire centralisé</a></li>
                    <li><a href="#ad-concept">Architecture et Maîtres d'opérations</a></li>
                    <li><a href="#ad-context">L'enjeu de la haute disponibilité</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Utilisateurs, Groupes et AGDLP</a>
                <ol>
                    <li><a href="#agdlp-theory">Théorie : Gestion des identités</a></li>
                    <li><a href="#agdlp-logic">La stratégie AGDLP</a></li>
                    <li><a href="#agdlp-context">Pourquoi appliquer AGDLP ?</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Stratégies de Groupe (GPO)</a>
                <ol>
                    <li><a href="#gpo-theory">Théorie : Administration centralisée</a></li>
                    <li><a href="#gpo-logic">Ordre de priorité (LSDOU)</a></li>
                    <li><a href="#gpo-context">L'intérêt des GPO en entreprise</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Le Service DHCP</a>
                <ol>
                    <li><a href="#dhcp-theory">Théorie : Adressage automatique</a></li>
                    <li><a href="#dhcp-concept">Mécanique DORA et Options</a></li>
                    <li><a href="#dhcp-context">Architectures et Haute Disponibilité</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. Le Service DNS</a>
                <ol>
                    <li><a href="#dns-theory">Théorie : La résolution de noms</a></li>
                    <li><a href="#dns-concept">Hiérarchie, Zones et Records</a></li>
                    <li><a href="#dns-context">Diagnostic et Performance DNS</a></li>
                </ol>
            </li>
            <li><a href="#unite7">7. Gestion des Impressions</a>
                <ol>
                    <li><a href="#print-theory">Théorie : Centralisation des flux</a></li>
                    <li><a href="#print-concept">Optimisation des spouleurs</a></li>
                    <li><a href="#print-context">Maintenance et continuité d'impression</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Administration Windows Server</h2>

<h3 id="srv-theory">Théorie : Le rôle du système serveur</h3>
<p>Contrairement à un système client (Windows 10/11) optimisé pour l'usage quotidien d'un utilisateur, Windows Server est conçu pour héberger des services critiques et fournir des ressources partagées. Sa priorité absolue est la <strong>disponibilité (uptime)</strong>, la <strong>sécurité</strong> et la <strong>stabilité</strong> sous forte charge.</p>

| Critère | Système client | Système serveur |
|---|---|---|
| **Public cible** | Utilisateur final | Techniciens / Services réseau |
| **Interface** | Graphique (Desktop) | Optionnelle (Server Core) |
| **Ressources** | Consommateur | **Fournisseur (Producteur)** |

<h3 id="srv-concept">Concepts : Éditions et Modes d'installation</h3>
<p>Le déploiement d'un serveur Windows repose sur deux choix stratégiques qui impactent les coûts et la maintenance.</p>

- **Édition Standard** : La plus fréquente, idéale pour les serveurs de fichiers ou AD. Elle permet d'exécuter jusqu'à **deux instances virtuelles** sur une machine physique.
- **Édition Datacenter** : Conçue pour la virtualisation massive (Cloud privé, Hyper-V clusters). Elle offre un nombre illimité de machines virtuelles.
- **Server Core** : Version sans interface graphique (GUI). Elle est plus légère, nécessite moins de mises à jour et réduit considérablement la surface d'attaque.

<h3 id="srv-context">Le choix du socle technique en entreprise</h3>
<p>En tant qu'administrateur TSSR, choisir le bon socle est la première étape d'une infrastructure robuste :</p>

- **Uptime et Stabilité** : Utiliser **Server Core** en production permet de réduire les redémarrages liés aux patchs de sécurité de l'interface graphique. L'administration se fait à distance via les consoles **RSAT** ou PowerShell.
- **Pérennité du stockage** : L'utilisation systématique de la table de partition **GPT** (GUID Partition Table) est indispensable pour supporter les volumes de stockage supérieurs à 2 To et garantir la compatibilité avec les systèmes UEFI modernes.
- **Modularité** : Windows Server fonctionne par **Rôles** (service rendu : AD, DNS) et **Fonctionnalités** (outils de support : .NET Framework, Backup). La règle d'or est de n'installer que le strict nécessaire pour limiter les failles.

</section>

<section id="unite2-content">
<h2 id="unite2">2. Active Directory Domain Services (AD DS)</h2>

<h3 id="ad-theory">Théorie : L'annuaire et ses protocoles</h3>
<p>L'Active Directory est l'épine dorsale des réseaux Microsoft. Il centralise les identités (utilisateurs, ordinateurs) dans une base de données unique, permettant une authentification unique (**Single Sign-On**) sur l'ensemble du parc.</p>

Ces mécanismes s'appuient sur trois protocoles standard :
- **LDAP** : Pour la communication et la recherche dans l'annuaire.
- **DNS** : Pour la résolution de noms (Si le DNS tombe, l'authentification échoue).
- **Kerberos** : Pour la sécurité des échanges via un système de tickets.

<h3 id="ad-concept">Architecture et Maîtres d'opérations (FSMO)</h3>
<p>L'AD est organisé hiérarchiquement en <strong>Forêts</strong>, <strong>Domaines</strong> et <strong>Unités d'Organisation (OU)</strong>. Pour éviter les conflits lors de modifications critiques, cinq rôles spécifiques, appelés <strong>FSMO</strong>, sont répartis sur les contrôleurs de domaine.</p>

| Rôle FSMO | Niveau | Mission critique |
| :--- | :--- | :--- |
| **Émulateur PDC** | Domaine | Gestion du temps, des mots de passe et priorité GPO. |
| **Maître RID** | Domaine | Attribution d'identifiants uniques (SID) aux objets. |
| **Infrastructure** | Domaine | Mise à jour des liens entre objets de domaines différents. |
| **Maître de Schéma** | Forêt | Modification de la structure même de la base AD. |
| **Nommage** | Forêt | Ajout ou suppression de domaines dans la forêt. |

<h3 id="ad-context">L'enjeu de la haute disponibilité Active Directory</h3>
<p>En entreprise, l'Active Directory ne doit jamais reposer sur un seul serveur. La perte de l'annuaire signifie l'arrêt total des accès aux fichiers et aux applications.</p>

- **Redondance des contrôleurs (DC)** : On déploie systématiquement au moins deux contrôleurs de domaine. La réplication se charge de synchroniser les données entre eux.
- **Continuité de service** : En cas de panne prolongée d'un serveur détenant un rôle FSMO (notamment le PDC), le technicien doit savoir "se saisir" (**Seize**) manuellement du rôle pour le transférer sur un serveur sain et rétablir l'administration.
- **Sécurisation DNS** : Les contrôleurs de domaine étant leurs propres serveurs DNS, la vérification de la zone `_msdcs` (qui contient les enregistrements SRV des services) est l'étape numéro 1 de tout diagnostic de connexion.

</section>

<section id="unite3-content">
<h2 id="unite3">3. Utilisateurs, Groupes et AGDLP</h2>

<h3 id="agdlp-theory">Théorie : Gestion des identités et accès</h3>
<p>L'administration d'un parc de centaines d'utilisateurs rend impossible l'attribution de droits individuels. Le technicien utilise des groupes pour appliquer une politique de sécurité cohérente et évolutive.</p>

<h3 id="agdlp-logic">Concepts : Le modèle AGDLP</h3>
<p>La règle d'or de Microsoft pour la gestion des droits est la méthode <strong>AGDLP</strong>. Elle sépare le métier de l'utilisateur de la configuration technique de la ressource.</p>

<div style="display: flex; align-items: center; gap: 2rem; margin: 1.5rem 0; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 300px;">
        <ul>
            <li><strong>A</strong> (Accounts) : Utilisateurs.</li>
            <li><strong>G</strong> (Global Group) : Groupes <strong>métiers</strong> (ex: GG_RH, GG_COMMERCIAL).</li>
            <li><strong>DL</strong> (Domain Local) : Groupes de <strong>ressources</strong> (ex: DL_DATA_READ, DL_DATA_MODIFY).</li>
            <li><strong>P</strong> (Permissions) : Droits réels appliqués sur le dossier (NTFS).</li>
        </ul>
        <p>La logique est simple : <strong>Accounts</strong> vont dans un <strong>Global Group</strong>, qui va dans un <strong>Domain Local</strong>, qui possède les <strong>Permissions</strong>.</p>
    </div>
    <div style="flex: 1; min-width: 300px; display: flex; justify-content: center;">
        <img src="../../../image/Service%20microsoft/privilege.png" alt="Privilèges et Groupes" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
    </div>
</div>

<h3 id="agdlp-context">Pourquoi appliquer la stratégie AGDLP ?</h3>
<p>Le déploiement de cette méthode répond à des besoins de maintenance et d'audit critiques pour un administrateur réseau :</p>

- **Évolutivité (Scalability)** : Si un utilisateur change de service, vous ne modifiez pas les dossiers. Vous changez simplement son appartenance au groupe Global (G). Les droits sur les ressources (DL) suivent automatiquement.
- **Simplicité d'Audit** : En regardant les membres d'un groupe DL (ex: "Accès Compta Lecture"), on voit immédiatement quels services (groupes G) ont accès à la donnée, sans avoir à analyser chaque fichier manuellement.
- **Performance de réplication** : L'imbrication de groupes réduit le trafic de réplication dans les environnements multi-sites par rapport à l'ajout successif d'utilisateurs individuels.

</section>

<section id="unite4-content">
<h2 id="unite4">4. Stratégies de Groupe (GPO)</h2>

<h3 id="gpo-theory">Théorie : Administration centralisée du parc</h3>
<p>Les <strong>GPO (Group Policy Objects)</strong> permettent d'uniformiser la configuration des postes de travail et de renforcer la sécurité sans intervention physique de la part du technicien. Elles agissent comme un script de configuration massif et dynamique.</p>

<h3 id="gpo-logic">Concepts : Hiérarchie d'application (LSDOU)</h3>
<p>Windows applique les GPO dans un ordre précis. En cas de conflit de paramètres, la règle de la dernière appliquée est celle qui gagne.</p>

**Ordre d'application :** Local ➔ Site ➔ Domaine ➔ Unité d'Organisation (OU)

- **L**ocale : Stratégie propre au poste (la plus faible).
- **S**ite : Liée au site physique AD (rare).
- **D**omaine : Paramètres globaux (ex: stratégie de mots de passe).
- **O**U (Unité d'Organisation) : Paramètres ciblés. S'il y a des sous-OU, c'est l'**OU la plus proche** de l'objet qui gagne.

<h3 id="gpo-context">L'intérêt des GPO en entreprise</h3>
<p>Le déploiement des GPO permet de répondre à des enjeux de sécurité et d'automatisation majeurs :</p>

- **Conformité & Durcissement (Hardening)** : Verrouiller les ports USB, désactiver le panneau de configuration ou imposer une complexité de mot de passe sur tout le parc en une seule opération.
- **Expérience Utilisateur** : Mapper automatiquement les lecteurs réseau (M:, S:) et les imprimantes dès l'ouverture de session, assurant que l'utilisateur retrouve son environnement sur n'importe quel poste du domaine.
- **Maintenance à distance** : Forcer la mise à jour des paramètres avec la commande `gpupdate /force` ou auditer les conflits avec `gpresult /r` pour diagnostiquer pourquoi une règle ne s'applique pas.

</section>

<section id="unite5-content">
<h2 id="unite5">5. Le Service DHCP (Adressage Dynamique)</h2>

<h3 id="dhcp-theory">Théorie : L'automatisation de la configuration IP</h3>
<p>Le DHCP (Dynamic Host Configuration Protocol) est le service qui distribue automatiquement les paramètres réseau aux machines. Sans lui, chaque poste devrait être configuré manuellement, ce qui est impossible à gérer sur un parc d'entreprise.</p>

Il transmet quatre informations vitales :
1. **Adresse IP** et **Masque de sous-réseau**.
2. **Passerelle par défaut** (Routeur).
3. **Serveurs DNS** (pour la résolution de noms).
4. **Suffixe DNS** (nom du domaine local).

<h3 id="dhcp-concept">Mécanique DORA et Concepts Clés</h3>

**Le Processus DORA**
C'est le dialogue en quatre étapes entre le client et le serveur :
- **D**iscover ➔ **O**ffer ➔ **R**equest ➔ **A**cknowledge.

| Concept | Définition technique |
| :--- | :--- |
| **Bail (Lease)** | Durée pendant laquelle l'IP est prêtée (par défaut 8 jours). Le client doit la renouveler à 50% du temps. |
| **Étendue (Scope)** | Plage d'adresses distribuables (ex: 192.168.1.50 à .200). |
| **Éxclusions** | Adresses dans l'étendue qu'on ne donne jamais (réservées aux serveurs en IP fixe). |
| **Réservations** | On force une IP spécifique pour une machine (via son **adresse MAC**). |

<h3 id="dhcp-context">Architectures et Haute Disponibilité</h3>
<p>En tant qu'administrateur, la panne du DHCP paralyse l'arrivée de nouveaux postes sur le réseau. Deux solutions sont privilégiées :</p>

- **Relais DHCP (DHCP Relay Agent)** : Comme le DHCP fonctionne par "broadcast" (diffusion), il ne traverse pas les routeurs. On configure un relais sur le routeur pour transmettre les requêtes vers un serveur central situé dans un autre réseau.
- **Basculement DHCP (Failover)** : Depuis Windows Server 2012, on synchronise deux serveurs. Si l'un tombe, le second prend le relais de manière transparente, garantissant qu'aucun client ne se retrouve en IP APIPA (169.254.x.x).
- **Options DHCP** : On utilise les options pour pousser des configurations spécifiques (Option 3 pour le Routeur, Option 6 pour le DNS). Cela permet de modifier la passerelle de tout un service en une seule modification sur le serveur.

</section>

<section id="unite6-content">
<h2 id="unite6">6. Le Service DNS (Résolution de Noms)</h2>

<h3 id="dns-theory">Théorie : L'annuaire du réseau</h3>
<p>Le DNS (Domain Name System) traduit les noms compréhensibles par l'humain (ex: <code>srv-ad01.labo.local</code>) en adresses IP utilisées par les machines. C'est le service le plus critique : <strong>si le DNS est en panne, l'Active Directory est invisible.</strong></p>

<h3 id="dns-concept">Hiérarchie, Zones et Enregistrements (Records)</h3>
<p>Le DNS fonctionne de manière hiérarchique, de la racine (root) vers les domaines spécifiques.</p>

**Les types d'enregistrements indispensables :**
- **A** (Nom ➔ IP) : Le plus courant.
- **CNAME** : Un alias pour pointer vers un autre nom.
- **MX** : Pour localiser le serveur de messagerie du domaine.
- **SRV** : **Vital pour Windows** : permet de localiser les contrôleurs de domaine (Kerberos, LDAP).
- **PTR** : L'inverse (IP ➔ Nom), utilisé dans les <strong>Zones de recherche inversée</strong>.

**Zones de recherche :**
- **Directe** : On cherche l'IP à partir du Nom.
- **Inversée** : On cherche le Nom à partir de l'IP (essentiel pour les logs et la sécurité).

<h3 id="dns-context">Diagnostic et Performance DNS</h3>
<p>Le dépannage DNS est le quotidien du TSSR. Voici les points de contrôle "Expert" :</p>

- **Ordre de résolution** : Windows regarde d'abord son **Cache local**, puis son fichier **Hosts**, et enfin interroge le **Serveur DNS**. Vider le cache (`ipconfig /flushdns`) est souvent le premier réflexe de diagnostic.
- **Redirecteurs** : Pour que vos serveurs résolvent les noms Internet sans exposer tout l'annuaire, on configure des <strong>redirecteurs</strong> vers des DNS publics sécurisés (8.8.8.8, 1.1.1.1).
- **Transfert de zone (Maître/Esclave)** : Pour la haute disponibilité, on duplique la zone sur un serveur esclave (en lecture seule). En environnement AD, ce processus est remplacé par la <strong>réplication intégrée à l'annuaire</strong>, plus sûre et automatique.

```text
Ordre de résolution Windows :
Cache local ➔ Fichier Hosts ➔ Serveur DNS
```

</section>

<section id="unite7-content">
<h2 id="unite7">7. Gestion des Impressions</h2>

<h3 id="print-theory">Théorie : Centralisation des flux et des pilotes</h3>
<p>Le serveur d'impression agit comme un mandataire. Il reçoit les documents des clients, les stocke dans une file d'attente (Spoule) et les envoie à l'imprimante physique quand elle est prête.</p>

<h3 id="print-concept">Optimisation des spouleurs et Pools</h3>
<p>L'administration centralisée permet d'offrir une flexibilité impossible à gérer poste par poste.</p>

- **Pool d'imprimantes** : On regroupe plusieurs imprimantes physiques identiques derrière un seul nom logique. Le serveur répartit la charge automatiquement entre les machines disponibles.
- **Isolement des pilotes** : Le serveur d'impression Windows Server permet d'isoler les pilotes (drivers). Si le pilote d'une imprimante plante, il ne fait pas tomber l'intégralité du service d'impression pour les autres utilisateurs.

<h3 id="print-context">Maintenance et continuité d'impression</h3>
<p>En entreprise, l'impression reste un service critique souvent sujet à incidents.</p>

- **Diagnostic rapide** : Le premier réflexe face à une file d'attente bloquée est le redémarrage du service **Spouleur d'impression** (Spooler). Cela vide les fichiers temporaires et réinitialise les connexions réseau vers les imprimantes.
- **Publication dans l'annuaire** : Lister les imprimantes dans l'Active Directory permet à l'utilisateur de les trouver "en un clic" via son explorateur, sans avoir à connaître l'adresse IP de la machine physique.
- **Gestion des droits** : Utiliser les permissions (Imprimer, Gérer les documents, Gérer l'imprimante) permet de déléguer la gestion des déblocages de papier ou d'encre à des référents de service sans leur donner de droits administrateur.

</section>
