/**
 * module2_data.js — Infrastructure Réseaux (Cisco IOS)
 * Source : INFRASTRUCTURE_RESEAUX_clean.md — contenu intégral
 * Niveau expert TSSR — tous les schémas de configuration inclus
 */

export const module2 = {
    id: 'infra_reseaux',
    title: 'Infrastructure Réseaux',
    icon: '🔧',
    quiz: [
        {
            question: "Un technicien doit configurer un switch Cisco pour la première fois. Il n'a pas d'adresse IP ni d'accès réseau. Quelle est l'unique solution ?",
            options: [
                "Se connecter via SSH avec les identifiants par défaut",
                "Utiliser le port console avec un câble RJ45→USB et PuTTY",
                "Envoyer un ping depuis le réseau pour réveiller l'interface",
                "Réinitialiser l'équipement via le bouton Reset"
            ],
            correctIndex: 1,
            explanation: "Le port console est le seul moyen d'accès initial à un équipement Cisco vierge. Il fonctionne à la couche 1 OSI via un câble console (RJ45 → USB) et un émulateur de terminal (PuTTY). C'est le dernier recours même si le réseau est inaccessible."
        },
        {
            question: "Quelle commande Cisco sauvegarde la configuration active de façon permanente ?",
            options: [
                "SW1# write memory startup",
                "SW1# copy startup-config running-config",
                "SW1# copy running-config startup-config",
                "SW1# save configuration nvram"
            ],
            correctIndex: 2,
            explanation: "'copy running-config startup-config' copie la configuration active (RAM) vers la NVRAM (startup-config). Sans cette étape, toute configuration est perdue au prochain redémarrage."
        },
        {
            question: "Qu'est-ce que le 'flooding' sur un switch et quand se produit-il ?",
            options: [
                "Une attaque DDoS qui sature le réseau avec des trames malveillantes",
                "L'envoi d'une trame sur tous les ports du VLAN sauf celui d'entrée, quand la MAC destination est inconnue",
                "La duplication de toutes les trames sur un port miroir pour analyse",
                "L'envoi de la trame uniquement sur le port associé à la MAC destination connue"
            ],
            correctIndex: 1,
            explanation: "Le flooding est un comportement normal : quand le switch ne connaît pas l'adresse MAC destination dans sa table CAM, il envoie la trame sur tous les ports du VLAN sauf celui d'entrée. Ainsi la trame atteindra sa destination, qui répondra et permettra au switch d'apprendre son emplacement."
        },
        {
            question: "Quelle est la différence essentielle entre un port Access et un port Trunk sur un switch Cisco ?",
            options: [
                "Un port Access est plus rapide qu'un port Trunk",
                "Un port Trunk est utilisé uniquement pour la téléphonie IP",
                "Un port Access appartient à un seul VLAN (pour équipements finaux), un port Trunk transporte plusieurs VLAN (entre équipements réseau)",
                "Un port Access supporte 802.1Q, un port Trunk ne le supporte pas"
            ],
            correctIndex: 2,
            explanation: "Port Access = 1 seul VLAN, pour PC, imprimantes et équipements finaux. Port Trunk = plusieurs VLAN simultanément via 802.1Q, pour les liens switch ↔ switch ou switch ↔ routeur."
        },
        {
            question: "Dans le Router-on-a-stick pour le routage inter-VLAN, à quoi sert la commande 'encapsulation dot1Q 10' ?",
            options: [
                "Elle active le protocole OSPF sur la sous-interface",
                "Elle configure la bande passante de la sous-interface",
                "Elle associe la sous-interface au VLAN 10 en lui indiquant de traiter les trames taguées 802.1Q avec le tag 10",
                "Elle active le chiffrement 802.1Q sur le lien trunk"
            ],
            correctIndex: 2,
            explanation: "La commande 'encapsulation dot1Q 10' associe la sous-interface au VLAN 10. Le routeur décode les trames 802.1Q portant le tag 10 et les traite sur cette sous-interface. C'est le mécanisme qui permet au routeur de distinguer les VLAN sur un seul lien physique trunk."
        },
        {
            question: "Quelle est la règle de placement pour une ACL étendue vs une ACL standard ?",
            options: [
                "ACL standard : proche de la source | ACL étendue : proche de la destination",
                "ACL standard : proche de la destination | ACL étendue : proche de la source",
                "Les deux types se placent toujours sur l'interface WAN",
                "Le placement n'a aucune importance pour les deux types"
            ],
            correctIndex: 1,
            explanation: "ACL standard (filtre sur IP source uniquement) → proche de la DESTINATION pour éviter de bloquer trop large. ACL étendue (filtre précis IP source + destination + protocole + port) → proche de la SOURCE pour bloquer le trafic le plus tôt possible et ne pas charger le réseau inutilement."
        },
        {
            question: "Un réseau 192.168.1.0/24 accède à Internet. Quelle technnique NAT est utilisée par la box Internet pour permettre à toutes les machines internes de partager une seule IP publique ?",
            options: [
                "D-NAT statique (Port Forwarding)",
                "S-NAT statique (association fixe 1:1)",
                "S-NAT dynamique / PAT (Port Address Translation)",
                "OSPF avec route par défaut"
            ],
            correctIndex: 2,
            explanation: "PAT (Port Address Translation), aussi appelé S-NAT dynamique ou 'overload', permet à plusieurs machines internes de partager une seule IP publique en les distinguant par leur numéro de port. C'est le fonctionnement standard de toutes les box Internet."
        },
        {
            question: "En Wi-Fi 2,4 GHz, combien existe-t-il de canaux non superposés ?",
            options: ["1 canal (canal 6 uniquement)", "3 canaux (1, 6, 11)", "7 canaux", "13 canaux"],
            correctIndex: 1,
            explanation: "La bande 2,4 GHz ne dispose que de 3 canaux non superposés : 1, 6 et 11. C'est pourquoi dans les environnements denses (open spaces, logements collectifs), la bande 2,4 GHz est souvent saturée. La bande 5 GHz dispose de 19 à 24 canaux."
        },
        {
            question: "Quel mode de violation Port Security désactive le port en cas d'intrusion physique ?",
            options: ["protect (silencieux)", "restrict (log uniquement)", "block (bloque sans log)", "shutdown (err-disabled)"],
            correctIndex: 3,
            explanation: "Le mode 'shutdown' est le plus sécurisé : le port passe en état err-disabled lors d'une violation. Un administrateur doit manuellement le réactiver (shutdown + no shutdown). Les modes 'restrict' et 'protect' rejettent les trames non autorisées mais laissent le port actif."
        },
        {
            question: "Pourquoi WEP ne doit-il jamais être utilisé pour sécuriser un réseau Wi-Fi ?",
            options: [
                "Il n'est pas compatible avec les équipements modernes",
                "Il est trop lent pour les débits Wi-Fi actuels",
                "Sa clé statique et son vecteur d'initialisation trop court le rendent cassable en quelques minutes",
                "Il n'est pas standardisé par l'IEEE"
            ],
            correctIndex: 2,
            explanation: "WEP (Wired Equivalent Privacy) utilise une clé statique partagée et un vecteur d'initialisation (IV) de 24 bits trop court. Des outils comme aircrack-ng peuvent craquer une clé WEP en quelques minutes en analysant suffisamment de trames. WEP est officiellement obsolète — remplacé par WPA2/WPA3."
        }
    ],

    flashcards: [
        {
            front: "Comment passer du mode utilisateur au mode configuration globale sur Cisco IOS ?",
            back: "Switch> enable\n→ Switch# (mode privilégié)\n\nSwitch# configure terminal\n→ Switch(config)# (mode configuration globale)\n\nSwitch(config)# exit → retour mode précédent\nSwitch(config)# end → retour direct mode privilégié"
        },
        {
            front: "Quelle est la différence entre running-config et startup-config ?",
            back: "running-config : configuration active en RAM\n→ perdue au redémarrage\n\nstartup-config : configuration en NVRAM\n→ persistante au redémarrage\n\nSauvegarder : copy running-config startup-config"
        },
        {
            front: "Quelle commande configure un port Cisco en mode Access pour le VLAN 10 ?",
            back: "SW1(config)# interface fastEthernet 0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW1(config-if)# exit\n\nVérifier : SW1# show vlan brief"
        },
        {
            front: "Comment configurer SSH (et non Telnet) sur les lignes VTY d'un switch Cisco ?",
            back: "SW1(config)# ip domain-name monentreprise.local\nSW1(config)# crypto key generate rsa modulus 2048\nSW1(config)# username admin secret MotDePasse\nSW1(config)# line vty 0 4\nSW1(config-line)# login local\nSW1(config-line)# transport input ssh\nSW1(config)# ip ssh version 2"
        },
        {
            front: "Qu'est-ce que le Router-on-a-stick et pourquoi l'utilise-t-on ?",
            back: "Technique de routage inter-VLAN avec UN SEUL lien physique trunk entre switch et routeur.\n\nPrincipe :\n• Le routeur crée une sous-interface par VLAN\n• Chaque sous-interface = passerelle du VLAN\n• encapsulation dot1Q <id-vlan> associe la sous-interface au VLAN\n\nUsage : routage entre VLAN sans switch L3."
        },
        {
            front: "Quelle est la règle de placement des ACL (standard vs étendue) ?",
            back: "ACL STANDARD (1–99)\n→ Filtre sur IP source uniquement\n→ Placer PROCHE DE LA DESTINATION\n(sinon bloquerait trop large)\n\nACL ÉTENDUE (100–199)\n→ Filtre IP src + IP dst + protocole + port\n→ Placer PROCHE DE LA SOURCE\n(bloquer le plus tôt possible)"
        },
        {
            front: "Quelle est la règle implicite finale de toute ACL Cisco ?",
            back: "deny any\n\nTout trafic non explicitement autorisé est bloqué.\n\nConséquence : toujours terminer une ACL restrictive par 'permit ip any any' si on veut autoriser le reste du trafic. Sans cette ligne, toute l'autre communication serait bloquée."
        },
        {
            front: "Quelle est la différence entre S-NAT PAT et D-NAT port forwarding ?",
            back: "S-NAT PAT (dynamique) :\n→ LAN → Internet\n→ Plusieurs IP privées partagent 1 IP publique via les ports\n→ Commande : ip nat inside source list X interface Y overload\n\nD-NAT Port Forwarding (statique) :\n→ Internet → LAN\n→ Rend un service interne accessible depuis Internet\n→ Commande : ip nat inside source static tcp IP_privée port IP_publique port"
        },
        {
            front: "Quels sont les 3 canaux Wi-Fi non superposés en 2,4 GHz ?",
            back: "Canaux 1, 6 et 11\n\nEn 2,4 GHz, seuls ces 3 canaux ne se chevauchent pas.\n→ Si plus de 3 AP dans une zone : basculer en 5 GHz\n→ 5 GHz : 19 à 24 canaux disponibles, mais portée plus courte\n\nRéflexe : 5 GHz pour postes fixes, 2,4 GHz pour la mobilité."
        },
        {
            front: "Quel protocole Wi-Fi est obligatoire en entreprise pour l'authentification ?",
            back: "WPA2/WPA3 + 802.1X (RADIUS)\n\nChaque utilisateur s'authentifie avec ses propres identifiants.\nLe point d'accès interroge un serveur RADIUS → autorisation ou refus.\nUne clé dynamique unique est générée à chaque connexion.\n\nJamais de clé partagée (PSK) en environnement professionnel.\nWEP = absolument interdit."
        }
    ],

    exercises: [
        {
            id: 'm2_ex1',
            title: 'Initialisation Console',
            stars: 1,
            description: 'Configuration du mot de passe console.',
            instruction: 'Quelles sont les commandes pour mettre un mot de passe console "Cisco" ?',
            hint: 'line console 0, password, login.',
            correction: 'line console 0\npassword Cisco\nlogin',
            explanation: 'La commande login est nécessaire pour forcer la demande du mot de passe.'
        },
        {
            id: 'm2_ex2',
            title: 'Mode Privilège',
            stars: 1,
            description: 'Configuration du enable secret.',
            instruction: 'Quelle commande permet de mettre un mot de passe chiffré "Class" pour le mode privilège ?',
            hint: 'enable secret.',
            correction: 'enable secret Class',
            explanation: '`enable secret` est préférable à `enable password` car il utilise un hachage plus fort.'
        },
        {
            id: 'm2_ex3',
            title: 'Diagnostic Interface',
            stars: 2,
            description: 'Vérification de l\'état des ports.',
            instruction: 'Quelle commande résumée permet de voir l\'état (up/down) et l\'IP de toutes les interfaces d\'un routeur ?',
            hint: 'show ip int brief.',
            correction: 'show ip interface brief',
            explanation: 'Commande essentielle pour un diagnostic rapide en début de dépannage.'
        },
        {
            id: 'm2_ex-gen',
            title: 'Expert Cisco IOS (Générateur)',
            stars: 5,
            description: 'Générateur de scénarios de configuration et dépannage Cisco.',
            isGenerator: true,
            scenarios: [
                {
                    instruction: 'Scénario : Un port est passé en mode "err-disabled". Comment le réactiver manuellement ?',
                    hint: 'shutdown / no shutdown.',
                    correction: 'shutdown\nno shutdown',
                    explanation: 'La séquence d\'arrêt/démarrage réinitialise l\'état de l\'interface.'
                },
                {
                    instruction: 'Scénario : Sauvegardez la configuration active vers la configuration de démarrage.',
                    hint: 'copy running startup.',
                    correction: 'copy running-config startup-config',
                    explanation: 'La configuration est copiée de la RAM vers la NVRAM.'
                },
                {
                    instruction: 'Scénario : Vous voulez créer le VLAN 10 nommé "Commercial". Quelles sont les commandes ?',
                    hint: 'vlan 10, name Commercial.',
                    correction: 'vlan 10\nname Commercial',
                    explanation: 'La commande "name" est facultative mais fortement recommandée pour la documentation.'
                }
            ]
        }
    ]
};

