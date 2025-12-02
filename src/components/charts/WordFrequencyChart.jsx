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

const WordFrequencyChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.text),
        datasets: [
            {
                label: 'Frequency',
                data: data.map(d => d.value),
                backgroundColor: 'rgba(99, 102, 241, 0.5)', // Indigo 500 with opacity
                borderColor: 'rgba(99, 102, 241, 1)',
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
                        size: 11,
                    },
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
                    stepSize: 1,
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

export default WordFrequencyChart;
