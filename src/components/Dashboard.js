import { loadState, getGlobalProgress } from '../state.js';
import { MODULES } from '../data/modules_index.js';
import { isModuleUnlocked, getModuleProgress } from '../state.js';

/**
 * Renders the dashboard view with all modules dynamically.
 */
export function renderDashboard(container) {
    const state = loadState();
    const globalProgress = getGlobalProgress();

    // Build module cards HTML
    const moduleCardsHTML = MODULES.map((mod, index) => {
        const unlocked = isModuleUnlocked(index);
        const modProgress = getModuleProgress(mod.id);

        const quizState = state.quizzes[mod.id];
        let quizText = 'Non commencé';
        let quizColorStyle = '';
        if (quizState) {
            const pct = Math.round((quizState.score / quizState.total) * 100);
            quizText = `${quizState.score}/${quizState.total} (${pct}%)`;
            quizColorStyle = pct >= 70 ? 'color: var(--accent-success);' : 'color: var(--accent-warning);';
        }

        const fcState = state.flashcards[mod.id] || {};
        const knownCards = Object.values(fcState).filter(v => v === 'known').length;
        const totalCards = mod.flashcards.length;

        if (!unlocked) {
            return `
                <article class="card module-card module-card--locked" aria-label="Module verrouillé : ${mod.title}">
                    <div class="module-card__lock-icon" aria-hidden="true">🔒</div>
                    <h3>${mod.icon ?? '📚'} ${mod.title}</h3>
                    <p class="module-card__lock-msg">Terminez le module précédent à 70%+ pour débloquer.</p>
                    <button class="btn btn-outline" disabled aria-disabled="true" style="margin-top: var(--space-6); opacity: 0.5;">Verrouillé</button>
                </article>`;
        }

        return `
            <article class="card module-card" aria-label="Module ${index + 1} : ${mod.title}">
                <div class="module-card__header">
                    <h3>${mod.icon ?? '📚'} ${mod.title}</h3>
                    <span class="module-card__badge" title="Progression du module">${modProgress}%</span>
                </div>
                <ul class="module-card__stats" role="list">
                    <li>
                        <span class="module-stat__label">Leçon</span>
                        <span class="module-stat__value" style="${state.lessons[mod.id] ? 'color: var(--accent-success);' : ''}">
                            ${state.lessons[mod.id] ? 'Lue ✓' : 'À lire'}
                        </span>
                    </li>
                    <li>
                        <span class="module-stat__label">Quiz</span>
                        <span class="module-stat__value" style="${quizColorStyle}">${quizText}</span>
                    </li>
                    <li>
                        <span class="module-stat__label">Flashcards</span>
                        <span class="module-stat__value">${knownCards}/${totalCards} acquises</span>
                    </li>
                </ul>
                <div class="module-card__progress">
                    <div class="progress-bar-container" style="height: 6px;">
                        <div class="progress-bar-fill" style="width: ${modProgress}%;"></div>
                    </div>
                </div>
                <div class="module-card__actions">
                    <button class="btn btn-primary" onclick="window.appNavigate('lesson', '${mod.id}')">
                        ${state.lessons[mod.id] ? 'Relire la leçon' : 'Commencer la leçon'}
                    </button>
                    ${state.lessons[mod.id] ? `
                        <button class="btn btn-outline" onclick="window.appNavigate('quiz', '${mod.id}')">Quiz</button>
                        <button class="btn btn-outline" onclick="window.appNavigate('flashcards', '${mod.id}')">Flashcards</button>
                    ` : ''}
                </div>
            </article>`;
    }).join('');

    container.innerHTML = `
        <section aria-label="Tableau de bord">
            <h2>Bienvenue sur votre Dashboard</h2>
            <p>Suivez votre progression et accédez à vos modules de révision.</p>

            <div class="card" style="margin-bottom: var(--space-6);">
                <h3>Progression globale</h3>
                <div class="progress-bar-container" style="height: 16px;">
                    <div class="progress-bar-fill" style="width: ${globalProgress}%;"></div>
                </div>
                <p style="margin-top: var(--space-2); text-align: right; font-weight: 600;">${globalProgress}% complété</p>
            </div>

            <h3>Modules disponibles</h3>
            <div class="dashboard-grid" role="list">
                ${moduleCardsHTML}
            </div>
        </section>
    `;
}
