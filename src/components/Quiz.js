import { MODULES } from '../data/modules_index.js';
import { loadState, saveState } from '../state.js';

let currentQuestionIndex = 0;
let score = 0;
let currentModuleId = null;

/**
 * Renders the quiz view for a given moduleId.
 * @param {HTMLElement} container
 * @param {string} moduleId
 */
export function renderQuiz(container, moduleId) {
    const mod = MODULES.find(m => m.id === moduleId) ?? MODULES[0];
    currentModuleId = mod.id;
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion(container, mod);
}

function renderQuestion(container, mod) {
    if (currentQuestionIndex >= mod.quiz.length) {
        renderResults(container, mod);
        return;
    }

    const questionObj = mod.quiz[currentQuestionIndex];

    container.innerHTML = `
        <div class="quiz-topbar">
            <h2>Quiz : ${mod.title}</h2>
            <span class="quiz-counter" aria-label="Question ${currentQuestionIndex + 1} sur ${mod.quiz.length}">
                ${currentQuestionIndex + 1} / ${mod.quiz.length}
            </span>
        </div>

        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${(currentQuestionIndex / mod.quiz.length) * 100}%;"></div>
        </div>

        <div class="card">
            <h3 id="question-text">${questionObj.question}</h3>

            <div class="quiz-options" id="quiz-options" role="group" aria-labelledby="question-text">
                ${questionObj.options.map((opt, index) => `
                    <button class="quiz-option" data-index="${index}" aria-label="Réponse ${index + 1}: ${opt}">
                        <span class="quiz-option__number">${index + 1}</span>
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>

            <div id="quiz-feedback" class="quiz-feedback" aria-live="polite"></div>

            <div id="next-btn-container" style="margin-top: var(--space-6); text-align: right; display: none;">
                <button id="btn-next-question" class="btn btn-primary">Question suivante →</button>
            </div>
        </div>
    `;

    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtnContainer = document.getElementById('next-btn-container');
    const btnNext = document.getElementById('btn-next-question');

    optionsContainer.addEventListener('click', (e) => {
        const optionBtn = e.target.closest('.quiz-option');
        if (!optionBtn || optionsContainer.classList.contains('answered')) return;

        const selectedIndex = parseInt(optionBtn.dataset.index, 10);
        const { correctIndex, explanation } = questionObj;
        const isCorrect = selectedIndex === correctIndex;

        optionsContainer.classList.add('answered');
        optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            const i = parseInt(btn.dataset.index, 10);
            if (i === correctIndex) btn.classList.add('correct');
            else if (i === selectedIndex) btn.classList.add('incorrect');
        });

        feedbackEl.innerHTML = `<strong>${isCorrect ? '✅ Correct !' : '❌ Faux !'}</strong><br>${explanation}`;
        feedbackEl.className = `quiz-feedback visible ${isCorrect ? 'success' : 'error'}`;

        if (isCorrect) score++;
        nextBtnContainer.style.display = 'block';

        // Last question: change button label
        if (currentQuestionIndex === mod.quiz.length - 1) {
            btnNext.textContent = 'Voir les résultats →';
        }
    });

    btnNext.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion(container, mod);
    });
}

function renderResults(container, mod) {
    const state = loadState();
    const prevQuiz = state.quizzes[mod.id];
    if (!prevQuiz || score > prevQuiz.score) {
        state.quizzes[mod.id] = { score, total: mod.quiz.length };
        saveState(state);
    }

    const percentage = Math.round((score / mod.quiz.length) * 100);
    const passed = percentage >= 70;

    container.innerHTML = `
        <h2>Résultats du Quiz</h2>
        <div class="card" style="text-align: center; margin-top: var(--space-6);">
            <p class="quiz-result__score" style="color: ${passed ? 'var(--accent-success)' : 'var(--accent-danger)'};">
                ${score} / ${mod.quiz.length}
            </p>
            <p class="quiz-result__percent" style="color: ${passed ? 'var(--accent-success)' : 'var(--accent-warning)'};">
                ${percentage}%
            </p>
            <p style="margin-top: var(--space-4);">
                ${passed
                    ? '🎉 Excellent travail ! Vous maîtrisez ce quiz.'
                    : '📖 Relisez la leçon et réessayez pour atteindre 70%.'}
            </p>
            <div style="margin-top: var(--space-8); display: flex; justify-content: center; gap: var(--space-4); flex-wrap: wrap;">
                <button class="btn btn-outline" onclick="window.appNavigate('lesson', '${mod.id}')">Relire la leçon</button>
                <button class="btn btn-primary" onclick="window.appNavigate('quiz', '${mod.id}')">Refaire le Quiz</button>
                <button class="btn btn-outline" onclick="window.appNavigate('flashcards', '${mod.id}')">Flashcards</button>
                <button class="btn btn-outline" onclick="window.appNavigate('dashboard')">Dashboard</button>
            </div>
        </div>
    `;
}
