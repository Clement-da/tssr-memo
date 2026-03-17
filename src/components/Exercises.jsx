import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateExerciseStatus } from '../store.js';

export default function Exercises({ module }) {
    const state = useStore(appStore);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);

    const exercises = module.exercises || [];
    const moduleId = module.id;
    const exerciseProgress = state.exercises[moduleId] || {};

    const handleSelect = (ex) => {
        setSelectedExercise(ex);
        setShowCorrection(false);
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
                    <article className="card exercise-detail">
                        <div className="exercise-header">
                            <h2>{selectedExercise.title}</h2>
                            <div className="exercise-meta">
                                <span className="difficulty">Difficulté : {renderStars(selectedExercise.stars)}</span>
                                <button 
                                    className={`btn ${exerciseProgress[selectedExercise.id] === 'done' ? 'btn-success' : 'btn-outline'}`}
                                    onClick={() => toggleDone(selectedExercise.id)}
                                >
                                    {exerciseProgress[selectedExercise.id] === 'done' ? 'Terminé' : 'Marquer comme fait'}
                                </button>
                            </div>
                        </div>

                        <div className="exercise-body">
                            <section className="exercise-section">
                                <h3>Objectif</h3>
                                <p>{selectedExercise.description}</p>
                            </section>

                            <section className="exercise-section">
                                <h3>Énoncé</h3>
                                <p className="instruction-text">{selectedExercise.instruction}</p>
                            </section>

                            <section className="exercise-section">
                                <h3>Indice</h3>
                                <p className="hint-text">💡 {selectedExercise.hint}</p>
                            </section>

                            <div className="correction-area">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => setShowCorrection(!showCorrection)}
                                >
                                    {showCorrection ? 'Cacher la correction' : 'Voir la correction'}
                                </button>

                                {showCorrection && (
                                    <div className="correction-content animate-fade-in">
                                        <h3>Correction</h3>
                                        <pre className="code-block language-powershell">
                                            <code>{selectedExercise.correction}</code>
                                        </pre>
                                        <h4>Explication</h4>
                                        <p>{selectedExercise.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                ) : (
                    <div className="card empty-state">
                        <p>Sélectionnez un exercice dans la liste pour commencer.</p>
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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: var(--space-4);
                    margin-bottom: var(--space-4);
                }

                .exercise-meta {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                }

                .exercise-section {
                    margin-bottom: var(--space-6);
                }

                .instruction-text {
                    font-size: 1.1em;
                    background: var(--bg-tertiary);
                    padding: var(--space-4);
                    border-left: 4px solid var(--accent-primary);
                    border-radius: var(--radius-sm);
                }

                .hint-text {
                    font-style: italic;
                    color: var(--text-secondary);
                }

                .correction-area {
                    margin-top: var(--space-8);
                    padding-top: var(--space-6);
                    border-top: 1px solid var(--border-color);
                }

                .correction-content {
                    margin-top: var(--space-4);
                }

                .empty-state {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    color: var(--text-secondary);
                }

                @media (max-width: 768px) {
                    .exercises-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
