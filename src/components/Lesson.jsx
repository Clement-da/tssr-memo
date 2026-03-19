import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, updateLessonStatus } from '../store.js';
import { MODULES } from '../data/modules_index.js';
import SubnetCalculator from './SubnetCalculator.jsx';

export default function Lesson({ moduleId, title, showSubnetCalc, children }) {
    const state = useStore(appStore);
    const isCompleted = state.lessons?.[moduleId] === true;
    const [notification, setNotification] = useState(null);

    const handleComplete = () => {
        if (!state.lessons?.[moduleId]) {
            updateLessonStatus(moduleId, true);
            setNotification({
                type: 'success',
                message: 'Excellent ! Leçon terminée. Passez au quiz pour tester vos connaissances.'
            });
        }
    };

    // showSubnetCalc is now managed by the parent via props

    return (
        <div className="lesson-container">
            <div className="lesson-header">
                <h2>{title}</h2>
                {isCompleted && (
                    <span className="lesson-badge lesson-badge--done" aria-label="Leçon terminée">✓ Terminé</span>
                )}
            </div>

            <article className="lesson-content" aria-label="Contenu de la leçon">
                {children}
            </article>

            {showSubnetCalc && (
                <div style={{ margin: 'var(--space-8) 0' }}>
                    <SubnetCalculator />
                </div>
            )}

            {notification && (
                <div className={`lesson-notification lesson-notification--${notification.type}`} role="alert" aria-live="assertive">
                    <strong>{notification.type === 'success' ? 'Excellent !' : ''}</strong> {notification.message}
                    {notification.type === 'success' && (
                        <a href={`/${moduleId}/quiz`} className="btn btn-primary btn-sm" style={{ marginLeft: 'var(--space-4)', textDecoration: 'none' }}>
                            Aller au Quiz →
                        </a>
                    )}
                </div>
            )}

            <div className="lesson-footer">
                <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>← Dashboard</a>
                <button 
                    id="btn-complete-lesson" 
                    className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
                    onClick={handleComplete}
                >
                    {isCompleted ? 'Leçon déjà validée ✓' : 'Marquer comme lu'}
                </button>
            </div>
        </div>
    );
}
