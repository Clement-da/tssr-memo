export const module13 = {
    id: 'messagerie',
    title: 'Messagerie (SMTP, IMAP, POP3)',
    description: 'Protocoles standards, rôles fondamentaux (MUA, MTA, MDA) et trajet d\'un e-mail en entreprise.',
    icon: '✉️',
    color: '#f59e0b',
    flashcards: [
        {
            front: "Que signifie le sigle MTA et quel est son rôle principal ?",
            back: "MTA : Mail Transfer Agent. C'est le serveur relais responsable d'acheminer l'e-mail d'un serveur d'envoi vers un autre serveur (via Internet par ex)."
        },
        {
            front: "Quelle est la principale différence entre le rôle d'un MUA et d'un MDA ?",
            back: "Le MUA (Mail User Agent) est le logiciel client pour les utilisateurs (Outlook, Thunderbird). Le MDA (Mail Delivery Agent) dépose physiquement l'e-mail reçu dans le fichier utilisateur/boîte mail sur le serveur."
        },
        {
            front: "Quel est le port réseau par défaut pour le SMTP simple entre les serveurs relais ?",
            back: "Port TCP 25."
        },
        {
            front: "Quels rôles respectifs pour 587 et 465 en messagerie ?",
            back: "Tous deux concernent SMTP mais côté SOUmission des clients (MSA) : port 587 demande un STARTTLS sécurisé ; alors que le port 465 utilise une connexion TLS en direct et est plus ancien."
        },
        {
            front: "Différence principale sur la rétention des mails côté serveur : IMAP4 versus POP3 ?",
            back: "POP3 télécharge généralement le message localement et le supprime du serveur. IMAP4 effectue une vraie synchronisation ; l'original réside sur le serveur et reste disponible partout."
        },
        {
            front: "Comment le serveur MTA expéditeur connaît-il la bonne adresse IP pour joindre le serveur de messagerie du domaine destinataire ?",
            back: "Il effectue d'abord une requête dans le serveur DNS pour interroger le fameux enregistrement MX (Mail eXchange), qui retourne l'IP de livraison."
        },
        {
            front: "À quoi sert principalement l'enregistrement SPF (Sender Policy Framework) dans l'écosystème du courriel ?",
            back: "C'est un mécanisme de sécurité et d'authentification ajoutée dans les DNS : il spécifie publiquement, au moyen d'IP répertoriées, quels serveurs sont légitimement autorisés à envoyer des e-mails pour ou de la part d'un domaine donné."
        },
        {
            front: "Quels sont les ports par défaut d'IMAP et IMAPs (sécurisé via SSL/TLS) ?",
            back: "IMAP (Non chiffré) = Port 143. IMAPS (Chiffré) = Port 993."
        },
        {
            front: "Dans l'architecture de la messagerie en entreprise, souvent une 'DMZ' est évoquée. Pourquoi ?",
            back: "Un serveur relais de messagerie exposé (SMTP/Frontal) est situé dans la DMZ afin d'isoler l'impact et la compromission pour bloquer ou vérifier la légitimité externe du courrier entrant avant son cheminement sécurisé vers le cœur du réseau LAN interne."
        },
        {
            front: "Acronymes MAPI et ActiveSync : Envers quel serveur d'entreprise est employé ce type de communication modernisée ?",
            back: "Le serveur Exchange (Microsoft) utilise le MAPI (ou RPC over HTTPS) pour les fonctionnalités riches sous Outlook, et ActiveSync pour les tablettes/smartphones mobiles. Les deux via le port 443."
        }
    ],
    quiz: [
        {
            question: "Dans le cheminement SMTP, quelle étape s'ensuit immédiatement lorsque le MUA finit de composer l'e-mail et appuie sur 'Envoyer' ?",
            options: ["Le MUA envoie directement par l'Internet public via 143.", "Le protocole POP3 copie l'ordre vers le destinataire.", "Le MUA transmet le message vers son agent initial de soumission, le MSA (Port 587/465).", "Le MDA chiffre le fichier et le range dans la base LDIF."],
            correctIndex: 2,
            explanation: "Le client final (MUA) envoie toujours son message sortant à son agent MSA localement, qui le transmet plus outre en relais (MTA)."
        },
        {
            question: "La couche réseau impliquée dans la récupération standard des courriels par votre client lourd Outlook peut utiliser :",
            options: ["Le protocole TFTP", "Le protocole IMAP v4 sur le port TCP 993 en version chiffrée", "Le protocole SMTP sur le port TCP 25", "Le protocole ICMP sur HTTPS"],
            correctIndex: 1,
            explanation: "Tandi que SMTP pousse le message à expédier, la récupération pour la lecture par l'utilisateur se fait au travers des requêtes d'accès comme IMAP4 (sécurisé, port 993) ou MAPI."
        },
        {
            question: "Qu'est ce que permet le protocole LDAP (Port TCP 389) dans l'architecture Microsoft Exchange ?",
            options: ["Faire interroger l'annuaire d'Active Directory par Microsoft Exchange ou d'autres MTA internes pour statuer des destinataires ou informations sur chaque compte de la boîte e-mail correspondante.", "Empêcher le Spam par balisage et chiffrement.", "Synchroniser et expédier un message via la 4G.", "Transférer un email local vers le routeur externe."],
            correctIndex: 0,
            explanation: "LDAP (Lightweight Directory Access Protocol) interagit directement avec d'autres serveurs pour renvoyer des données relatives aux annuaires et aux utilisateurs/comptes."
        },
        {
            question: "Si l'un des collègues possède un appareil mobile pour synchroniser la messagerie 'crepes.pdl' et la synchronisation ne s'effectue plus car le port principal web HTTPS qui transmet les données est saturé, quel est ce port ?",
            options: ["443", "80", "25", "2525"],
            correctIndex: 0,
            explanation: "L'accès Webmail ou ActiveSync (Mobile) utilisent le HTTP en version sécurisée HTTPS via le port global TCP 443."
        },
        {
            question: "Qu'est ce que contrôle généralement le rôle MTA interne après l'étape du pare-feu et en amont de finaliser la livraison locale ?",
            options: ["La qualité visuelle ASCII.", "S'il doit déchiffrer via RDP sur IMAP.", "Il passe par des analyses de sécurité : réputation de l'expéditeur, antivirus et anti-spam.", "Il sauvegarde l'email dans l'enregistrement MX externe."],
            correctIndex: 2,
            explanation: "Le relais MTA, qui travaille souvent aux côtés d'appliances ou filtrages en DMZ, scrupule l'anomalie dans le transport avant son acheminent intérieur finale vers l'instance de domaine cible."
        },
        {
            question: "Micheline (crepes.pdl) reçoit un mail suspect avec un domaine forgé. Quelle entrée vitale DNS dans le cas du MUA destinataire le relais de pare-feu va-t-il questionner afin d'indiquer si l'IP de l'expéditeur a l'autorisation requise ?",
            options: ["Enregistrement A", "Enregistrement CNAME", "Enregistrement PTR", "Enregistrement SPF"],
            correctIndex: 3,
            explanation: "Le Sender Policy Framework (SPF) fournit spécifiquement l'indication anti-usurpation via son type .TXT dans les serveurs de Noms de domaine (DNS)."
        },
        {
            question: "Quelles initiales et description définissent le MUA ?",
            options: ["Mail Upload Apparatus (Routeur de mail sortant)", "Managed Uniform Access (Serveur SQL des Mails)", "Mail User Agent (Client de messagerie exemple : Outlook ou l'Application Web Mail de Gmail)", "Message Unverified Attempt (Processus Antispam)"],
            correctIndex: 2,
            explanation: "C'est l'interface applicative et finale destinée aux utilisateurs (Le Client : MUA)."
        },
        {
            question: "Pour les utilisateurs qui lisent ou utilisent Thunderbird d'anciens FAI qui recommandent le protocole POP3 en version non sécurisée (Historique) ; le port concerné est ?",
            options: ["TCP 110", "UDP 25", "TCP 143", "TCP 587"],
            correctIndex: 0,
            explanation: "POP3 (Post Office Protocol v3) s'effectuait par défaut sur le port 110. Il écoute son équivalent TLS (sécurisé) sur le port TCP 995."
        },
        {
            question: "Avant l'existence des pare-feux anti-courrier-indésirable hyper modernisés au point de sécurité d'entrée du réseau (en zone de DMZ). Où l'anti-virus devait-il s'installer et tourner si tout transite ouvert par NAT et va vers un seul point ?",
            options: ["Au sein du routeur.", "Directement sur le MDA et le poste local des clients cibles par l'IT (impactant ou lourd pour CPU).", "Sur les ondes WI-FI.", "Pas de menace virale via ces requêtes avant 2011."],
            correctIndex: 1,
            explanation: "Sans vérification et sas en amont, les serveurs de courrier centralisés à l'intérieur subissaient en totalité l'ensemble des courriers légitimes, des malwares et des dénis de service affectant tout le trafic global."
        },
        {
            question: "Lequel des éléments DNS intervient spécifiquement quand le courriel d'un expéditeur indique qu'il doit envoyer le courrier à un domaine @domaine-final.com ?",
            options: ["L'enregistrement SRV.", "L'enregistrement AAA.", "L'enregistrement MX.", "L'enregistrement AAAA."],
            correctIndex: 2,
            explanation: "L'enregistrement de l'échange de courrier dit MX (Mail eXchange), est la fonction par défaut employée des MTA cherchant à résoudre et obtenir l'adresse IP associée du gérant hôte pour ce dit domaine destinataire du FQDN."
        }
    ],
    exercises: [
        {
            id: 'ex1',
            title: 'Dépannage de l\'enveloppe SMTP (Port Check)',
            stars: 1,
            description: 'Vérifier la cause première d\'un rejet ou d\'un transfert entre serveurs MTA via l\'extérieur réseau public.',
            instruction: 'Une nouvelle firme ne peut transférer de mails à d\'anciens serveurs. Leur technicien affirme que le pare feu bloque un point. Quel est le port qui opère d\'un MTA source à un MTA destination (Serveur sur Internet vers Serveur) ? Que suspectez vous si le port de ce relais est volontairement bloqué par le FAI Grand Public ?',
            hint: 'Le protocole traditionnel inter-serveurs (MTA <=> MTA) a toujours initialisé sur un port à deux chiffres en base.',
            correction: 'Le transfert des e-mails du MTA à MTA opère historiquement via le port TCP 25. Les FAI bloquent parfois le port 25 pour les forfaits personnels afin d\'éviter qu\'un PC infecté ne devienne lui-même une source (agent ou relayeur) de Spams sortants vers la rue d\'Internet.',
            explanation: 'En palliation, beaucoup recourent à un "Smarthost" utilisant le port 587 pour contourner l\'anonymat réseau classique du grand public port 25 et authentifier l\'envoi auprès d\'un relai accrédite par le FAI.'
        },
        {
            id: 'ex2',
            title: 'Diagnostic DNS de l\'envoi d\'un courriel (SPF vs MX)',
            stars: 2,
            description: 'Comprendre l\'usurpation vs l\'acheminement ciblé.',
            instruction: 'Vous venez d\'être assigné : Les mails vers un client n\'arrivent pas et rebondissent ("No valid route" etc.). Ensuite votre directeur affirme qu\'un spammeur s\'est approprié l\'adresse d\'une société partenaire qui envoie des pourriels ! Quel est le type d\'enregistrement DNS que vous devez diagnostiquer en l\'occurrence pour respectivement la solution du transfert de messagerie au destinataire client, puis du spammer partenaire ?',
            hint: 'L\'un pointe (destination livraison) et l\'autre authentifie les tiers.',
            correction: 'Pour les mails échouant face au client externe, le technicien interrogera logiquement le nom de domaine de la société destinataire affectée pour diagnostiquer son enregistrement MX (Mail eXchange). En revanche, l\'enregistrement concerné pour valider qu\'un tiers est un expéditeur de confiance agréé et prévenir l\'usurpation spam d\'adressage se trouve dans la configuration du champ SPF (Sous forme de texte / TXT record DNS) de la société cible.',
            explanation: 'Le domaine expéditeur doit posséder un enregistrement DNS SPF identifiant clairement les adresses IP et adresses de sous serveurs du domaine approuvé par ses propriétaires (ceci va déclencher le rejet ou "Fail" devant le firewall relais si celui testé n\'est pas cité dedans).'
        },
        {
            id: 'ex3',
            title: 'Configuration NAT pour Exchange LAN',
            stars: 3,
            description: 'Intégration et routage dans une translation d\'adresses entrante.',
            instruction: 'Le serveur frontal (le hub Exchange situé dans un réseau privé derrière le routeur pare feu à l\'adresse 10.0.0.10) doit recevoir en toute sécurité des sollicitations de postes extérieurs en SSL complet pour Activesync, MAPI, et HTTPS (Outlook Web Access). Quelle configuration de traitement par rapport à l\'IP publique extérieure allez-vous implanter et avec quel port final routé sur le port Firewall ?',
            hint: 'Translation destination.',
            correction: 'On implémentera une règle de Destination NAT (DNAT / Port Forwarding) ! Celle-ci agira sur le routeur Edge pour écouter spécifiquement sur l\'IP WAN publique assignée sur le numéro de port TCP 443; puis réécrira chaque transmission avec l\'IP destination de 10.0.0.10, aussi sur le TCP 443 redirigé vers le backend Exchange concerné.',
            explanation: 'S\'il n\'y a qu\'une IP de service, l\'usage et la traduction de nom via "Reverse-Proxy" seraient de la bonne technique pour aiguiller entre IIS Web standard et d\'autres services Microsoft internes non afférents sans tout router brutalement dans la DNAT.'
        },
        {
            id: 'ex4',
            title: 'Protocoles de Lecture (POP vs IMAP)',
            stars: 2,
            description: 'Scénario applicatif d\'utilisateur nomade frustré.',
            instruction: 'Un directeur commercial qui utilise Outlook sur son ordinateur fixe avec la mention Port 110, se connecte lors de réunions externes et d\'hôtels via son smartphone dernière génération. Il note de façon alarmante et frustrée que tous ses courriers d\'importants clients visualisés plus tôt ne figurent pas et restent "invisibles" sur son nouveau support mobile : analysez le problème de protocole mis en place et corrigez la situation.',
            hint: 'Le port 110 est affilié un archaïsme et la conservation ou le mode est non partagé.',
            correction: 'L\'ancienne mise en structure paramètre Outlook sur POP3 (Port 110) en le configurant. Par nature, la commande de communication par défaut de POP3 est de télécharger localement vers le MUA (Outlook d\'ordinateur lourd fixe) les dossiers complets avant de supprimer immédiatement (ou passé des délais initiaux) les courriels du serveur MDA réseau central. Résultat : Ils ne sont techniquement et globalement plus joignables ni existants sur le serveur web où le smartphone cherche à interagir. La correction idéale exige la transition ou migration totale du compte de messagerie en le reconfigurant avec IMAP ou IMAPS (ou le moderne ActiveSync / MAPI pour l\'intranet de la suite Exchange). Ainsi tout mouvement de courrier sera synchronisé et conservé par structure du côté serveur par défaut et répercuté mutuellement pour les deux supports connectés !',
            explanation: 'POP3 peut être contourné ou triché avec le paramètre "Laisser une copie sur le serveur" du client MUA, mais ça n\'a que peu de valeur au vu de l\'avantage inhérent constant du IMAPS de surmonter la désynchronisation des classeurs en lecture ou archives depuis les supports multipliés aujourd\'hui en Télétravail et Nomadisme technologiques !'
        }
    ]
};
