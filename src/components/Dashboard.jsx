import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { appStore, resetGlobalProgress, BADGE_DEFINITIONS, getModuleCompletion, checkBadges } from '../store.js';
import { MODULES, MODULE_CATEGORIES } from '../data/modules_index.js';

export default function Dashboard({ searchIndex = [] }) {
    const state = useStore(appStore);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    
    // Check badges on mount to ensure retroactive unlock
    React.useEffect(() => {
        checkBadges();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        const filtered = searchIndex.flatMap(mod => {
            const matches = [];
            // Check module title
            if (mod.title.toLowerCase().includes(query.toLowerCase())) {
                matches.push({
                    type: 'module',
                    id: mod.id,
                    title: mod.title,
                    icon: mod.icon,
                    url: `/${mod.id}/lesson`
                });
            }
            // Check headings
            mod.headings.forEach(h => {
                if (h.text.toLowerCase().includes(query.toLowerCase())) {
                    matches.push({
                        type: 'heading',
                        id: mod.id,
                        title: h.text,
                        parentTitle: mod.title,
                        icon: mod.icon,
                        url: `/${mod.id}/lesson#${h.slug}`
                    });
                }
            });
            return matches;
        });

        setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
    };

    // Accordion state — all categories open by default
    const [openCategories, setOpenCategories] = useState(
        () => new Set(MODULE_CATEGORIES.map(c => c.name))
    );

    const toggleCategory = (name) => {
        setOpenCategories(prev => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };
    
    // Use centralized calculation from store
    const getModuleProgress = (moduleId) => getModuleCompletion(state, moduleId);

    const globalProgress = MODULES.length === 0 ? 0 : Math.round(
        MODULES.reduce((sum, mod) => sum + getModuleProgress(mod.id), 0) / MODULES.length
    );

    return (
        <section aria-label="Tableau de bord">
            <h2>Bienvenue sur votre Dashboard</h2>
            <p>Suivez votre progression et accédez à vos modules de révision.</p>

            <div className="search-container" style={{ position: 'relative', margin: 'var(--space-8) 0 var(--space-10) 0' }}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    <input 
                        type="search" 
                        placeholder="Rechercher par mots-clés (ex: case, dhcp, vlan...)"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow clicks
                        style={{
                            width: '100%',
                            padding: 'var(--space-4) var(--space-4) var(--space-4) 3rem',
                            fontSize: '1.1rem',
                            backgroundColor: 'var(--bg-main)',
                            border: '1.5px solid var(--border-color)',
                            borderRadius: 'var(--radius-xl)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            boxShadow: isFocused ? '0 0 0 4px var(--accent-primary-light)' : 'none',
                            transition: 'all 0.3s ease',
                            borderColor: isFocused ? 'var(--accent-primary)' : 'var(--border-color)'
                        }}
                    />
                </div>
                
                {isFocused && searchResults.length > 0 && (
                    <div className="search-results card shadow-lg" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        marginTop: '0.5rem',
                        padding: 'var(--space-2)',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        background: 'var(--bg-surface)',
                        border: '1.5px solid var(--accent-primary)',
                    }}>
                        {searchResults.map((res, idx) => (
                            <a 
                                key={`${res.id}-${idx}`} 
                                href={res.url} 
                                className="search-result-item"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    textDecoration: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-surface-hover)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{res.icon || '📄'}</span>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600 }}>{res.title}</span>
                                    {res.type === 'heading' && (
                                        <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Dans : {res.parentTitle}</span>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-6)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                    <h3 style={{ margin: 0 }}>Progression globale</h3>
                    <button 
                        onClick={() => setShowResetModal(true)}
                        className="btn btn-outline"
                        style={{ 
                            fontSize: '0.75rem', 
                            padding: '6px 16px', 
                            borderColor: 'transparent', 
                            color: 'var(--text-muted)',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-full)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                            e.currentTarget.style.color = 'var(--accent-danger)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        <span>↺</span> Réinitialiser
                    </button>
                </div>
                <div className="progress-bar-container" style={{ height: '16px' }}>
                    <div className="progress-bar-fill" style={{ width: `${globalProgress}%` }}></div>
                </div>
                <p style={{ marginTop: 'var(--space-2)', textAlign: 'right', fontWeight: 600 }}>{globalProgress}% complété</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-10)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.5rem', background: 'var(--accent-primary-light)', padding: '8px', borderRadius: '12px' }}>🏆</span>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Mes Badges TSSR</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Collection • {state.badges.length}/{BADGE_DEFINITIONS.length} débloqués</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                    {BADGE_DEFINITIONS.map(badge => {
                        const isUnlocked = state.badges.includes(badge.id);
                        return (
                            <div key={badge.id} style={{
                                padding: 'var(--space-4)',
                                background: isUnlocked ? 'var(--bg-surface-hover)' : 'rgba(255,255,255,0.02)',
                                border: `1.5px solid ${isUnlocked ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-4)',
                                opacity: isUnlocked ? 1 : 0.3,
                                filter: isUnlocked ? 'none' : 'grayscale(1)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {isUnlocked && (
                                    <div style={{ position: 'absolute', top: -10, right: -10, width: '40px', height: '40px', background: 'var(--accent-primary)', opacity: 0.1, borderRadius: '50%' }}></div>
                                )}
                                <span style={{ fontSize: '2.5rem', transform: isUnlocked ? 'scale(1.1)' : 'scale(1)' }}>{badge.icon}</span>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>{badge.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>{badge.description}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom reset confirmation modal */}
            {showResetModal && (
                <div
                    onClick={() => setShowResetModal(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(6px)',
                        animation: 'fadeIn 0.2s ease'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-xl, 16px)',
                            padding: 'var(--space-8)',
                            maxWidth: '420px',
                            width: '90%',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                            animation: 'slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>⚠️</div>
                        <h3 style={{ margin: '0 0 var(--space-3)', fontSize: '1.2rem' }}>Réinitialiser la progression ?</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0 0 var(--space-6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Cette action effacera <strong>toute votre progression</strong> — leçons, quiz, flashcards et exercices.
                            Elle est <strong>irréversible</strong>.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowResetModal(false)}
                                className="btn btn-outline"
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => {
                                    resetGlobalProgress();
                                    setShowResetModal(false);
                                }}
                                className="btn"
                                style={{
                                    flex: 1,
                                    background: 'var(--accent-warning)',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 700
                                }}
                            >
                                Oui, tout effacer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {MODULE_CATEGORIES.map((category) => {
                const catProgress = category.modules.length === 0 ? 0 : Math.round(
                    category.modules.reduce((sum, mod) => sum + getModuleProgress(mod.id), 0) / category.modules.length
                );

                const isOpen = openCategories.has(category.name);

                return (
                    <div key={category.name} className={`dashboard-category${isOpen ? '' : ' dashboard-category--collapsed'}`}>
                        <button
                            type="button"
                            className="dashboard-category__header"
                            onClick={() => toggleCategory(category.name)}
                            aria-expanded={isOpen}
                            aria-controls={`cat-${category.name}`}
                        >
                            <div className="dashboard-category__title-group">
                                <span className="dashboard-category__icon" aria-hidden="true">{category.icon}</span>
                                <h3 className="dashboard-category__title">{category.name}</h3>
                                <span className="dashboard-category__count">{category.modules.length} modules</span>
                            </div>
                            <div className="dashboard-category__right">
                                <div className="dashboard-category__progress">
                                    <div className="progress-bar-container" style={{ height: '8px', width: '120px' }}>
                                        <div className="progress-bar-fill" style={{ width: `${catProgress}%` }}></div>
                                    </div>
                                    <span className="dashboard-category__progress-text">{catProgress}%</span>
                                </div>
                                <span className={`dashboard-category__chevron${isOpen ? ' dashboard-category__chevron--open' : ''}`} aria-hidden="true">▾</span>
                            </div>
                        </button>

                        <div className="dashboard-category__body" id={`cat-${category.name}`}>
                            <div className="dashboard-grid" role="list">
                            {category.modules.map((mod) => {
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

                                return (
                                    <article key={mod.id} className="card module-card" aria-label={`Module : ${mod.title}`}>
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
                                            {mod.exercises && mod.exercises.length > 0 && (
                                                <li>
                                                    <span className="module-stat__label">Exercices</span>
                                                    <span className="module-stat__value">
                                                        {Object.values(state.exercises[mod.id] || {}).filter(v => v === 'done').length}/{mod.exercises.length} validés
                                                    </span>
                                                </li>
                                            )}
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
                                            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                                <a href={`/${mod.id}/quiz`} className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Quiz</a>
                                                <a href={`/${mod.id}/flashcards`} className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>Cards</a>
                                                {mod.exercises && mod.exercises.length > 0 && (
                                                    <a href={`/${mod.id}/exercises`} className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)', fontWeight: '600' }}>Exercices</a>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
