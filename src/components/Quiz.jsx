import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateQuizScore } from '../store.js';
import { MODULES } from '../data/modules_index.js';

export default function Quiz({ moduleId }) {
    const state = useStore(appStore);
    const mod = MODULES.find(m => m.id === moduleId) ?? MODULES[0];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const questionObj = mod.quiz[currentIndex];

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === questionObj.correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < mod.quiz.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Save score
            const prevQuiz = state.quizzes[mod.id];
            if (!prevQuiz || (score + (selectedOption === questionObj.correctIndex ? 1 : 0)) > prevQuiz.score) {
                // We need the final score here
                const finalScore = score + (selectedOption === questionObj.correctIndex ? 1 : 0);
                updateQuizScore(mod.id, finalScore, mod.quiz.length);
            }
            setShowResults(true);
        }
    };

    if (showResults) {
        const finalScore = state.quizzes[mod.id]?.score ?? score;
        const percentage = Math.round((finalScore / mod.quiz.length) * 100);
        const passed = percentage >= 70;

        return (
            <div className="quiz-results">
                <h2>Résultats du Quiz</h2>
                <div className="card" style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                    <p className="quiz-result__score" style={{ color: passed ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                        {finalScore} / {mod.quiz.length}
                    </p>
                    <p className="quiz-result__percent" style={{ color: passed ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
                        {percentage}%
                    </p>
                    <p style={{ marginTop: 'var(--space-4)' }}>
                        {passed
                            ? '🎉 Excellent travail ! Vous maîtrisez ce quiz.'
                            : '📖 Relisez la leçon et réessayez pour atteindre 70%.'}
                    </p>
                    <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <a href={`/${mod.id}/lesson`} className="btn btn-outline" style={{ textDecoration: 'none' }}>Relire la leçon</a>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refaire le Quiz</button>
                        <a href={`/${mod.id}/flashcards`} className="btn btn-outline" style={{ textDecoration: 'none' }}>Flashcards</a>
                        <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>Dashboard</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-topbar">
                <h2>Quiz : {mod.title}</h2>
                <span className="quiz-counter" aria-label={`Question ${currentIndex + 1} sur ${mod.quiz.length}`}>
                    {currentIndex + 1} / {mod.quiz.length}
                </span>
            </div>

            <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${(currentIndex / mod.quiz.length) * 100}%` }}></div>
            </div>

            <div className="card">
                <h3 id="question-text">{questionObj.question}</h3>

                <div className={`quiz-options ${isAnswered ? 'answered' : ''}`} role="group" aria-labelledby="question-text">
                    {questionObj.options.map((opt, index) => {
                        let className = "quiz-option";
                        if (isAnswered) {
                            if (index === questionObj.correctIndex) className += " correct";
                            else if (index === selectedOption) className += " incorrect";
                        }
                        return (
                            <button 
                                key={index}
                                className={className} 
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                aria-label={`Réponse ${index + 1}: ${opt}`}
                            >
                                <span className="quiz-option__number">{index + 1}</span>
                                <span>{opt}</span>
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className={`quiz-feedback visible ${selectedOption === questionObj.correctIndex ? 'success' : 'error'}`} aria-live="polite">
                        <strong>{selectedOption === questionObj.correctIndex ? '✅ Correct !' : '❌ Faux !'}</strong><br />
                        {questionObj.explanation}
                    </div>
                )}

                {isAnswered && (
                    <div style={{ marginTop: 'var(--space-6)', textAlign: 'right' }}>
                        <button className="btn btn-primary" onClick={handleNext}>
                            {currentIndex === mod.quiz.length - 1 ? 'Voir les résultats →' : 'Question suivante →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
