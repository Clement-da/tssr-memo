---
id: "rds_wds_mdt"
title: "RDS, WDS, MDT"
icon: "🖥️"
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
            <li><a href="#unite1">1. Vue d'ensemble</a>
                <ol>
                    <li><a href="#transverse-role">Le rôle des services transverses</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. RDS (Remote Desktop Services)</a>
                <ol>
                    <li><a href="#rds-theory">Théorie : Le Client Léger</a></li>
                    <li><a href="#rds-roles">Les Rôles RDS</a></li>
                    <li><a href="#rds-remoteapp">RemoteApp vs Bureau Complet</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. WDS (Windows Deployment Services)</a>
                <ol>
                    <li><a href="#wds-theory">Théorie : Déploiement réseau (PXE)</a></li>
                    <li><a href="#wds-images">Les types d'images WIM</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. MDT (Microsoft Deployment Toolkit)</a>
                <ol>
                    <li><a href="#mdt-theory">Théorie : Automatisation post-installation</a></li>
                    <li><a href="#wds-mdt-compare">WDS vs WDS + MDT</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Études de cas : Déploiement</a>
                <ol>
                    <li><a href="#scenario-wds">Scénario 1 : WDS seul</a></li>
                    <li><a href="#scenario-mdt">Scénario 2 : WDS + MDT</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Vue d'ensemble</h2>

<h3 id="transverse-role">Le rôle des services transverses</h3>
<p>Les services transverses Microsoft (RDS, WDS, MDT) ont pour objectif de simplifier et d'industrialiser la gestion des postes et des accès utilisateurs en entreprise. Ils permettent de centraliser des tâches critiques pour gagner du temps, renforcer la sécurité et garantir des environnements homogènes.</p>

<p>Ces trois services interviennent à des moments différents du cycle de vie d'un poste :</p>

| Service | Moment d'intervention | Rôle principal |
| :--- | :--- | :--- |
| **WDS** | Installation initiale | Déployer Windows via le réseau |
| **MDT** | Post-installation | Automatiser la configuration et les logiciels |
| **RDS** | Utilisation quotidienne | Fournir des bureaux ou des apps à distance |

</section>

<hr />

<section id="unite2-content">
<h2 id="unite2">2. RDS (Remote Desktop Services)</h2>

<h3 id="rds-theory">Théorie : Le concept de Client Léger</h3>
<p>Le RDS permet de faire tourner les applications et l'OS sur un <strong>serveur central</strong> puissant. L'utilisateur utilise un appareil peu coûteux (client léger) pour afficher l'image et envoyer les clics de souris. Tout le calcul se fait sur le serveur.</p>

<h3 id="rds-roles">Les 5 Rôles principaux d'une ferme RDS</h3>

| Rôle | Nom technique | Fonction |
| :--- | :--- | :--- |
| **Hôte de session** | RD Session Host | Le serveur qui héberge réellement les bureaux et les apps. |
| **Broker** | RD Connection Broker | Le "cerveau" : il dirige l'utilisateur vers sa session. |
| **Passerelle** | RD Gateway | Permet l'accès sécurisé depuis Internet (via HTTPS). |
| **Accès Web** | RD Web Access | Portail web permettant de cliquer sur son icône de bureau. |
| **Licence** | RD Licensing | Gère les CAL (licences d'accès) obligatoires. |

<h3 id="rds-remoteapp">RemoteApp vs Bureau Complet</h3>

- **Bureau Complet** : L'utilisateur a l'impression d'être sur un Windows de bureau classique, mais tout est virtuel.
- **RemoteApp** : L'application (ex: Excel) semble installée sur le PC de l'utilisateur, mais elle s'exécute réellement sur le serveur RDS. C'est transparent pour l'utilisateur.

</section>

<hr />

<section id="unite3-content">
<h2 id="unite3">3. WDS (Windows Deployment Services)</h2>

<h3 id="wds-theory">Théorie : Le déploiement par le réseau (PXE)</h3>
<p>WDS évite au technicien d'utiliser des clés USB pour chaque PC. Le PC démarre via sa carte réseau (boot **PXE**), récupère une adresse IP via DHCP, puis télécharge l'installeur Windows depuis le serveur WDS.</p>

<h3 id="wds-images">Les types d'images (.WIM)</h3>

| Type d'image | Rôle |
| :--- | :--- |
| **Boot Image** | Le "WinPE" qui permet de lancer l'interface d'installation. |
| **Install Image** | Le fichier qui contient réellement Windows (le système d'exploitation). |
| **Capture Image** | Un outil pour transformer un PC déjà configuré en image réutilisable. |

</section>

<hr />

<section id="unite4-content">
<h2 id="unite4">4. MDT (Microsoft Deployment Toolkit)</h2>

<h3 id="mdt-theory">Théorie : L'automatisation post-installation</h3>
<p>MDT vient compléter WDS. Là où WDS installe Windows, MDT s'occupe de la suite : nommer le PC, l'intégrer au domaine, installer Office, Chrome, l'antivirus et les drivers spécifiques. Il utilise pour cela des **Task Sequences**. </p>

<h3 id="wds-mdt-compare">Pourquoi coupler WDS et MDT ?</h3>

| Solution | Ce qu'elle installe | Résultat final |
| :--- | :--- | :--- |
| **WDS seul** | Windows pur ("Bare OS") | Le technicien doit finir la config à la main. |
| **WDS + MDT** | Windows + Apps + Config | Le PC est prêt à l'emploi (ZTI - Zero Touch Installation). |

</section>

<hr />

<section id="unite5-content">
<h2 id="unite5">5. Études de cas : Déploiement</h2>

<h3 id="scenario-wds">Scénario 1 : WDS seul (Installation basique)</h3>
<p>Utile pour une petite structure où les postes sont hétérogènes. On déploie une image brute, et le technicien installe manuellement les logiciels spécifiques du service comptabilité par exemple.</p>

<h3 id="scenario-mdt">Scénario 2 : WDS + MDT (Déploiement industriel)</h3>
<p>Idéal pour un renouvellement de parc de 15 postes identiques. On lance l'installation via le réseau, on choisit le "Bundle" d'applications approprié, et on laisse MDT configurer les 15 postes en parallèle sans intervention humaine.</p>

</section>
