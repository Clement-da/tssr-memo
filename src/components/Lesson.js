import { MODULES } from '../data/modules_index.js';
import { loadState, saveState } from '../state.js';
import { initSubnetCalculator } from './SubnetCalculator.js';

/**
 * Renders the lesson view for a given moduleId.
 * @param {HTMLElement} container
 * @param {string} moduleId
 */
export function renderLesson(container, moduleId) {
    const mod = MODULES.find(m => m.id === moduleId) ?? MODULES[0];
    const state = loadState();
    const isCompleted = state.lessons[mod.id] === true;

    container.innerHTML = `
        <div class="lesson-header">
            <h2>${mod.title}</h2>
            ${isCompleted ? '<span class="lesson-badge lesson-badge--done" aria-label="Leçon terminée">✓ Terminé</span>' : ''}
        </div>

        <article class="lesson-content" aria-label="Contenu de la leçon">
            ${mod.lessonHTML}
        </article>

        <div id="lesson-notification" class="lesson-notification" role="alert" aria-live="assertive" hidden></div>

        <div class="lesson-footer">
            <button class="btn btn-outline" onclick="window.appNavigate('dashboard')">← Dashboard</button>
            <button id="btn-complete-lesson" class="btn ${isCompleted ? 'btn-success' : 'btn-primary'}">
                ${isCompleted ? 'Leçon déjà validée ✓' : 'Marquer comme lu'}
            </button>
        </div>
    `;

    const btnComplete = document.getElementById('btn-complete-lesson');
    const notification = document.getElementById('lesson-notification');

    // Init subnet calculator widget if present in this lesson
    initSubnetCalculator();

    btnComplete.addEventListener('click', () => {
        if (!state.lessons[mod.id]) {
            state.lessons[mod.id] = true;
            saveState(state);
            btnComplete.textContent = 'Leçon validée ✓';
            btnComplete.className = 'btn btn-success';

            // Styled inline notification instead of alert()
            notification.hidden = false;
            notification.className = 'lesson-notification lesson-notification--success';
            notification.innerHTML = `
                <strong>Excellent !</strong> Leçon terminée. Passez au quiz pour tester vos connaissances.
                <button class="btn btn-primary btn-sm" onclick="window.appNavigate('quiz', '${mod.id}')" style="margin-left: var(--space-4);">
                    Aller au Quiz →
                </button>`;
        }
    });
}
