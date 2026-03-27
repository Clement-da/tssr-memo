import React from 'react';
import { useStore } from '@nanostores/react';
import { appStore, getLevelInfo } from '../store.js';

export default function UserStats() {
    const { xp } = useStore(appStore);
    const levelInfo = getLevelInfo(xp);

    return (
        <div className="user-stats" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginLeft: 'auto' }}>
            <div className="xp-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <span className="user-stats__level-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Niv. {levelInfo.level}</span>
                    <span style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.8rem' }}>{levelInfo.name}</span>
                </div>
                <div className="xp-bar-outer" style={{ width: '80px', height: '6px', background: 'var(--bg-main)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div className="xp-bar-inner" style={{ width: `${levelInfo.percentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-success))', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}></div>
                </div>
            </div>
            <div className="level-badge" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'var(--bg-surface-hover)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.2rem',
                border: '2px solid var(--accent-primary)',
                boxShadow: '0 0 15px var(--accent-primary-light)',
                flexShrink: 0
            }}>
                {levelInfo.icon}
            </div>
        </div>
    );
}
