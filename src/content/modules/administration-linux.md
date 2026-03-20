---
id: "administration-linux"
title: "Administration Linux"
icon: "🐧"
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
            <li><a href="#unite1">1. Introduction & Arborescence</a>
                <ol>
                    <li><a href="#intro-theory">La philosophie Linux</a></li>
                    <li><a href="#intro-concept">Navigation : pwd, cd, ls</a></li>
                    <li><a href="#intro-context">Linux dans l'infrastructure</a></li>
                </ol>
            </li>
            <li><a href="#unite2">2. Manipulation de Fichiers</a>
                <ol>
                    <li><a href="#file-theory">Le cycle de vie du fichier</a></li>
                    <li><a href="#file-concept">CRUD : cp, mv, rm, touch</a></li>
                    <li><a href="#file-read">Lecture : cat, less, tail -f</a></li>
                </ol>
            </li>
            <li><a href="#unite3">3. Droits & Permissions</a>
                <ol>
                    <li><a href="#rights-theory">Le modèle UGO (User-Group-Other)</a></li>
                    <li><a href="#rights-concept">Changer les droits : chmod, chown</a></li>
                    <li><a href="#rights-context">Sécurisation et privilèges</a></li>
                </ol>
            </li>
            <li><a href="#unite4">4. Gestion Système & Réseau</a>
                <ol>
                    <li><a href="#sys-theory">Processus et Ressources</a></li>
                    <li><a href="#sys-net">Diagnostic Réseau : ip, ping, ss</a></li>
                    <li><a href="#sys-context">Dépannage de service</a></li>
                </ol>
            </li>
            <li><a href="#unite5">5. Stockage & Archivage</a>
                <ol>
                    <li><a href="#disk-theory">Analyse de l'espace disque</a></li>
                    <li><a href="#disk-archive">Sauvegarde : tar et gzip</a></li>
                    <li><a href="#disk-context">Gestion des alertes de saturation</a></li>
                </ol>
            </li>
            <li><a href="#unite6">6. Puissance du Flux (Pipeline)</a>
                <ol>
                    <li><a href="#pipe-theory">L'enchaînement des commandes (|)</a></li>
                    <li><a href="#pipe-concept">Filtrage : grep, awk, sed</a></li>
                    <li><a href="#pipe-context">Extraction de données métier</a></li>
                </ol>
            </li>
        </ol>
    </div>
</nav>

<section id="unite1-content">
<h2 id="unite1">1. Introduction & Arborescence</h2>

<h3 id="intro-theory">Théorie : La philosophie "Tout est fichier"</h3>
<p>Linux repose sur un principe fondamental : <strong>tout est considéré comme un fichier</strong>. Un répertoire, un disque dur, une interface réseau ou même un processus sont représentés à travers l'arborescence. Cette approche permet d'utiliser des outils de texte universels pour administrer l'ensemble du système.</p>

<h3 id="intro-concept">Navigation : pwd, cd, ls</h3>
<p>Se déplacer dans l'arborescence Linux nécessite de comprendre la différence entre <strong>chemin absolu</strong> (depuis la racine <code>/</code>) et <strong>chemin relatif</strong> (depuis le dossier actuel).</p>

| Commande | Action technique | Exemple |
| :--- | :--- | :--- |
| **`pwd`** | Affiche le répertoire courant | `pwd` ➔ `/etc/network` |
| **`cd`** | Change de répertoire | `cd ~` (home), `cd ..` (parent) |
| **`ls -la`** | Liste le contenu (détails + cachés) | `ls -lh /var/log` |

<h3 id="intro-context">Expertise : Le choix de Linux dans l'infrastructure</h3>
<p>En entreprise, Linux (Debian, Ubuntu Server, Rocky Linux) est privilégié pour sa stabilité légendaire et sa faible consommation de ressources. Un technicien expert privilégie l'administration par SSH : absence d'interface graphique pour réduire la surface d'attaque et automatisation facilitée par script.</p>

</section>

<section id="unite2-content">
<h2 id="unite2">2. Manipulation de Fichiers & Lecture</h2>

<h3 id="file-theory">Théorie : Le cycle de vie d'un objet</h3>
<p>La manipulation de fichiers est l'action la plus répétitive. Il ne s'agit pas seulement de copier des données, mais de gérer leur emplacement pour respecter la norme <strong>FHS</strong> (Filesystem Hierarchy Standard). Ex: Les fichiers de configuration se trouvent dans <code>/etc</code>, les logs dans <code>/var/log</code>.</p>

<h3 id="file-concept">Commandes de gestion (CRUD)</h3>

| Commande | Action technique | Usage recommandé |
| :--- | :--- | :--- |
| **`touch`** | Crée un fichier vide. | Tester les droits d'écriture ou initier un log. |
| **`cp -r`** | Copie récursive de répertoires. | Sauvegarde locale d'un dossier de config. |
| **`mv`** | Déplacement ou renommage. | Mise à jour de version ou archivage simple. |
| **`rm -rf`** | Suppression forcée et récursive. | **Danger critique** : à n'utiliser qu'avec certitude. |

<h3 id="file-read">Lecture de fichiers et analyse de logs</h3>
<p>Lire un fichier doit se faire avec l'outil adapté à sa taille :</p>

| Outil | Usage idéal | Touche clé |
| :--- | :--- | :--- |
| **`cat`** | Fichiers très courts. | - |
| **`less`** | Navigation dans les fichiers longs. | `q` (quitter), `/` (chercher) |
| **`tail -f`** | **Surveillance en temps réel (logs).** | `Ctrl+C` (arrêter) |

> **Mise en situation :** Un utilisateur ne parvient pas à se connecter. Vous lancez `tail -f /var/log/auth.log` pour voir l'erreur de connexion s'afficher instantanément.

</section>

<section id="unite3-content">
<h2 id="unite3">3. Droits & Permissions</h2>

<h3 id="rights-theory">Théorie : Le modèle UGO (User-Group-Other)</h3>
<p>La sécurité Linux repose sur l'attribution de droits (Read, Write, eXecute) à trois types d'entités :
1. **U**ser (Propriétaire)
2. **G**roup (Groupe propriétaire)
3. **O**thers (Le reste du monde)</p>

<h3 id="rights-concept">Modification des droits : chmod et chown</h3>
<p>L'administration des droits peut se faire en mode chiffre (octal) pour plus de rapidité.</p>

| Valeur | Droits | Signification |
| :--- | :--- | :--- |
| **7** | `rwx` | Tout autorisé |
| **6** | `rw-` | Lecture et écriture |
| **5** | `r-x` | Lecture et exécution |
| **4** | `r--` | Lecture seule |
| **0** | `---` | Aucun droit |

```bash
# Exemple concret
chmod 600 id_rsa          # Seul le propriétaire peut lire sa clé privée
chown www-data:www-data /var/www  # Attribue le dossier au serveur Web
```

<h3 id="rights-context">Expertise : Le principe du moindre privilège</h3>
<p>Un administrateur responsable n'utilise <strong>root</strong> que lorsque c'est strictement nécessaire (via `sudo`). Pour un fichier sensible (ex: configuration de base de données), le droit recommandé est `600` ou `640` pour éviter que d'autres utilisateurs de la machine ne puissent lire les mots de passe.</p>

</section>

<section id="unite4-content">
<h2 id="unite4">4. Gestion Système & Réseau</h2>

<h3 id="sys-theory">Théorie : Processus et Gestion des Ressources</h3>
<p>Chaque action sur Linux est un processus identifié par un **PID**. Un service qui plante ou une application qui consomme trop de RAM doit être identifiée et isolée par l'administrateur.</p>

| Commande | Rôle | Option utile |
| :--- | :--- | :--- |
| **`ps aux`** | Instantané de tous les processus. | `grep` pour filtrer un service. |
| **`top`** | Vue interactive (CPU/RAM). | `M` pour trier par mémoire. |
| **`kill -9`** | Arrêt forcé (signal SIGKILL). | Utilise le **PID** du processus. |

<h3 id="sys-net">Diagnostic Réseau : ip, ping, ss</h3>
<p>Le réseau sous Linux s'administre principalement via la suite d'outils `iproute2`.</p>

| Commande | Mission | Intérêt technique |
| :--- | :--- | :--- |
| **`ip a`** | Analyse des interfaces. | Vérifier l'IP et l'état (UP/DOWN). |
| **`ss -tuln`** | Analyse des ports. | Vérifier l'écoute (80, 443, 22). |
| **`ping`** | Test de connectivité. | Vérifier la liaison vers une IP/Nom. |

<h3 id="sys-context">Mise en pratique : Diagnostic d'un service injoignable</h3>

Si un site web sur votre serveur Linux ne répond pas, suivez cet ordre de diagnostic :

1.  **`ip a`** : L'adresse IP est-elle bien configurée sur la bonne interface ?
2.  **`ss -lntup | grep :80`** : Le serveur web (Apache/Nginx) écoute-t-il bien sur le port 80 ?
3.  **`systemctl status apache2`** : Le service système est-il bien actif (running) ?

</section>

<section id="unite5-content">
<h2 id="unite5">5. Stockage & Archivage</h2>

<h3 id="disk-theory">Analyse de l'espace et saturation</h3>
<p>Une partition pleine (100%) peut provoquer l'arrêt brutal des services (impossible d'écrire des logs ou des bases de données).</p>

| Commande | Fonction | Scénario |
| :--- | :--- | :--- |
| **`df -h`** | État global des partitions. | "Mon disque est-il plein ?" |
| **`lsblk`** | Arborescence des disques. | "Où est ma nouvelle partition ?" |
| **`du -sh`** | Taille d'un répertoire spécifique. | "Quel dossier consomme le plus ?" |

<h3 id="disk-archive">Archivage et Compression : tar et gzip</h3>
<p>Pour transférer des données ou faire des sauvegardes rapides, on utilise `tar`.</p>

| Commande | Action | Usage professionnel |
| :--- | :--- | :--- |
| **`tar -czvf backup.tar.gz /etc`** | Archiver + Compresser | Créer un backup de configuration |
| **`tar -xzvf archive.tar.gz`** | Extraire | Déployer une application archivée |

<h3 id="disk-context">Le rôle du technicien face à la saturation</h3>
<p>Face à un disque plein, la première action est d'identifier les gros fichiers avec `du -sh` puis de vider les fichiers temporaires ou de compresser les anciens logs avec `gzip`. **Ne jamais supprimer un fichier système sans backup préalable.**</p>

</section>

<section id="unite6-content">
<h2 id="unite6">6. Puissance du Flux (Pipeline)</h2>

<h3 id="pipe-theory">Théorie : L'enchaînement de commandes (|)</h3>
<p>Le "Pipe" est la force brute de Linux. Il permet d'envoyer la sortie d'une commande vers l'entrée d'une autre. L'administrateur devient capable de créer ses propres outils de diagnostic à la volée.</p>

<h3 id="pipe-concept">Filtrage et Transformation : grep, awk, sed</h3>

| Outil | Action principale | Exemple d'usage |
| :--- | :--- | :--- |
| **`grep`** | Recherche de motifs | Filtrer les erreurs dans un log. |
| **`cut`** | Extraction de colonnes | Isoler les noms d'utilisateurs. |
| **`awk`** | Traitement avancé | Calculer des sommes ou filtrer par champ. |
| **`sed`** | Édition de flux | Remplacer un mot sans ouvrir le fichier. |

<h3 id="pipe-context">Exemple expert : Extraction de données</h3>
<p>Le cas pratique suivant permet d'afficher uniquement les utilisateurs système ayant le shell <strong>Bash</strong> actif (en ignorant les comptes de service) :</p>

```bash
cat /etc/passwd | grep "/bin/bash" | cut -d':' -f1
```

<p>Cette commande permet d'isoler une information précise malgré les milliers de lignes potentielles d'un fichier système complexe.</p>

</section>
