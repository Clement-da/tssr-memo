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
import { module11 } from './module11_data.js';
import { module13 } from './module13_data.js';
import { moduleLinux } from './module_linux_data.js';

export const MODULES = [module1, module2, module3, module4, module5, module6, module11, module13, moduleLinux];

