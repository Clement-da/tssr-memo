/**
 * modules_index.js — Central registry of all TSSR modules.
 * Import here to add a new module. Components iterate over this array.
 */

import { module1 } from './module1_data.js';
import { module2 } from './module2_data.js';
import { module3 } from './module3_data.js';

export const MODULES = [module1, module2, module3];
