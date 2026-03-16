import { MODULES } from '../data/modules_index.js';
import { loadState, saveState } from '../state.js';

let currentCardIndex = 0;

/**
 * Renders the flashcard view for a given moduleId.
 * @param {HTMLElement} container
 * @param {string} moduleId
 */
export function renderFlashcards(container, moduleId) {
    const mod = MODULES.find(m => m.id === moduleId) ?? MODULES[0];

    if (mod.flashcards.length === 0) {
        container.innerHTML = `<p>Aucune flashcard disponible pour ce module.</p>`;
        return;
    }

    currentCardIndex = 0;
    renderCard(container, mod);
}

function renderCard(container, mod) {
    const state = loadState();
    const fcState = state.flashcards[mod.id] ?? {};

    if (currentCardIndex >= mod.flashcards.length) {
        renderEndSummary(container, mod, fcState);
        return;
    }

    const card = mod.flashcards[currentCardIndex];
    const previousStatus = fcState[currentCardIndex];

    let statusBadge = '';
    if (previousStatus === 'known') {
        statusBadge = `<span class="fc-status fc-status--known" aria-label="Déjà maîtrisée">Déjà maîtrisée ✓</span>`;
    } else if (previousStatus === 'unknown') {
        statusBadge = `<span class="fc-status fc-status--unknown" aria-label="À revoir">À revoir ✗</span>`;
    }

    container.innerHTML = `
        <div class="flashcards-topbar">
            <h2>Flashcards : ${mod.title}</h2>
            <span class="quiz-counter" aria-label="Carte ${currentCardIndex + 1} sur ${mod.flashcards.length}">
                ${currentCardIndex + 1} / ${mod.flashcards.length}
            </span>
        </div>

        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${(currentCardIndex / mod.flashcards.length) * 100}%;"></div>
        </div>

        <div class="flashcards-container">
            <div class="flashcard" id="flashcard-element" tabindex="0" role="button"
                 aria-label="Carte ${currentCardIndex + 1} : ${card.front}. Appuyez pour révéler la réponse.">
                <div class="flashcard-front">
                    ${statusBadge}
                    <h3>${card.front}</h3>
                    <p class="flashcard-hint">Cliquez pour révéler la réponse</p>
                </div>
                <div class="flashcard-back">
                    <h3 class="flashcard-back__label">Réponse :</h3>
                    <p class="flashcard-back__content">${card.back.replace(/\n/g, '<br>')}</p>
                </div>
            </div>

            <div class="flashcard-controls" id="flashcard-controls" hidden aria-hidden="true">
                <button class="btn btn-danger" id="btn-dont-know" aria-label="Je ne savais pas — marquer à revoir">À revoir ❌</button>
                <button class="btn btn-success" id="btn-know" aria-label="Je savais — marquer comme maîtrisée">Je le savais ✅</button>
            </div>
        </div>
    `;

    const cardElement = document.getElementById('flashcard-element');
    const controlsContainer = document.getElementById('flashcard-controls');

    let isFlipped = false;

    const flipCard = () => {
        if (!isFlipped) {
            cardElement.classList.add('flipped');
            cardElement.setAttribute('aria-label', `Réponse : ${card.back}`);
            isFlipped = true;
            controlsContainer.hidden = false;
            controlsContainer.removeAttribute('aria-hidden');
        }
    };

    cardElement.addEventListener('click', flipCard);
    cardElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flipCard();
        }
    });

    const evaluateCard = (status) => {
        if (!state.flashcards[mod.id]) state.flashcards[mod.id] = {};
        state.flashcards[mod.id][currentCardIndex] = status;
        saveState(state);
        currentCardIndex++;
        setTimeout(() => renderCard(container, mod), 150);
    };

    document.getElementById('btn-know').addEventListener('click', () => evaluateCard('known'));
    document.getElementById('btn-dont-know').addEventListener('click', () => evaluateCard('unknown'));
}

function renderEndSummary(container, mod, fcState) {
    const total = mod.flashcards.length;
    const known = Object.values(fcState).filter(v => v === 'known').length;
    const pct = total > 0 ? Math.round((known / total) * 100) : 0;

    container.innerHTML = `
        <h2>Session Terminée !</h2>
        <div class="card" style="text-align: center; margin-top: var(--space-6);">
            <p class="quiz-result__score" style="color: var(--accent-success);">${known} / ${total}</p>
            <p style="margin-bottom: var(--space-4); color: var(--text-secondary);">cartes maîtrisées</p>
            <div class="progress-bar-container" style="height: 12px; max-width: 400px; margin: var(--space-4) auto;">
                <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
            <p style="margin-top: var(--space-6);">
                ${pct === 100
                    ? '🎉 Toutes les cartes maîtrisées ! Parfait !'
                    : 'Révisez les cartes marquées "À revoir" pour améliorer votre mémorisation.'}
            </p>
            <div style="margin-top: var(--space-8); display: flex; justify-content: center; gap: var(--space-4); flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="window.appNavigate('flashcards', '${mod.id}')">Refaire une session</button>
                <button class="btn btn-outline" onclick="window.appNavigate('dashboard')">Dashboard</button>
            </div>
        </div>
    `;
}
