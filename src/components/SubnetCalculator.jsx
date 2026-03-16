import React, { useState } from 'react';

function computeSubnet(ipOctets, prefix) {
    const ipInt = (ipOctets[0] << 24 | ipOctets[1] << 16 | ipOctets[2] << 8 | ipOctets[3]) >>> 0;
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const networkInt  = (ipInt  & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const intToOctets = n => [n >>> 24 & 0xFF, n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF].join('.');
    return {
        networkIP:   intToOctets(networkInt),
        broadcastIP: intToOctets(broadcastInt),
        hosts:       prefix >= 31 ? (prefix === 32 ? 0 : 0) : Math.pow(2, 32 - prefix) - 2,
        cidr:        `/${prefix}`
    };
}

function cidrToMask(prefix) {
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return [(maskInt >>> 24) & 0xFF, (maskInt >> 16) & 0xFF, (maskInt >> 8) & 0xFF, maskInt & 0xFF].join('.');
}

function generateExercise() {
    const prefixes = [22, 23, 24, 25, 26, 27, 28];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const ranges = [
        [10, Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
        [172, 16 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 255)],
        [192, 168, Math.floor(Math.random() * 255)]
    ];
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const hostBits = 32 - prefix;
    const blockSize = Math.pow(2, hostBits);
    const blockStart = Math.floor(Math.random() * Math.floor(256 / blockSize)) * blockSize;
    const hostOffset = Math.floor(Math.random() * (blockSize - 2)) + 1;
    const ip4 = [...range, blockStart + hostOffset];
    const result = computeSubnet(ip4, prefix);
    return { ip: ip4.join('.'), prefix, ...result };
}

export default function SubnetCalculator() {
    const [exercise, setExercise] = useState(null);
    const [answers, setAnswers] = useState({ network: '', broadcast: '', hosts: '' });
    const [results, setResults] = useState(null);

    const handleStart = () => {
        const ex = generateExercise();
        setExercise(ex);
        setAnswers({ network: '', broadcast: '', hosts: '' });
        setResults(null);
    };

    const handleValidate = () => {
        if (!exercise) return;
        const okNetwork = answers.network.trim() === exercise.networkIP;
        const okBroadcast = answers.broadcast.trim() === exercise.broadcastIP;
        const okHosts = parseInt(answers.hosts.trim(), 10) === exercise.hosts;
        setResults({ okNetwork, okBroadcast, okHosts, allCorrect: okNetwork && okBroadcast && okHosts });
    };

    if (!exercise) {
        return (
            <div className="card subnet-calc-intro" style={{ textAlign: 'center' }}>
                <h3>Calculateur de Sous-réseau</h3>
                <p>Testez vos connaissances en calcul d'adresses réseau et broadcast.</p>
                <button className="btn btn-primary" onClick={handleStart}>Commencer l'exercice</button>
            </div>
        );
    }

    return (
        <div className="card subnet-calc-exercise">
            <div className="subnet-calc__header">
                <h3>Exercice de calcul IP</h3>
                <button className="btn btn-outline btn-sm" onClick={handleStart}>Nouvel exercice ↻</button>
            </div>

            <div className="subnet-question">
                <p>Donnée :</p>
                <p className="subnet-calc__ip"><strong>{exercise.ip}/{exercise.prefix}</strong></p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Masque : <strong>{cidrToMask(exercise.prefix)}</strong>
                    &nbsp;—&nbsp; Bits hôtes : <strong>{32 - exercise.prefix}</strong>
                </p>
            </div>

            <div className="subnet-fields">
                <div className="form-group">
                    <label htmlFor="sc-network">Adresse réseau :</label>
                    <input 
                        type="text" 
                        id="sc-network" 
                        className={`subnet-input ${results ? (results.okNetwork ? 'correct' : 'incorrect') : ''}`}
                        value={answers.network}
                        onChange={(e) => setAnswers({ ...answers, network: e.target.value })}
                        placeholder="x.x.x.x"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sc-broadcast">Adresse de broadcast :</label>
                    <input 
                        type="text" 
                        id="sc-broadcast" 
                        className={`subnet-input ${results ? (results.okBroadcast ? 'correct' : 'incorrect') : ''}`}
                        value={answers.broadcast}
                        onChange={(e) => setAnswers({ ...answers, broadcast: e.target.value })}
                        placeholder="x.x.x.x"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sc-hosts">Nombre d'hôtes utilisables :</label>
                    <input 
                        type="text" 
                        id="sc-hosts" 
                        className={`subnet-input ${results ? (results.okHosts ? 'correct' : 'incorrect') : ''}`}
                        value={answers.hosts}
                        onChange={(e) => setAnswers({ ...answers, hosts: e.target.value })}
                        placeholder="ex: 254"
                    />
                </div>
                <button className="btn btn-primary" onClick={handleValidate} style={{ width: '100%', marginTop: 'var(--space-4)' }}>Valider les réponses</button>
            </div>

            {results && (
                <div className={`subnet-calc__feedback ${results.allCorrect ? 'success' : 'partial'}`} style={{ marginTop: 'var(--space-6)' }}>
                    {results.allCorrect
                        ? <strong>✅ Parfait ! Toutes les réponses sont correctes.</strong>
                        : <strong>❌ Certaines réponses sont incorrectes. Revoyez les détails ci-dessous.</strong>
                    }
                    <div className="subnet-calc__answers" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 'var(--radius-md)' }}>
                        <p>Adresse réseau : <code>{exercise.networkIP}</code></p>
                        <p>Broadcast :      <code>{exercise.broadcastIP}</code></p>
                        <p>Nombre d'hôtes : <code>{exercise.hosts}</code></p>
                    </div>
                    <p className="subnet-calc__formula" style={{ marginTop: 'var(--space-2)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                        Formule : 2<sup>{32 - exercise.prefix}</sup> - 2 = <strong>{exercise.hosts}</strong> hôtes
                    </p>
                </div>
            )}
        </div>
    );
}
