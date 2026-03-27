/**
 * modules_index.js — Central registry of all TSSR modules.
 * Import here to add a new module. Components iterate over this array.
 */

import { module1 } from './module1_data.js';
import { module2 } from './module2_data.js';
import { module3 } from './module3_data.js';
import { module4 } from './module4_data.js';
import { module5 } from './module5_data.js';
import { module6 } from './module6_data.js';
import { module7 } from './module7_data.js';
import { module9 } from './module9_data.js';
import { module10 } from './module10_data.js';
import { module11 } from './module11_data.js';
import { module12 } from './module12_data.js';
import { module13 } from './module13_data.js';
import { moduleLinux } from './module_linux_data.js';

/**
 * MODULE_CATEGORIES — Grouped structure for the dashboard.
 * Each category has a name, icon, and its modules in display order.
 */
export const MODULE_CATEGORIES = [
    {
        name: 'Réseau',
        icon: '🌐',
        modules: [
            module1,      // Base des réseaux
            module2,      // Infrastructure Réseaux
            module3,      // Réseaux et Sécurité
            module11,     // Virtualisation
            module13,     // Messagerie
            module12,     // Sauvegarde & Restauration
        ],
    },
    {
        name: 'Windows',
        icon: '🪟',
        modules: [
            module4,      // Systèmes Clients Microsoft
            module6,      // Services Microsoft (AD, DNS, DHCP)
            module7,      // RDS, WDS, MDT
            module5,      // PowerShell & Scripting
        ],
    },
    {
        name: 'Linux',
        icon: '🐧',
        modules: [
            moduleLinux,  // Base Linux
            module10,     // Services Réseaux Linux
            module9,      // Scripting Bash
        ],
    },
];

/** Flat array of all modules — kept for backward compatibility with progress calculations */
export const MODULES = MODULE_CATEGORIES.flatMap(cat => cat.modules);
