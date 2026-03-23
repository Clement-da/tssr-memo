import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateExerciseStatus } from '../store.js';

export default function Exercises({ module }) {
    const state = useStore(appStore);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);

    const exercises = module.exercises || [];
    const moduleId = module.id;
    const exerciseProgress = state.exercises[moduleId] || {};

    const handleSelect = (ex) => {
        setSelectedExercise(ex);
        setShowCorrection(false);
        setUserInput('');
        setFeedback(null);
    };

    const normalize = (str) => str.toLowerCase().trim().replace(/\s+/g, ' ');

    const checkAnswer = () => {
        if (!userInput.trim()) return;

        const correct = selectedExercise.correction;
        const input = userInput.trim();

        if (input === correct) {
            setFeedback({ type: 'success', message: '✅ Parfait ! Réponse exacte.' });
            updateExerciseStatus(moduleId, selectedExercise.id, 'done');
        } else if (normalize(input) === normalize(correct)) {
            setFeedback({ 
                type: 'warning', 
                message: `⚠️ C'est la bonne réponse sur le fond, mais attention : Linux est "Case Sensitive" (sensible à la casse).\nLa réponse exacte est : ${correct}` 
            });
            updateExerciseStatus(moduleId, selectedExercise.id, 'done');
        } else {
            // Simple check for partial match / typos (simplistic fuzzy)
            const inputLower = normalize(input);
            const correctLower = normalize(correct);
            
            if (correctLower.includes(inputLower) && inputLower.length > 3) {
                setFeedback({ type: 'info', message: '🔍 Tu brûles ! Ta réponse est incomplète ou comporte une petite erreur.' });
            } else {
                setFeedback({ type: 'error', message: '❌ Ce n\'est pas tout à fait ça. Réessaie ou regarde la correction.' });
            }
        }
    };

    const toggleDone = (exId) => {
        const isDone = exerciseProgress[exId] === 'done';
        updateExerciseStatus(moduleId, exId, isDone ? 'todo' : 'done');
    };

    const renderStars = (count) => {
        return '⭐'.repeat(count);
    };

    return (
        <div className="exercises-container">
            <div className="exercises-sidebar card">
                <h3>Exercices</h3>
                <ul className="exercises-list" role="list">
                    {exercises.map((ex) => {
                        const isDone = exerciseProgress[ex.id] === 'done';
                        return (
                            <li key={ex.id}>
                                <button 
                                    className={`exercise-item ${selectedExercise?.id === ex.id ? 'active' : ''}`}
                                    onClick={() => handleSelect(ex)}
                                >
                                    <span className="exercise-status">{isDone ? '✅' : '📝'}</span>
                                    <span className="exercise-title">{ex.title}</span>
                                    <span className="exercise-stars">{renderStars(ex.stars)}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="exercise-content">
                {selectedExercise ? (
                    <article className="card exercise-detail animate-fade-in">
                        <div className="exercise-header">
                            <div>
                                <h2>{selectedExercise.title}</h2>
                                <p className="exercise-desc">{selectedExercise.description}</p>
                            </div>
                            <div className="exercise-meta">
                                <span className="difficulty">Difficulté : {renderStars(selectedExercise.stars)}</span>
                            </div>
                        </div>

                        <div className="exercise-body">
                            <section className="exercise-section">
                                <h3>Énoncé</h3>
                                <p className="instruction-text">{selectedExercise.instruction}</p>
                            </section>

                            <section className="exercise-section">
                                <h3>Ta réponse</h3>
                                <div className="response-group">
                                    <input 
                                        type="text" 
                                        className="response-input"
                                        placeholder="Saisissez votre réponse ici..."
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                                    />
                                    <button className="btn btn-primary" onClick={checkAnswer}>Valider</button>
                                </div>
                                {feedback && (
                                    <div className={`feedback-message ${feedback.type} animate-slide-up`}>
                                        {feedback.message}
                                    </div>
                                )}
                            </section>

                            <section className="exercise-section">
                                <button 
                                    className="btn btn-link" 
                                    onClick={() => setShowCorrection(!showCorrection)}
                                >
                                    💡 {showCorrection ? 'Cacher l\'indice et la correction' : 'Besoin d\'un indice ou de la correction ?'}
                                </button>
                                
                                {showCorrection && (
                                    <div className="correction-box animate-fade-in">
                                        <p className="hint-text"><strong>Indice :</strong> {selectedExercise.hint}</p>
                                        <div className="correction-content">
                                            <h3>Correction officielle</h3>
                                            <pre className="code-block language-bash">
                                                <code>{selectedExercise.correction}</code>
                                            </pre>
                                            <h4>Pourquoi ?</h4>
                                            <p>{selectedExercise.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    </article>
                ) : (
                    <div className="card empty-state">
                        <div className="welcome-exercise">
                            <span className="welcome-icon">👨‍💻</span>
                            <h3>Prêt pour la pratique ?</h3>
                            <p>Sélectionnez un exercice pour tester vos connaissances sur les services Linux.</p>
                        </div>
                    </div>
                )}
            </div>


            <style jsx>{`
                .exercises-container {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: var(--space-6);
                    align-items: start;
                }

                .exercises-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .exercise-item {
                    width: 100%;
                    text-align: left;
                    padding: var(--space-3);
                    border: none;
                    background: transparent;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    border-radius: var(--radius-md);
                    transition: background 0.2s;
                    margin-bottom: var(--space-1);
                }

                .exercise-item:hover {
                    background: var(--bg-secondary);
                }

                .exercise-item.active {
                    background: var(--accent-primary);
                    color: white;
                }

                .exercise-title {
                    flex: 1;
                    font-weight: 500;
                }

                .exercise-stars {
                    font-size: 0.8em;
                    opacity: 0.8;
                }

                .exercise-header {
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: var(--space-4);
                    margin-bottom: var(--space-4);
                }

                .exercise-desc {
                    color: var(--text-secondary);
                    font-size: 0.95em;
                }

                .exercise-meta {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                }

                .exercise-section {
                    margin-bottom: var(--space-8);
                }

                .instruction-text {
                    font-size: 1.1em;
                    background: var(--bg-secondary);
                    padding: var(--space-4);
                    border-left: 4px solid var(--accent-primary);
                    border-radius: var(--radius-sm);
                    color: var(--text-primary);
                }

                .response-group {
                    display: flex;
                    gap: var(--space-2);
                    margin-bottom: var(--space-4);
                }

                .response-input {
                    flex: 1;
                    padding: var(--space-3);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-md);
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    font-family: var(--font-mono);
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                .response-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                }

                .feedback-message {
                    padding: var(--space-4);
                    border-radius: var(--radius-md);
                    margin-top: var(--space-3);
                    font-weight: 500;
                    white-space: pre-line;
                }

                .feedback-message.success {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                    border: 1px solid #22c55e;
                }

                .feedback-message.warning {
                    background: rgba(234, 179, 8, 0.1);
                    color: #eab308;
                    border: 1px solid #eab308;
                }

                .feedback-message.info {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    border: 1px solid #3b82f6;
                }

                .feedback-message.error {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid #ef4444;
                }

                .btn-link {
                    background: none;
                    border: none;
                    color: var(--accent-primary);
                    text-decoration: underline;
                    cursor: pointer;
                    padding: 0;
                    font-size: 1em;
                }

                .correction-box {
                    margin-top: var(--space-4);
                    padding: var(--space-4);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                }

                .hint-text {
                    font-style: italic;
                    color: var(--text-secondary);
                    margin-bottom: var(--space-4);
                }

                .welcome-exercise {
                    text-align: center;
                }

                .welcome-icon {
                    font-size: 4rem;
                    display: block;
                    margin-bottom: var(--space-4);
                }

                .empty-state {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                    color: var(--text-secondary);
                }

                @media (max-width: 768px) {
                    .exercises-container {
                        grid-template-columns: 1fr;
                    }
                }

                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                .animate-slide-up { animation: slideUp 0.3s ease-out; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </div>
    );
}
