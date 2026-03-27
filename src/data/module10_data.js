export const module10 = {
  id: 'services-reseaux-linux',
  title: 'Services Réseaux Linux',
  description: 'Configuration réseau, routage, NAT, SSH, DHCP et DNS sous Linux',
  icon: '🌐',
  color: '#eab308',
  flashcards: [
    { id: 'fc1', front: 'Quel est le préfixe d\'une interface Ethernet dans le nommage prévisible ?', back: 'en* (ex: ens33, enp2s0)' },
    { id: 'fc2', front: 'Quel outil en ligne de commande pilote NetworkManager ?', back: 'nmcli' },
    { id: 'fc3', front: 'Dans quel fichier configure-t-on traditionnellement les interfaces sous Debian ?', back: '/etc/network/interfaces' },
    { id: 'fc4', front: 'Quel fichier est interrogé en premier pour la résolution locale avant le DNS ?', back: '/etc/hosts' },
    { id: 'fc5', front: 'Quel fichier défini les serveurs DNS à interroger par la machine ?', back: '/etc/resolv.conf' },
    { id: 'fc6', front: 'Avec quelle commande affiche-t-on la table de routage sur Linux ?', back: 'ip route show (ou route -n)' },
    { id: 'fc7', front: 'Quel paramètre du noyau (sysctl) active le routage entre interfaces ?', back: 'net.ipv4.ip_forward=1' },
    { id: 'fc8', front: 'Quel type de NAT permet au réseau LAN de sortir sur Internet ?', back: 'SNAT (Source NAT) ou Masquerade' },
    { id: 'fc9', front: 'Quel type de NAT est utilisé pour publier un serveur Web interne sur Internet ?', back: 'DNAT (Destination NAT) ou Port Forwarding' },
    { id: 'fc10', front: 'Quel est le port SSH par défaut ?', back: 'Port 22 (TCP)' },
    { id: 'fc11', front: 'Quelle commande génère une paire de clés SSH ?', back: 'ssh-keygen' },
    { id: 'fc12', front: 'Dans quel dossier d\'un utilisateur SSH stocke-t-il sa clé privée ?', back: '~/.ssh/' },
    { id: 'fc13', front: 'Sur quels ports fonctionne le protocole DHCP ?', back: 'Ports UDP 67 (Serveur) et 68 (Client)' },
    { id: 'fc14', front: 'Quel composant permet aux requêtes DHCP de traverser un routeur ?', back: 'Le DHCP Relay' },
    { id: 'fc15', front: 'Dans BIND9, quel enregistrement DNS lie une IP à un nom (résolution inverse) ?', back: 'L\'enregistrement PTR' }
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Depuis Debian 9, que signifie l\'interface "ens33" ?',
      options: ['Une carte Wi-Fi', 'Une interface Ethernet (nommage prévisible)', 'Une boucle locale', 'Un composant virtuel de Docker'],
      correctIndex: 1,
      explanation: 'Le préfixe "en" désigne Ethernet et le nommage est basé sur l\'emplacement matériel (ex: slot 33).'
    },
    {
      id: 'q2',
      question: 'Quelle commande permet de modifier une configuration réseau via NetworkManager ?',
      options: ['ifconfig', 'ip link edit', 'nmcli connection modify', 'netstat -m'],
      correctIndex: 2,
      explanation: 'NetworkManager est géré en ligne de commande grâce à nmcli.'
    },
    {
      id: 'q3',
      question: 'Quel est le rôle du paramètre "net.ipv4.ip_forward=1" ?',
      options: ['Autoriser les requêtes ICMP', 'Transformer le serveur en routeur capable d\'acheminer des paquets', 'Bloquer le spoofing IP', 'Activer le Network Address Translation'],
      correctIndex: 1,
      explanation: 'Ce paramètre autorise le noyau à faire suivre les paquets d\'une interface à une autre.'
    },
    {
      id: 'q4',
      question: 'Quelle directive permet à iptables de translater l\'adresse IP source d\'un client LAN vers l\'IP publique ?',
      options: ['-j DNAT', '-j MASQUERADE', '-j DROP', '-j FORWARD'],
      correctIndex: 1,
      explanation: 'MASQUERADE est une forme de SNAT particulièrement adaptée quand l\'IP publique est dynamique.'
    },
    {
      id: 'q5',
      question: 'Quel est l\'outil recommandé pour transférer sa clé publique SSH vers un serveur distant ?',
      options: ['ssh-copy-id', 'scp', 'ftp', 'ssh-add'],
      correctIndex: 0,
      explanation: 'ssh-copy-id ajoute automatiquement et proprement votre clé publique dans le fichier authorized_keys du serveur distant.'
    },
    {
      id: 'q6',
      question: 'Quelle ligne dans "sshd_config" permet d\'interdire purement et simplement la connexion avec un mot de passe ?',
      options: ['DenyPasswords true', 'PasswordAuthentication no', 'UsePAM no', 'AuthType keys-only'],
      correctIndex: 1,
      explanation: 'PasswordAuthentication no force les utilisateurs à utiliser une paire de clés cryptographiques.'
    },
    {
      id: 'q7',
      question: 'Que permet de résoudre un enregistrement PTR dans un DNS ?',
      options: ['Un nom vers une IP système', 'Un alias vers un autre nom (CNAME)', 'Une adresse IP vers un nom complet (FQDN)', 'L\'adresse du serveur de messagerie (MX)'],
      correctIndex: 2,
      explanation: 'Le pointeur (PTR) est utilisé pour effectuer des requêtes DNS inverses (ex: d\'une IP vers un hostname).'
    },
    {
      id: 'q8',
      question: 'Quel fichier centralise la configuration d\'une zone locale DNS sous BIND9 Debian ?',
      options: ['/etc/resolv.conf', '/etc/bind/named.conf.local', '/var/named.default', '/etc/dnsmasq.conf'],
      correctIndex: 1,
      explanation: '/etc/bind/named.conf.local est le fichier destiné à recevoir les configurations de vos zones (maîtres ou esclaves).'
    },
    {
      id: 'q9',
      question: 'Quelles sont les quatre étapes de l\'échange DHCP (dans l\'ordre) ?',
      options: ['Demande, Offre, Requête, Validation', 'Discover, Offer, Request, Acknowledge', 'Ping, Pong, Syn, Ack', 'Solicit, Advertise, Request, Reply'],
      correctIndex: 1,
      explanation: 'DORA : Discover (Client), Offer (Serveur), Request (Client), Acknowledge (Serveur).'
    },
    {
      id: 'q10',
      question: 'Quel fichier indique au système la priorité entre le fichier "/etc/hosts" et le DNS distant ?',
      options: ['/etc/resolv.conf', '/etc/network/interfaces', '/etc/nsswitch.conf', '/etc/hostname'],
      correctIndex: 2,
      explanation: '/etc/nsswitch.conf définit l\'ordre de résolution, typiquement "hosts: files dns".'
    },
    {
      id: 'q11',
      question: 'Quelle directive du démon DHCP "isc-dhcp-server" accélère le traitement des refus (NAK) pour éviter qu\'un client n\'insiste avec une IP hors réseau ?',
      options: ['fast-nak;', 'authoritative;', 'strict-mode;', 'force-renew;'],
      correctIndex: 1,
      explanation: 'authoritative; indique que ce DHCP est le maître légitime du réseau et lui permet de rejeter agressivement des demandes non conformes.'
    },
    {
      id: 'q12',
      question: 'En architecture DNS, à quoi sert le mécanisme d\' "allow-transfer" ?',
      options: ['À transférer la zone vers un serveur DNS secondaire pour créer de la redondance', 'À autoriser les transferts de fichiers FTP', 'À rediriger le trafic HTTP', 'À relayer les requêtes du réseau invité'],
      correctIndex: 0,
      explanation: 'Le transfert de zone permet de cloner la base DNS du serveur primaire vers le serveur distant secondaire, pour la tolérance aux pannes.'
    }
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Plage DHCP Dynamique',
      stars: 1,
      description: 'Distribuer des adresses au VLAN Étudiants.',
      instruction: 'Scénario : Votre serveur DHCP doit délivrer des adresses au VLAN 20. Quelle directive de configuration dans `/etc/dhcp/dhcpd.conf` permet de définir la plage de 192.168.20.50 à 192.168.20.100 ?',
      hint: 'Utilisez le mot-clé "range".',
      correction: 'range 192.168.20.50 192.168.20.100;',
      explanation: 'La directive range définit les bornes (début et fin) du pool d\'adressage dynamique géré par le démon isc-dhcp-server.'
    },
    {
      id: 'ex2',
      title: 'Relais DHCP Inter-VLAN',
      stars: 2,
      description: 'Aider les clients à trouver le serveur.',
      instruction: 'Scénario : Le serveur DHCP est centralisé sur un LAN différent du client. Quel fichier de configuration Debian permet d\'activer le "Relais DHCP" en précisant les interfaces d\'écoute ?',
      hint: 'C\'est un fichier dans /etc/default/.',
      correction: '/etc/default/isc-dhcp-relay',
      explanation: 'Ce fichier configure le démon relayeur pour qu\'il transmette les requêtes broadcast DHCP des clients vers le serveur unicast distant.'
    },
    {
      id: 'ex3',
      title: 'Déclaration de Zone Master BIND',
      stars: 2,
      description: 'Enregistrer un nouveau domaine local.',
      instruction: 'Scénario : Vous voulez créer le domaine "campus.lan" sur votre serveur BIND9. Écrivez le bloc de définition de zone (type maître) à insérer dans `named.conf.local`.',
      hint: 'Utilisez zone "domaine" { type master; file "..."; };',
      correction: 'zone "campus.lan" { type master; file "/etc/bind/db.campus.lan"; };',
      explanation: 'Cette structure indique à BIND qu\'il est l\'autorité principale (master) pour ce domaine et pointe vers le fichier d\'enregistrements.'
    },
    {
      id: 'ex4',
      title: 'Validation de Zone DNS',
      stars: 2,
      description: 'Vérifier la syntaxe du fichier de zone.',
      instruction: 'Scénario : Vous venez de modifier le fichier `/etc/bind/db.demo.lan`. Quelle commande permet de vérifier que ce fichier pour la zone "demo.lan" n\'a pas d\'erreur de syntaxe avant de redémarrer BIND ?',
      hint: 'Utilisez l\'utilitaire named-checkzone.',
      correction: 'named-checkzone demo.lan /etc/bind/db.demo.lan',
      explanation: 'Cette commande vérifie la structure du fichier SOA, les points finaux et les numéros de série pour éviter les pannes de service.'
    },
    {
      id: 'ex5',
      title: 'Sécurisation SSH Hardening',
      stars: 3,
      description: 'Désactiver totalement l\'authentification par mot de passe.',
      instruction: 'Scénario : Pour bloquer les attaques par force brute, vous décidez d\'interdire les mots de passe sur SSH. Quel paramètre du fichier `/etc/ssh/sshd_config` devez-vous passer à "no" ?',
      hint: 'C\'est le paramètre PasswordAuthentication.',
      correction: 'PasswordAuthentication no',
      explanation: 'En désactivant cette directive, le serveur SSH exigera obligatoirement une clé cryptographique valide pour autoriser la connexion.'
    },
    {
      id: 'm10_ex-gen',
      title: 'Expert Services Linux (Générateur)',
      stars: 5,
      description: 'Générateur de scénarios sur les services vitaux : SSH, DHCP, BIND9.',
      isGenerator: true,
      scenarios: [
        {
          instruction: 'Scénario : Un client Linux n\'obtient plus d\'IP via DHCP. Vous soupçonnez le serveur DHCP d\'être arrêté. Quelle commande permet de vérifier le statut du service `isc-dhcp-server` ?',
          hint: 'Utilisez systemctl.',
          correction: 'systemctl status isc-dhcp-server',
          explanation: '`systemctl status` est la commande universelle pour interroger l\'état d\'un service sous Linux moderne (systemd).'
        },
        {
          instruction: 'Scénario : Vous voulez tester si votre serveur DNS BIND9 répond bien localement pour le domaine `tssr.lan`. Quelle commande utilisez-vous ?',
          hint: 'On utilise dig ou nslookup.',
          correction: 'dig @localhost tssr.lan',
          explanation: 'L\'utilisation de `@localhost` force dig à interroger le serveur DNS tournant sur la machine locale.'
        },
        {
          instruction: 'Scénario : Un utilisateur ne peut pas se connecter en SSH alors que sa clé publique a été ajoutée. Les logs disent "Authentication refused: bad ownership or modes for directory /home/user/.ssh". Quel chmod appliquer au dossier .ssh ?',
          hint: 'Le dossier .ssh doit être très sécurisé (rwx------).',
          correction: 'chmod 700 /home/user/.ssh',
          explanation: 'SSH refuse de fonctionner si le répertoire contenant les clés est accessible par d\'autres utilisateurs (droits trop permissifs).'
        }
      ]
    }
  ]
};

