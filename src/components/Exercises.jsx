import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateExerciseStatus, addXP } from '../store.js';

export default function Exercises({ module }) {
    const state = useStore(appStore);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);

    const [generatedScenario, setGeneratedScenario] = useState(null);

    // Sort by difficulty (Ascending)
    const exercisesSorted = [...(module.exercises || [])].sort((a, b) => {
        if (a.isGenerator) return 1;
        if (b.isGenerator) return -1;
        return a.stars - b.stars;
    });

    const moduleId = module.id;
    const exerciseProgress = state.exercises[moduleId] || {};

    const handleSelect = (ex) => {
        setSelectedExercise(ex);
        setShowCorrection(false);
        setShowHint(false);
        setUserInput('');
        setFeedback(null);
        
        if (ex.isGenerator && ex.scenarios) {
            const randomScenario = ex.scenarios[Math.floor(Math.random() * ex.scenarios.length)];
            setGeneratedScenario(randomScenario);
        } else {
            setGeneratedScenario(null);
        }
    };

    const handleGenerateNew = () => {
        if (selectedExercise?.isGenerator && selectedExercise.scenarios) {
            const otherScenarios = selectedExercise.scenarios.filter(s => s.instruction !== generatedScenario?.instruction);
            const pool = otherScenarios.length > 0 ? otherScenarios : selectedExercise.scenarios;
            const randomScenario = pool[Math.floor(Math.random() * pool.length)];
            setGeneratedScenario(randomScenario);
            setShowCorrection(false);
            setShowHint(false);
            setUserInput('');
            setFeedback(null);
        }
    };

    const normalize = (str) => str.toLowerCase().trim().replace(/['"`]/g, '').replace(/\s+/g, ' ');

    const checkAnswer = () => {
        if (!userInput.trim()) return;

        const currentEx = generatedScenario || selectedExercise;
        const correct = currentEx.correction;
        const input = userInput.trim();
        
        const inputNorm = normalize(input);
        const correctNorm = normalize(correct);
        if (inputNorm === correctNorm) {
            // Only award XP if the exercise was not already done
            if (exerciseProgress[selectedExercise.id] !== 'done') {
                addXP(25);
                setFeedback({ 
                    type: 'success', 
                    message: input === correct 
                        ? '✅ Parfait (+25 XP) ! Réponse exacte.' 
                        : `✅ Juste (+25 XP) ! Attention aux détails (casse, espaces).\nLa forme exacte était : "${correct}"`
                });
            }
            updateExerciseStatus(moduleId, selectedExercise.id, 'done');
        } else {
            // Nuanced feedback
            if (correctNorm.includes(inputNorm) && inputNorm.length > 3) {
                setFeedback({ 
                    type: 'warning', 
                    message: `⚠️ Presque ! Ta réponse est sur la bonne voie mais incomplète.\nIndice : ${currentEx.hint}` 
                });
            } else if (inputNorm.split(/[\s-]+/).some(word => word.length > 4 && correctNorm.includes(word))) {
                 setFeedback({ 
                    type: 'info', 
                    message: `🔍 Tu brûles ! Un ou plusieurs termes techniques sont corrects, mais la réponse globale est erronée.` 
                });
            } else {
                setFeedback({ type: 'error', message: '❌ Ce n\'est pas tout à fait ça. Relisez bien l\'énoncé ou utilisez un indice.' });
            }
        }
    };

    const renderStars = (count) => {
        return '⭐'.repeat(count);
    };

    const currentDisplay = generatedScenario || selectedExercise;

    return (
        <div className="exercises-container">
            <div className="exercises-sidebar card">
                <h3>Scénarios disponibles</h3>
                <ul className="exercises-list" role="list">
                    {exercisesSorted.map((ex) => {
                        const isDone = exerciseProgress[ex.id] === 'done';
                        const isGenerator = ex.isGenerator;
                        return (
                            <li key={ex.id}>
                                <button 
                                    className={`exercise-item ${selectedExercise?.id === ex.id ? 'active' : ''} ${isGenerator ? 'generator-item' : ''}`}
                                    onClick={() => handleSelect(ex)}
                                >
                                    <span className="exercise-status">{isGenerator ? '🎲' : (isDone ? '✅' : '📝')}</span>
                                    <span className="exercise-title">{ex.title}</span>
                                    {!isGenerator && <span className="exercise-stars">{renderStars(ex.stars)}</span>}
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
                                <div className="title-row">
                                    <h2>{selectedExercise.title}</h2>
                                    {selectedExercise.isGenerator && (
                                        <button className="btn btn-generator" onClick={handleGenerateNew}>
                                            🔄 Autre variante
                                        </button>
                                    )}
                                </div>
                                <p className="exercise-desc">{selectedExercise.description}</p>
                            </div>
                            {!selectedExercise.isGenerator && (
                                <div className="exercise-meta">
                                    <span className="difficulty">Difficulté : {renderStars(selectedExercise.stars)}</span>
                                </div>
                            )}
                        </div>

                        <div className="exercise-body">
                            <section className="exercise-section">
                                <h3 className="section-title">🛠️ Mise en situation</h3>
                                <div className="instruction-card">
                                    <p className="instruction-text">{currentDisplay.instruction}</p>
                                </div>
                            </section>

                            <section className="exercise-section">
                                <h3 className="section-title">⌨️ Votre Réponse</h3>
                                <div className="response-layout">
                                    <div className="response-group">
                                        <input 
                                            type="text" 
                                            className="response-input"
                                            placeholder="Saisissez votre commande ou explication..."
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                                        />
                                        <div className="action-buttons">
                                            <button className="btn btn-primary" onClick={checkAnswer}>Valider</button>
                                            <button className={`btn btn-hint ${showHint ? 'active' : ''}`} onClick={() => setShowHint(!showHint)}>
                                                💡 Indice
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {showHint && (
                                        <div className="hint-box animate-slide-up">
                                            <strong>Aide :</strong> {currentDisplay.hint || "Analysez bien les protocoles cités dans le scénario."}
                                        </div>
                                    )}

                                    {feedback && (
                                        <div className={`feedback-message ${feedback.type} animate-slide-up`}>
                                            {feedback.message}
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section className="exercise-section">
                                <div className="correction-actions">
                                    <button 
                                        className="btn btn-correction-toggle" 
                                        onClick={() => setShowCorrection(!showCorrection)}
                                    >
                                        {showCorrection ? '🙈 Masquer la solution' : '🔑 Voir la correction technique'}
                                    </button>
                                </div>
                                
                                {showCorrection && (
                                    <div className="correction-box animate-fade-in">
                                        <div className="correction-content">
                                            <h3 className="section-title">Solution attendue</h3>
                                            <div className="code-container">
                                                <pre className="code-block language-bash">
                                                    <code>{currentDisplay.correction}</code>
                                                </pre>
                                            </div>
                                            <div className="explanation-section">
                                                <h4>Explication technique</h4>
                                                <p>{currentDisplay.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    </article>
                ) : (
                    <div className="card empty-state">
                        <div className="welcome-exercise">
                            <span className="welcome-icon">⚡</span>
                            <h3>Prêt pour l'action ?</h3>
                            <p>Sélectionnez un scénario technique pour tester vos compétences de terrain.</p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .exercises-container {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: var(--space-6);
                    align-items: start;
                }

                .exercises-sidebar {
                    height: calc(100vh - 250px);
                    display: flex;
                    flex-direction: column;
                    padding: var(--space-4);
                    position: sticky;
                    top: var(--space-4);
                }

                .exercises-sidebar h3 {
                    margin-bottom: var(--space-4);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-secondary);
                }

                .exercises-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    overflow-y: auto;
                    flex: 1;
                    padding-right: var(--space-2);
                }

                .exercises-list::-webkit-scrollbar { width: 4px; }
                .exercises-list::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

                .exercise-item {
                    width: 100%;
                    text-align: left;
                    padding: var(--space-3) var(--space-4);
                    border: 1px solid transparent;
                    background: var(--bg-surface-hover);
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    border-radius: var(--radius-md);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: var(--space-2);
                }

                .exercise-item:hover {
                    border-color: var(--accent-primary);
                    background: var(--bg-tertiary);
                    transform: translateX(4px);
                }

                .exercise-item.active {
                    background: var(--accent-primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .exercise-title {
                    flex: 1;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .exercise-stars { font-size: 0.7rem; opacity: 0.8; }
                
                .btn-generator {
                    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                    color: #ffffff !important;
                    border: none;
                    padding: var(--space-2) var(--space-4);
                    border-radius: var(--radius-md);
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: var(--space-2);
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 0.05em;
                }

                .btn-generator:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
                    filter: brightness(1.1);
                }

                .exercise-detail { padding: var(--space-8); }

                .title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-2);
                }

                .title-row h2 {
                    font-size: 2rem;
                    background: linear-gradient(135deg, var(--accent-primary), #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0;
                }

                .exercise-desc { color: var(--text-secondary); font-size: 1.1rem; }

                .instruction-card {
                    background: var(--bg-tertiary);
                    padding: var(--space-6);
                    border-radius: var(--radius-lg);
                    border-left: 6px solid var(--accent-primary);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                }

                .instruction-text { font-size: 1.2rem; line-height: 1.6; color: var(--text-primary); }

                .section-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: var(--space-4);
                    color: var(--text-primary);
                    opacity: 0.9;
                }

                .response-layout { display: flex; flex-direction: column; gap: var(--space-4); }

                .response-group { display: flex; gap: var(--space-4); }

                .response-input {
                    flex: 1;
                    padding: var(--space-4);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-md);
                    background: var(--bg-base);
                    color: var(--text-primary);
                    font-family: var(--font-mono);
                    font-size: 1.1rem;
                    transition: all 0.2s;
                }

                .response-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.1);
                }

                .action-buttons { display: flex; gap: var(--space-2); }

                .btn-hint {
                    background: transparent;
                    border: 2px solid var(--border-color);
                    color: var(--text-secondary);
                    padding: 0 var(--space-4);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-hint:hover, .btn-hint.active {
                    color: #fbbf24;
                    border-color: #fbbf24;
                    background: rgba(251, 191, 36, 0.05);
                }

                .hint-box {
                    padding: var(--space-4);
                    background: rgba(251, 191, 36, 0.1);
                    border: 1px solid rgba(251, 191, 36, 0.3);
                    border-radius: var(--radius-md);
                    color: #d97706;
                }

                .feedback-message {
                    padding: var(--space-4) var(--space-6);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    white-space: pre-line;
                    border: 1px solid;
                }

                .feedback-message.success { background: rgba(34, 197, 94, 0.1); color: #22c55e; border-color: rgba(34, 197, 94, 0.3); }
                .feedback-message.warning { background: rgba(234, 179, 8, 0.1); color: #ca8a04; border-color: rgba(234, 179, 8, 0.3); }
                .feedback-message.info { background: rgba(59, 130, 246, 0.1); color: #2563eb; border-color: rgba(59, 130, 246, 0.3); }
                .feedback-message.error { background: rgba(239, 68, 68, 0.1); color: #dc2626; border-color: rgba(239, 68, 68, 0.3); }

                .btn-correction-toggle {
                    width: 100%;
                    padding: var(--space-4);
                    background: var(--bg-tertiary);
                    border: 1px dashed var(--border-color);
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-correction-toggle:hover { background: var(--bg-surface-hover); color: var(--text-primary); }

                .correction-box {
                    margin-top: var(--space-4);
                    padding: var(--space-6);
                    background: var(--bg-tertiary);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                }

                .code-block {
                    background: #1e1e1e;
                    padding: var(--space-4);
                    border-radius: var(--radius-md);
                    color: #d4d4d4;
                    font-size: 1.1rem;
                    overflow-x: auto;
                }

                .explanation-section h4 { color: var(--accent-primary); margin-bottom: var(--space-2); }
                .explanation-section p { color: var(--text-secondary); line-height: 1.6; margin: 0; }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 500px;
                    color: var(--text-secondary);
                }

                .welcome-icon { font-size: 5rem; margin-bottom: var(--space-6); }

                @media (max-width: 992px) {
                    .exercises-container { grid-template-columns: 1fr; }
                    .exercises-sidebar { height: auto; position: static; }
                }

                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                .animate-slide-up { animation: slideUp 0.3s ease-out; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
