import React from 'react';
import { useStore } from '@nanostores/react';
import { appStore } from '../store.js';
import { MODULES } from '../data/modules_index.js';

export default function Dashboard() {
    const state = useStore(appStore);
    
    // Derived state: calculate global progress
    const getModuleProgress = (moduleId) => {
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

        // Add exercises to progress if they exist
        if (mod.exercises && mod.exercises.length > 0) {
            total++;
            const exState = state.exercises[moduleId] || {};
            const doneEx = Object.values(exState).filter(v => v === 'done').length;
            completed += doneEx / mod.exercises.length;
        }

        return Math.min(100, Math.round((completed / total) * 100));
    };

    const isModuleUnlocked = (index) => {
        // Force unlock all modules for quick access as requested
        return true;
    };

    const globalProgress = MODULES.length === 0 ? 0 : Math.round(
        MODULES.reduce((sum, mod) => sum + getModuleProgress(mod.id), 0) / MODULES.length
    );

    return (
        <section aria-label="Tableau de bord">
            <h2>Bienvenue sur votre Dashboard</h2>
            <p>Suivez votre progression et accédez à vos modules de révision.</p>

            <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Progression globale</h3>
                <div className="progress-bar-container" style={{ height: '16px' }}>
                    <div className="progress-bar-fill" style={{ width: `${globalProgress}%` }}></div>
                </div>
                <p style={{ marginTop: 'var(--space-2)', textAlign: 'right', fontWeight: 600 }}>{globalProgress}% complété</p>
            </div>

            <h3>Modules disponibles</h3>
            <div className="dashboard-grid" role="list">
                {MODULES.map((mod, index) => {
                    const unlocked = isModuleUnlocked(index);
                    const modProgress = getModuleProgress(mod.id);

                    const quizState = state.quizzes[mod.id];
                    let quizText = 'Non commencé';
                    let quizColorStyle = {};
                    if (quizState) {
                        const pct = Math.round((quizState.score / quizState.total) * 100);
                        quizText = `${quizState.score}/${quizState.total} (${pct}%)`;
                        quizColorStyle = { color: pct >= 70 ? 'var(--accent-success)' : 'var(--accent-warning)' };
                    }

                    const fcState = state.flashcards[mod.id] || {};
                    const knownCards = Object.values(fcState).filter(v => v === 'known').length;
                    const totalCards = mod.flashcards.length;

                    if (!unlocked) {
                        return (
                            <article key={mod.id} className="card module-card module-card--locked" aria-label={`Module verrouillé : ${mod.title}`}>
                                <div className="module-card__lock-icon" aria-hidden="true">🔒</div>
                                <h3>{mod.icon ?? '📚'} {mod.title}</h3>
                                <p className="module-card__lock-msg">Terminez le module précédent à 70%+ pour débloquer.</p>
                                <button className="btn btn-outline" disabled aria-disabled="true" style={{ marginTop: 'var(--space-6)', opacity: 0.5 }}>Verrouillé</button>
                            </article>
                        );
                    }

                    return (
                        <article key={mod.id} className="card module-card" aria-label={`Module ${index + 1} : ${mod.title}`}>
                            <div className="module-card__header">
                                <h3>{mod.icon ?? '📚'} {mod.title}</h3>
                                <span className="module-card__badge" title="Progression du module">{modProgress}%</span>
                            </div>
                            <ul className="module-card__stats" role="list">
                                <li>
                                    <span className="module-stat__label">Leçon</span>
                                    <span className="module-stat__value" style={state.lessons[mod.id] ? { color: 'var(--accent-success)' } : {}}>
                                        {state.lessons[mod.id] ? 'Lue ✓' : 'À lire'}
                                    </span>
                                </li>
                                <li>
                                    <span className="module-stat__label">Quiz</span>
                                    <span className="module-stat__value" style={quizColorStyle}>{quizText}</span>
                                </li>
                                <li>
                                    <span className="module-stat__label">Flashcards</span>
                                    <span className="module-stat__value">{knownCards}/{totalCards} acquises</span>
                                </li>
                            </ul>
                            <div className="module-card__progress">
                                <div className="progress-bar-container" style={{ height: '6px' }}>
                                    <div className="progress-bar-fill" style={{ width: `${modProgress}%` }}></div>
                                </div>
                            </div>
                            <div className="module-card__actions">
                                <a href={`/${mod.id}/lesson`} className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                                    {state.lessons[mod.id] ? 'Relire la leçon' : 'Commencer la leçon'}
                                </a>
                                {state.lessons[mod.id] && (
                                    <>
                                        <a href={`/${mod.id}/quiz`} className="btn btn-outline" style={{ textDecoration: 'none', marginLeft: 'var(--space-2)' }}>Quiz</a>
                                        <a href={`/${mod.id}/flashcards`} className="btn btn-outline" style={{ textDecoration: 'none', marginLeft: 'var(--space-2)' }}>Flashcards</a>
                                        {mod.exercises && mod.exercises.length > 0 && (
                                            <a href={`/${mod.id}/exercises`} className="btn btn-outline" style={{ textDecoration: 'none', marginLeft: 'var(--space-2)', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>Exercices</a>
                                        )}
                                    </>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
