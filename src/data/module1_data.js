/**
 * module1_data.js — Base des réseaux (niveau TSSR Expert)
 * Source : Base_des_reseaux_clean.md — contenu intégral
 */

export const module1 = {
    id: 'base_reseaux',
    title: 'Base des réseaux',
    icon: '🌐',
    quiz: [
        {
            question: "Quel est le moyen mnémotechnique pour retenir les 7 couches OSI de bas en haut ?",
            options: [
                "Application, Présentation, Session, Transport, Réseau, Liaison, Physique",
                "\"Pour Les Réseaux Très Solides, Pensez Application\"",
                "\"Apprenons Progressivement Si Tu Resumes La Physique\"",
                "\"Physique Liaison Réseau Transport Session Présentation Application\""
            ],
            correctIndex: 1,
            explanation: "Le moyen mnémotechnique officiel est \"Pour Les Réseaux Très Solides, Pensez Application\" (P=Physique, L=Liaison, R=Réseau, T=Transport, S=Session, P=Présentation, A=Application)."
        },
        {
            question: "Une machine a l'adresse 169.254.0.15. Que cela indique-t-il immédiatement ?",
            options: [
                "La machine est configurée en adresse statique de classe B",
                "L'adresse loopback est active et le réseau fonctionne",
                "Le serveur DHCP n'a pas répondu — la machine s'est auto-configurée (APIPA)",
                "La machine est connectée à Internet via IPv6"
            ],
            correctIndex: 2,
            explanation: "169.254.0.0/16 est la plage APIPA (Automatic Private IP Addressing). Un poste en 169.254.x.x signifie que le serveur DHCP est inaccessible. C'est une alerte de diagnostic immédiate en TSSR."
        },
        {
            question: "Pour avoir au moins 50 hôtes dans un sous-réseau, quel masque CIDR utiliser ?",
            options: ["/27 (30 hôtes)", "/26 (62 hôtes)", "/25 (126 hôtes)", "/28 (14 hôtes)"],
            correctIndex: 1,
            explanation: "2⁵ - 2 = 30 hôtes (trop peu). 2⁶ - 2 = 62 hôtes ✅ (suffisant). Le masque /26 (255.255.255.192) est le plus adapté pour avoir au moins 50 hôtes."
        },
        {
            question: "Quelle est la différence fondamentale entre TCP et UDP ?",
            options: [
                "TCP fonctionne en couche 3, UDP en couche 4",
                "TCP garantit la livraison avec accusé de réception ; UDP est rapide mais sans garantie",
                "TCP est plus rapide qu'UDP car il compresse les données",
                "UDP est chiffré par défaut, TCP ne l'est pas"
            ],
            correctIndex: 1,
            explanation: "TCP (Transmission Control Protocol) établit une connexion avec accusé de réception et retransmission en cas de perte. UDP (User Datagram Protocol) envoie sans confirmation — plus rapide mais non fiable. TCP = HTTPS, SMTP. UDP = DNS, VoIP, streaming."
        },
        {
            question: "Réseau 10.0.0.0/24 — quelle est l'adresse de broadcast ?",
            options: ["10.0.0.0", "10.0.0.127", "10.0.0.254", "10.0.0.255"],
            correctIndex: 3,
            explanation: "Pour un /24, les 24 premiers bits sont la partie réseau, les 8 derniers sont la partie hôte. Le broadcast = tous les bits hôte à 1 = 255. Réponse : 10.0.0.255."
        },
        {
            question: "Pourquoi le broadcast ne traverse-t-il pas un routeur ?",
            options: [
                "Parce que les routeurs ne comprennent que les adresses IPv6",
                "Parce que le routeur est la frontière du domaine de diffusion — il segmente les broadcasts",
                "Parce que le broadcast est filtré par le pare-feu",
                "Parce que les trames broadcast sont envoyées uniquement en UDP"
            ],
            correctIndex: 1,
            explanation: "Un routeur délimite un domaine de diffusion. Chaque interface d'un routeur = un réseau IP différent = un domaine de diffusion indépendant. Les broadcasts restent confinés au réseau local."
        },
        {
            question: "Quelle commande Windows permet de voir les associations IP ↔ MAC du cache ARP ?",
            options: ["ipconfig /all", "netstat -an", "arp -a", "ping -t"],
            correctIndex: 2,
            explanation: "La commande 'arp -a' affiche le cache ARP (table des associations IP ↔ adresse MAC). C'est utile pour diagnostiquer des problèmes de communication dans un LAN."
        },
        {
            question: "Quelle est la particularité principale de l'IPv6 par rapport au broadcast ?",
            options: [
                "IPv6 utilise un broadcast amélioré sur 256 bits",
                "IPv6 n'a pas de broadcast — il est remplacé par le multicast",
                "IPv6 utilise l'adresse 255.255.255.255 pour le broadcast",
                "IPv6 utilise le broadcast uniquement pour ARP"
            ],
            correctIndex: 1,
            explanation: "En IPv6, le broadcast est supprimé et remplacé par le multicast. Le multicast est plus efficace : seules les machines faisant partie du groupe concerné reçoivent le message."
        },
        {
            question: "Un disque dur est vendu \"1 To\". Windows l'affiche à environ 931 Gio. Pourquoi ?",
            options: [
                "Windows retire 7% pour le système de fichiers NTFS",
                "Le disque est partiellement défectueux",
                "Les constructeurs utilisent des unités décimales (10³), les OS des unités binaires (2¹⁰)",
                "La partition de récupération occupe l'espace manquant"
            ],
            correctIndex: 2,
            explanation: "1 To constructeur = 1 000 000 000 000 octets. Converti en binaire : 1 000 000 000 000 / 1 073 741 824 ≈ 931 Gio. C'est purement une différence de base de calcul, pas un défaut."
        },
        {
            question: "Qu'est-ce qu'une adresse loopback (127.0.0.1) et à quoi sert-elle ?",
            options: [
                "L'adresse par défaut attribuée par le DHCP quand aucun réseau n'est disponible",
                "L'adresse MAC de la carte réseau en notation IP",
                "Une adresse de test local permettant de tester la pile réseau sans carte réseau ni câble",
                "L'adresse de la passerelle par défaut sur les réseaux /8"
            ],
            correctIndex: 2,
            explanation: "127.0.0.1 (loopback) est une adresse virtuelle qui désigne la machine elle-même. Taper 'ping 127.0.0.1' permet de vérifier que la pile TCP/IP fonctionne correctement, sans avoir besoin d'un câble ou d'une connexion réseau."
        }
    ],

    flashcards: [
        {
            front: "Mnémotechnique OSI de bas en haut ?",
            back: "\"Pour Les Réseaux Très Solides, Pensez Application\"\n\nP=Physique | L=Liaison | R=Réseau | T=Transport | S=Session | P=Présentation | A=Application"
        },
        {
            front: "Qu'est-ce que l'encapsulation ?",
            back: "Lors de l'envoi, chaque couche OSI ajoute ses propres en-têtes aux données :\n\nDonnées → Segment (Transport) → Paquet (Réseau) → Trame (Liaison) → Bits (Physique)\n\nLa réception fait l'inverse : désencapsulation."
        },
        {
            front: "À quoi reconnaît-on qu'un poste a un problème DHCP ?",
            back: "Son adresse IP est dans la plage 169.254.x.x /16 (APIPA).\n\nL'OS s'auto-attribue cette adresse quand il ne reçoit aucune réponse du serveur DHCP.\nAction : vérifier la connectivité réseau et l'état du serveur DHCP."
        },
        {
            front: "Formule pour calculer le nombre d'hôtes d'un sous-réseau ?",
            back: "Nombre d'hôtes = 2ⁿ - 2\n\nn = nombre de bits de la partie hôte = (32 - préfixe CIDR)\n\nExemple /26 : n = 32 - 26 = 6 → 2⁶ - 2 = 62 hôtes\n(-2 car : adresse réseau et broadcast non utilisables)"
        },
        {
            front: "Quelle est la différence entre bit et octet ?",
            back: "1 bit = l'unité la plus petite (0 ou 1)\n1 octet = 8 bits\n\nDébits réseau → en bits/s (ex: 100 Mb/s)\nCapacité de stockage → en octets (ex: 500 Go)\n\nAttention à la casse : bit = 'b' minuscule | octet = 'B' majuscule"
        },
        {
            front: "Quelle est la grande différence IPv6 vs IPv4 concernant le broadcast ?",
            back: "IPv6 n'a PAS de broadcast.\nIl est remplacé par le multicast (ff00::/8) : seules les machines du groupe ciblé reçoivent le message.\n\nAutres différences clés :\n• IPv4 = 32 bits | IPv6 = 128 bits\n• IPv6 supprime le besoin de NAT"
        },
        {
            front: "Comment simplifier l'adresse IPv6 2001:0db8:0000:0000:0042:0000:0000:0001 ?",
            back: "Étape 1 — Supprimer les zéros gauches de chaque bloc :\n2001:db8:0:0:42:0:0:1\n\nÉtape 2 — Remplacer la plus longue suite de blocs nuls par :: :\n2001:db8:0:0:42::1\n\n(Le :: remplace les deux derniers blocs :0:0 — ou les premiers :0:0 selon la longueur)"
        },
        {
            front: "Tableau de diagnostic OSI : quel symptôme → quelle couche ?",
            back: "• Câble débranché / pas de signal → Couche 1 (Physique)\n• Problème ARP, VLAN → Couche 2 (Liaison)\n• Mauvais routage IP → Couche 3 (Réseau)\n• Ping OK mais page web inaccessible → Couches 4-7\n\nMéthode : toujours diagnostiquer de bas en haut."
        },
        {
            front: "À quoi sert l'adresse 127.0.0.1 ?",
            back: "C'est l'adresse de loopback (interface virtuelle).\n\nElle représente la machine elle-même. Permet de tester la pile TCP/IP sans carte réseau ni câble.\n\n'ping 127.0.0.1' = test interne de la stack réseau locale.\nÉquivalent IPv6 : ::1"
        },
        {
            front: "Qu'est-ce que le surréseau (supernetting) et quand l'utilise-t-on ?",
            back: "Le surréseau regroupe plusieurs réseaux contigus sous un masque moins restrictif pour simplifier les tables de routage.\n\nExemple :\n192.168.0.0/24 + 192.168.1.0/24 → 192.168.0.0/23\n(510 hôtes, broadcast 192.168.1.255)\n\nUsage : FAI, backbone, grandes entreprises."
        }
    ]
};
