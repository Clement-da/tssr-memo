/**
 * SubnetCalculator.js
 * Interactive subnet calculation exercise:
 * Generates a random IP + CIDR prefix, then validates user answers
 * for: network address, broadcast, host count.
 */

/**
 * Computes subnet details from an IP array and prefix length.
 * @param {number[]} ipOctets  — [a, b, c, d]
 * @param {number}   prefix    — 0..32
 * @returns {{ networkIP: string, broadcastIP: string, hosts: number, cidr: string }}
 */
function computeSubnet(ipOctets, prefix) {
    // Build 32-bit integer from octets
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

/**
 * Generates a plausible exercise: private IP range + clean prefix (24, 25, 26, 27, 28, 22, 23).
 */
function generateExercise() {
    const prefixes = [22, 23, 24, 25, 26, 27, 28];
    const prefix    = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Random private range
    const ranges = [
        [10, Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
        [172, 16 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 255)],
        [192, 168, Math.floor(Math.random() * 255)]
    ];
    const range = ranges[Math.floor(Math.random() * ranges.length)];

    // Host octet — avoid trivial cases (0 or 255)
    const hostBits = 32 - prefix;
    const blockSize = Math.pow(2, hostBits);
    const blockStart = Math.floor(Math.random() * Math.floor(256 / blockSize)) * blockSize;
    const hostOffset = Math.floor(Math.random() * (blockSize - 2)) + 1;

    const ip4 = [...range, blockStart + hostOffset];
    const result = computeSubnet(ip4, prefix);

    return {
        ip:     ip4.join('.'),
        prefix,
        ...result
    };
}

let _currentExercise = null;

/**
 * Mounts the subnet calculator behaviour in the DOM (called after lesson renders).
 */
export function initSubnetCalculator() {
    const startBtn    = document.getElementById('sc-start');
    const genBtn      = document.getElementById('sc-generate');
    const validateBtn = document.getElementById('sc-validate');
    const fields      = document.getElementById('subnet-fields');
    const questionEl  = document.getElementById('subnet-question');
    const resultEl    = document.getElementById('subnet-result');

    if (!startBtn || !genBtn) return; // not on lesson page

    function generateAndDisplay() {
        _currentExercise = generateExercise();
        const { ip, prefix } = _currentExercise;

        questionEl.innerHTML = `
            <p>Donnée :</p>
            <p class="subnet-calc__ip"><strong>${ip}/${prefix}</strong></p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Masque : <strong>${cidrToMask(prefix)}</strong>
                &nbsp;—&nbsp; Bits hôtes : <strong>${32 - prefix}</strong>
            </p>
        `;

        // Clear fields
        ['sc-network', 'sc-broadcast', 'sc-hosts'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.value = ''; el.className = 'subnet-input'; }
        });

        fields.style.display = 'block';
        resultEl.style.display = 'none';
        startBtn.style.display = 'none';
    }

    startBtn.addEventListener('click', generateAndDisplay);
    genBtn.addEventListener('click', generateAndDisplay);

    validateBtn.addEventListener('click', () => {
        if (!_currentExercise) return;

        const userNetwork   = document.getElementById('sc-network')?.value.trim();
        const userBroadcast = document.getElementById('sc-broadcast')?.value.trim();
        const userHosts     = parseInt(document.getElementById('sc-hosts')?.value.trim(), 10);

        const { networkIP, broadcastIP, hosts } = _currentExercise;

        const okNetwork   = userNetwork   === networkIP;
        const okBroadcast = userBroadcast === broadcastIP;
        const okHosts     = userHosts     === hosts;

        // Color inputs
        setInputState('sc-network',   okNetwork);
        setInputState('sc-broadcast', okBroadcast);
        setInputState('sc-hosts',     okHosts);

        const allCorrect = okNetwork && okBroadcast && okHosts;

        resultEl.style.display = 'block';
        resultEl.innerHTML = `
            <div class="subnet-calc__feedback ${allCorrect ? 'success' : 'partial'}">
                ${allCorrect
                    ? '<strong>✅ Parfait ! Toutes les réponses sont correctes.</strong>'
                    : `<strong>${[okNetwork ? null : '❌ Adresse réseau', okBroadcast ? null : '❌ Broadcast', okHosts ? null : '❌ Hôtes'].filter(Boolean).join(' — ')} incorrects</strong>`
                }
                <div class="subnet-calc__answers">
                    <p>Adresse réseau : <code>${networkIP}</code></p>
                    <p>Broadcast :      <code>${broadcastIP}</code></p>
                    <p>Nombre d'hôtes : <code>${hosts}</code></p>
                </div>
                <p class="subnet-calc__formula">
                    Formule : 2<sup>${32 - _currentExercise.prefix}</sup> - 2 = <strong>${hosts}</strong> hôtes
                </p>
            </div>`;
    });
}

function setInputState(id, correct) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('correct', 'incorrect');
    el.classList.add(correct ? 'correct' : 'incorrect');
}

function cidrToMask(prefix) {
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return [(maskInt >>> 24) & 0xFF, (maskInt >> 16) & 0xFF, (maskInt >> 8) & 0xFF, maskInt & 0xFF].join('.');
}
