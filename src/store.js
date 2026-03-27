import { map } from 'nanostores';
import { MODULES } from './data/modules_index.js';

const STATE_KEY = 'tssr_revision_state';

// ─── XP Level Thresholds ────────────────────────────────────────────
export const XP_LEVELS = [
    { level: 1, name: 'Apprenti',      minXP: 0,    maxXP: 499,  icon: '🌱' },
    { level: 2, name: 'Technicien',    minXP: 500,  maxXP: 1499, icon: '🔧' },
    { level: 3, name: 'Confirmé',      minXP: 1500, maxXP: 2999, icon: '🛡️' },
    { level: 4, name: 'Expert',        minXP: 3000, maxXP: 4999, icon: '💎' },
    { level: 5, name: 'Maître TSSR',   minXP: 5000, maxXP: Infinity, icon: '👑' },
];

export function getLevelInfo(xp) {
    const level = XP_LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP) || XP_LEVELS[0];
    const nextLevel = XP_LEVELS.find(l => l.level === level.level + 1);
    const progressInLevel = xp - level.minXP;
    const xpForLevel = nextLevel ? (nextLevel.minXP - level.minXP) : 1;
    const percentage = nextLevel ? Math.min(100, Math.round((progressInLevel / xpForLevel) * 100)) : 100;
    return { ...level, xp, progressInLevel, xpForLevel, percentage, nextLevel };
}

// ─── Badges Definitions ──────────────────────────────────────────────
export const BADGE_DEFINITIONS = [
    {
        id: 'first_module',
        name: 'Premier pas',
        icon: '🏅',
        description: '1 module complété à 100%',
        check: (state) => {
            return MODULES.some(mod => getModuleCompletion(state, mod.id) === 100);
        }
    },
    {
        id: 'linux_pro',
        name: 'Linux Pro',
        icon: '🐧',
        description: 'Modules Linux (8, 9, 10) complétés',
        check: (state) => {
            const linuxIds = MODULES.filter(m =>
                m.id === 'administration-linux' || m.id === 'script-bash' || m.id === 'services-reseaux-linux'
            ).map(m => m.id);
            return linuxIds.length > 0 && linuxIds.every(id => getModuleCompletion(state, id) === 100);
        }
    },
    {
        id: 'windows_wizard',
        name: 'Windows Wizard',
        icon: '🪟',
        description: 'Modules Windows (4, 5, 6, 7) complétés',
        check: (state) => {
            const winIds = MODULES.filter(m =>
                m.id === 'systemes-microsoft' || m.id === 'powershell' ||
                m.id === 'services-microsoft' || m.id === 'rds-wds-mdt'
            ).map(m => m.id);
            return winIds.length > 0 && winIds.every(id => getModuleCompletion(state, id) === 100);
        }
    },
    {
        id: 'tssr_ready',
        name: 'TSSR Ready',
        icon: '🎓',
        description: 'Les 13 modules complétés',
        check: (state) => {
            return MODULES.every(mod => getModuleCompletion(state, mod.id) === 100);
        }
    }
];

// ─── Module Completion Calculator (shared logic) ──────────────────────
export function getModuleCompletion(state, moduleId) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return 0;

    let completed = 0;
    let total = 3; // Lesson, Quiz, Flashcards

    if (state.lessons[moduleId]) completed++;

    const quiz = state.quizzes[moduleId];
    if (quiz && (quiz.score / quiz.total) >= 0.7) completed++;

    const fcState = state.flashcards[moduleId] || {};
    const totalCards = mod.flashcards?.length || 0;
    const knownCards = Object.values(fcState).filter(v => v === 'known').length;
    if (totalCards > 0) completed += knownCards / totalCards;

    if (mod.exercises && mod.exercises.length > 0) {
        total++;
        const exState = state.exercises[moduleId] || {};
        const doneEx = Object.values(exState).filter(v => v === 'done').length;
        completed += doneEx / mod.exercises.length;
    }

    return Math.min(100, Math.round((completed / total) * 100));
}

// ─── Default State Builder ───────────────────────────────────────────
function buildDefaultState() {
    const state = { lessons: {}, quizzes: {}, flashcards: {}, exercises: {}, xp: 0, badges: [] };
    MODULES.forEach(mod => {
        state.lessons[mod.id] = false;
        state.quizzes[mod.id] = null;
        state.flashcards[mod.id] = {};
        state.exercises[mod.id] = {};
    });
    return state;
}

function loadInitialState() {
    if (typeof localStorage === 'undefined') return buildDefaultState();
    try {
        const saved = localStorage.getItem(STATE_KEY);
        if (!saved) return buildDefaultState();

        const parsed = JSON.parse(saved);
        const defaults = buildDefaultState();
        return {
            lessons:    { ...defaults.lessons,    ...parsed.lessons },
            quizzes:    { ...defaults.quizzes,    ...parsed.quizzes },
            flashcards: { ...defaults.flashcards, ...parsed.flashcards },
            exercises:  { ...defaults.exercises,  ...parsed.exercises },
            xp:         parsed.xp ?? 0,
            badges:     parsed.badges ?? [],
        };
    } catch (e) {
        console.error('Error loading state', e);
        return buildDefaultState();
    }
}

export const appStore = map(loadInitialState());

// Run an initial check for badges in case some were missed
if (typeof window !== 'undefined') {
    // Small timeout to ensure everything is mapped correctly
    setTimeout(() => {
        checkBadges();
    }, 500);
}

// Subscribe to changes and save to localStorage
if (typeof window !== 'undefined') {
    appStore.subscribe((state) => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    });
}

// ─── XP Actions ──────────────────────────────────────────────────────
export function addXP(amount) {
    if (amount <= 0) return;
    const current = appStore.get();
    const newXP = current.xp + amount;
    appStore.setKey('xp', newXP);

    // Check for module completion bonus automatically
    checkModuleCompletionBonus();
    // Check for new badges
    checkBadges();
}

// Track which modules already got their 100% bonus to avoid double-counting
function checkModuleCompletionBonus() {
    const current = appStore.get();
    const completedModuleBonuses = current._completedModuleBonuses || [];

    MODULES.forEach(mod => {
        if (!completedModuleBonuses.includes(mod.id) && getModuleCompletion(current, mod.id) === 100) {
            // Award +50 XP bonus for 100% module completion
            completedModuleBonuses.push(mod.id);
            const newXP = current.xp + 50;
            appStore.set({
                ...appStore.get(),
                xp: newXP,
                _completedModuleBonuses: completedModuleBonuses,
            });
        }
    });
}

// ─── Badge Actions ───────────────────────────────────────────────────
export function checkBadges() {
    const state = appStore.get();
    const currentBadges = state.badges || [];
    const newBadges = [...currentBadges];

    BADGE_DEFINITIONS.forEach(badge => {
        if (!newBadges.includes(badge.id) && badge.check(state)) {
            newBadges.push(badge.id);
        }
    });

    if (newBadges.length !== currentBadges.length) {
        appStore.setKey('badges', newBadges);
    }
}

export function unlockBadge(badgeId) {
    const current = appStore.get();
    if (current.badges.includes(badgeId)) return;
    appStore.setKey('badges', [...current.badges, badgeId]);
}

// ─── Existing Actions ────────────────────────────────────────────────
export function updateLessonStatus(moduleId, status) {
    const current = appStore.get();
    appStore.setKey('lessons', { ...current.lessons, [moduleId]: status });
}

export function updateQuizScore(moduleId, score, total) {
    const current = appStore.get();
    appStore.setKey('quizzes', { ...current.quizzes, [moduleId]: { score, total } });
}

export function updateFlashcard(moduleId, cardId, status) {
    const current = appStore.get();
    const modFlashcards = { ...current.flashcards[moduleId], [cardId]: status };
    appStore.setKey('flashcards', { ...current.flashcards, [moduleId]: modFlashcards });
}

export function updateExerciseStatus(moduleId, exerciseId, status) {
    const current = appStore.get();
    const modExercises = { ...current.exercises[moduleId], [exerciseId]: status };
    appStore.setKey('exercises', { ...current.exercises, [moduleId]: modExercises });
}

export function resetGlobalProgress() {
    appStore.set(buildDefaultState());
}
