import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import WordFrequencyChart from './charts/WordFrequencyChart';
import SentenceLengthChart from './charts/SentenceLengthChart';
import jsPDF from 'jspdf';

const AnalysisResults = ({ data }) => {
    const { basicMetrics, readability, quality, wordFreq } = data;

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(24);
        doc.setTextColor(40, 40, 40);
        doc.text("Writing Analysis Report", 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 30);

        // Basic Metrics
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Basic Metrics", 20, 50);

        doc.setFontSize(12);
        doc.text(`Word Count: ${basicMetrics.wordCount}`, 20, 60);
        doc.text(`Sentence Count: ${basicMetrics.sentenceCount}`, 20, 70);
        doc.text(`Paragraph Count: ${basicMetrics.paragraphCount}`, 20, 80);
        doc.text(`Avg Sentence Length: ${basicMetrics.avgSentenceLength} words`, 20, 90);

        // Readability
        doc.setFontSize(16);
        doc.text("Readability", 20, 110);

        doc.setFontSize(12);
        doc.text(`Score: ${readability.score}/100`, 20, 120);
        doc.text(`Level: ${readability.label}`, 20, 130);
        doc.text(`Grade Level: ${readability.grade}`, 20, 140);

        // Quality
        doc.setFontSize(16);
        doc.text("Writing Quality", 20, 160);

        doc.setFontSize(12);
        doc.text(`Passive Sentences: ${quality.passiveCount} (${quality.passivePercentage}%)`, 20, 170);

        doc.save("writing-analysis-report.pdf");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full space-y-8 pb-20"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                <button
                    onClick={handleExportPDF}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/10"
                >
                    Export PDF
                </button>
            </div>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Word Count"
                    value={basicMetrics.wordCount}
                    color="blue"
                    delay={0.1}
                />
                <MetricCard
                    title="Reading Score"
                    value={readability.score}
                    label="/ 100"
                    color={readability.color}
                    delay={0.2}
                />
                <MetricCard
                    title="Grade Level"
                    value={readability.grade}
                    color="purple"
                    delay={0.3}
                />
                <MetricCard
                    title="Passive Voice"
                    value={`${quality.passivePercentage}%`}
                    color={quality.passivePercentage > 15 ? 'red' : 'green'}
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Readability Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-dark-surface border border-dark-border rounded-xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Readability Assessment</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Interpretation</span>
                            <span className={`font-medium text-${readability.color}-400`}>{readability.label}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Avg Sentence Length</span>
                            <span className="font-medium text-white">{basicMetrics.avgSentenceLength} words</span>
                        </div>
                    </div>
                </motion.div>

                {/* Word Frequency Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-dark-surface border border-dark-border rounded-xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Word Frequency</h3>
                    <WordFrequencyChart data={wordFreq} />
                </motion.div>

                {/* Sentence Length Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="bg-dark-surface border border-dark-border rounded-xl p-6 lg:col-span-2"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Sentence Length Variation</h3>
                    <SentenceLengthChart text={data.rawText} />
                </motion.div>
            </div>

            {/* Passive Voice Detection */}
            {quality.passiveSentences.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-dark-surface border border-dark-border rounded-xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Passive Voice Detection</h3>
                    <div className="space-y-2">
                        {quality.passiveSentences.map((sentence, idx) => (
                            <div key={idx} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-gray-300 text-sm">
                                {sentence}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default AnalysisResults;
