import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SentenceLengthChart = ({ text }) => {
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const data = sentences.map((s, i) => ({
        id: i + 1,
        length: s.trim().split(/\s+/).length
    }));

    const chartData = {
        labels: data.map(d => `S${d.id}`),
        datasets: [
            {
                label: 'Words per Sentence',
                data: data.map(d => d.length),
                backgroundColor: 'rgba(139, 92, 246, 0.5)', // Violet 500
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                titleColor: '#fff',
                bodyColor: '#ccc',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                    title: (context) => `Sentence ${context[0].label}`,
                    label: (context) => `${context.raw} words`,
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        family: 'Inter',
                        size: 10,
                    },
                    maxTicksLimit: 20,
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        family: 'Inter',
                        size: 11,
                    },
                },
            },
        },
    };

    return (
        <div className="h-64 w-full">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SentenceLengthChart;
