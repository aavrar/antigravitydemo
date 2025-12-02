export const calculateBasicMetrics = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const characters = text.length;

    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const paragraphCount = paragraphs.length;
    const avgSentenceLength = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;

    return {
        wordCount,
        sentenceCount,
        paragraphCount,
        characters,
        avgSentenceLength
    };
};

export const calculateReadability = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

    if (words.length === 0 || sentences.length === 0) {
        return { score: 0, grade: 0, label: 'N/A', color: 'gray' };
    }

    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

    // Flesch-Kincaid Reading Ease
    // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
    const score = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (totalSyllables / words.length);

    // Flesch-Kincaid Grade Level
    // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
    const grade = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;

    let label = '';
    let color = '';

    if (score >= 90) { label = 'Very Easy'; color = 'green'; }
    else if (score >= 80) { label = 'Easy'; color = 'green'; }
    else if (score >= 70) { label = 'Fairly Easy'; color = 'blue'; }
    else if (score >= 60) { label = 'Standard'; color = 'blue'; }
    else if (score >= 50) { label = 'Fairly Difficult'; color = 'yellow'; }
    else if (score >= 30) { label = 'Difficult'; color = 'orange'; }
    else { label = 'Very Difficult'; color = 'red'; }

    return {
        score: Math.max(0, Math.min(100, Math.round(score))),
        grade: Math.max(0, Math.round(grade * 10) / 10),
        label,
        color
    };
};

const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
};

export const analyzeWritingQuality = (text) => {
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const passiveSentences = [];

    // Simple passive voice detection (be verb + past participle approximation)
    // This is a basic heuristic
    const beVerbs = ['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'];

    sentences.forEach(sentence => {
        const words = sentence.trim().toLowerCase().split(/\s+/);
        for (let i = 0; i < words.length - 1; i++) {
            if (beVerbs.includes(words[i]) && words[i + 1].endsWith('ed')) {
                passiveSentences.push(sentence.trim());
                break;
            }
        }
    });

    return {
        passiveCount: passiveSentences.length,
        passivePercentage: sentences.length > 0 ? Math.round((passiveSentences.length / sentences.length) * 100) : 0,
        passiveSentences
    };
};

export const getWordFrequency = (text) => {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const commonWords = ['that', 'this', 'with', 'from', 'have', 'what', 'when', 'where', 'which', 'there', 'their', 'they', 'will', 'would', 'could', 'should'];

    const frequency = {};
    words.forEach(word => {
        if (!commonWords.includes(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([text, value]) => ({ text, value }));
};
