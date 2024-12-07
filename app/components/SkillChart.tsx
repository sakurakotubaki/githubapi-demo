import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SkillChartProps {
  data: {
    language: string;
    percentage: number;
    grade: string;
  }[];
}

export const SkillChart = ({ data }: SkillChartProps) => {
  const chartData: ChartData<'doughnut'> = {
    labels: data.map((item) => `${item.language} (${item.grade})`),
    datasets: [
      {
        data: data.map((item) => item.percentage),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
