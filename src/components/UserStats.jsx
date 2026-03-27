import React from 'react';
import { useStore } from '@nanostores/react';
import { appStore, getLevelInfo } from '../store.js';

export default function UserStats() {
    const { xp } = useStore(appStore);
    const levelInfo = getLevelInfo(xp);

    return (
        <div className="user-stats" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginLeft: 'var(--space-4)' }}>
            <div className="xp-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '120px' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Niveau {levelInfo.level}</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{levelInfo.name}</span>
                </div>
                <div className="xp-bar-outer" style={{ width: '100%', height: '6px', background: 'var(--bg-base)', borderRadius: '10px', marginTop: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div className="xp-bar-inner" style={{ width: `${levelInfo.percentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-success))', transition: 'width 0.4s ease-out' }}></div>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{xp} XP</span>
            </div>
            <div className="level-badge" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'var(--bg-surface-hover)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.1rem',
                border: '2px solid var(--accent-primary)',
                boxShadow: '0 0 10px rgba(20, 184, 166, 0.3)'
            }}>
                {levelInfo.icon}
            </div>
        </div>
    );
}
