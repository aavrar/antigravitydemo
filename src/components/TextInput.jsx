import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateBasicMetrics, calculateReadability, analyzeWritingQuality, getWordFrequency } from '../utils/analyzer';

const sampleTexts = {
    hemingway: "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish. In the first forty days a boy had been with him. But after forty days without a fish the boy's parents had told him that the old man was now definitely and finally salao, which is the worst form of unlucky, and the boy had gone at their orders in another boat which caught three good fish the first week.",
    academic: "The concept of quantum entanglement poses a significant challenge to classical interpretations of local realism. Einstein, Podolsky, and Rosen famously argued that this phenomenon implied 'spooky action at a distance,' suggesting that quantum mechanics was an incomplete theory. However, subsequent experimental verifications of Bell's inequalities have consistently supported the quantum mechanical predictions, demonstrating that entangled particles do indeed share a unified state regardless of the spatial separation between them.",
    business: "We are pleased to announce the launch of our new strategic initiative aimed at optimizing operational efficiency across all departments. This comprehensive plan involves the integration of advanced automation tools and the restructuring of our workflow processes. By streamlining communication channels and reducing redundant tasks, we anticipate a 20% increase in overall productivity by the end of the fiscal year."
};

const TextInput = ({ onAnalysisStart, onAnalysisComplete, isAnalyzing }) => {
    const [text, setText] = useState('');

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        onAnalysisStart();

        // Fake delay for "AI" feel
        await new Promise(resolve => setTimeout(resolve, 2000));

        const basicMetrics = calculateBasicMetrics(text);
        const readability = calculateReadability(text);
        const quality = analyzeWritingQuality(text);
        const wordFreq = getWordFrequency(text);

        onAnalysisComplete({
            basicMetrics,
            readability,
            quality,
            wordFreq,
            rawText: text
        });
    };

    const loadSample = (type) => {
        setText(sampleTexts[type]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-4xl mx-auto space-y-6"
        >
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here to analyze..."
                    className="relative w-full min-h-[300px] bg-dark-surface border border-dark-border rounded-xl p-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all duration-300 resize-y text-lg leading-relaxed"
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => loadSample('hemingway')}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-dark-border rounded-full hover:bg-white/5 transition-colors"
                    >
                        Hemingway
                    </button>
                    <button
                        onClick={() => loadSample('academic')}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-dark-border rounded-full hover:bg-white/5 transition-colors"
                    >
                        Academic
                    </button>
                    <button
                        onClick={() => loadSample('business')}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-dark-border rounded-full hover:bg-white/5 transition-colors"
                    >
                        Business
                    </button>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !text.trim()}
                    className={`
            relative px-8 py-3 rounded-full font-semibold text-white 
            bg-gradient-to-r from-brand-primary to-brand-secondary 
            hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] 
            transform hover:scale-105 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center gap-2 overflow-hidden group
          `}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="relative z-10">Analyzing...</span>
                        </>
                    ) : (
                        <span className="relative z-10">Analyze Writing</span>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default TextInput;
