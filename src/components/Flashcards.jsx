import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateFlashcard } from '../store.js';
import { MODULES } from '../data/modules_index.js';

export default function Flashcards({ moduleId }) {
    const state = useStore(appStore);
    const mod = MODULES.find(m => m.id === moduleId) ?? MODULES[0];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    if (mod.flashcards.length === 0) {
        return <p>Aucune flashcard disponible pour ce module.</p>;
    }

    const card = mod.flashcards[currentIndex];
    const fcState = state.flashcards[mod.id] ?? {};
    const previousStatus = fcState[currentIndex];

    const handleFlip = () => setIsFlipped(true);

    const handleEvaluate = (status) => {
        updateFlashcard(mod.id, currentIndex, status);
        setIsFlipped(false);
        if (currentIndex < mod.flashcards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setShowSummary(true);
        }
    };

    if (showSummary) {
        const total = mod.flashcards.length;
        const known = Object.values(fcState).filter(v => v === 'known').length;
        const pct = total > 0 ? Math.round((known / total) * 100) : 0;

        return (
            <div className="flashcards-summary">
                <h2>Session Terminée !</h2>
                <div className="card" style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                    <p className="quiz-result__score" style={{ color: 'var(--accent-success)' }}>{known} / {total}</p>
                    <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>cartes maîtrisées</p>
                    <div className="progress-bar-container" style={{ height: '12px', maxWidth: '400px', margin: 'var(--space-4) auto' }}>
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <p style={{ marginTop: 'var(--space-6)' }}>
                        {pct === 100
                            ? '🎉 Toutes les cartes maîtrisées ! Parfait !'
                            : 'Révisez les cartes marquées "À revoir" pour améliorer votre mémorisation.'}
                    </p>
                    <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refaire une session</button>
                        <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>Dashboard</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flashcards-container-view">
            <div className="flashcards-topbar">
                <h2>Flashcards : {mod.title}</h2>
                <span className="quiz-counter" aria-label={`Carte ${currentIndex + 1} sur ${mod.flashcards.length}`}>
                    {currentIndex + 1} / {mod.flashcards.length}
                </span>
            </div>

            <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${(currentIndex / mod.flashcards.length) * 100}%` }}></div>
            </div>

            <div className="flashcards-container">
                <div 
                    className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
                    onClick={handleFlip}
                    tabIndex="0"
                    role="button"
                    aria-label={`Carte ${currentIndex + 1} : ${card.front}. Appuyez pour révéler la réponse.`}
                >
                    <div className="flashcard-front">
                        {previousStatus === 'known' && <span className="fc-status fc-status--known">Déjà maîtrisée ✓</span>}
                        {previousStatus === 'unknown' && <span className="fc-status fc-status--unknown">À revoir ✗</span>}
                        <h3>{card.front}</h3>
                        <p className="flashcard-hint">Cliquez pour révéler la réponse</p>
                    </div>
                    <div className="flashcard-back">
                        <h3 className="flashcard-back__label">Réponse :</h3>
                        <p className="flashcard-back__content" dangerouslySetInnerHTML={{ __html: card.back.replace(/\n/g, '<br>') }} />
                    </div>
                </div>

                {isFlipped && (
                    <div className="flashcard-controls">
                        <button className="btn btn-danger" onClick={() => handleEvaluate('unknown')}>À revoir ❌</button>
                        <button className="btn btn-success" onClick={() => handleEvaluate('known')}>Je le savais ✅</button>
                    </div>
                )}
            </div>
        </div>
    );
}
