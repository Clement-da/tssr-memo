import { MODULES } from './src/data/modules_index.js';
import fs from 'fs';

const report = MODULES.map(m => {
    return {
        id: m.id,
        title: m.title,
        flashcards: m.flashcards?.length || 0,
        quiz: m.quiz?.length || 0,
        exercises: m.exercises?.length || 0
    };
});

fs.writeFileSync('audit.json', JSON.stringify(report, null, 2), 'utf-8');
