import { map } from 'nanostores';
import { MODULES } from './data/modules_index.js';

const STATE_KEY = 'tssr_revision_state';

function buildDefaultState() {
    const state = { lessons: {}, quizzes: {}, flashcards: {}, exercises: {} };
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
            exercises:  { ...defaults.exercises,  ...parsed.exercises }
        };
    } catch (e) {
        console.error('Error loading state', e);
        return buildDefaultState();
    }
}

export const appStore = map(loadInitialState());

// Subscribe to changes and save to localStorage
if (typeof window !== 'undefined') {
    appStore.subscribe((state) => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    });
}

// Helper functions (actions)
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

