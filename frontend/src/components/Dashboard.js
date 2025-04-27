import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

import '../styles/dashboard.css';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Dashboard = ({ expenses }) =>
{
    const categoryData = expenses.reduce((acc, expense) =>
    {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const monthlyData = expenses.reduce((acc, expense) =>
    {
        const date = new Date(expense.date);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
        acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
        return acc;
    }, {});

    const pieChartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
            },
        ],
    };

    const barChartData = {
        labels: Object.keys(monthlyData).map(label =>
        {
            const [year, month] = label.split('-');
            return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
        }),
        datasets: [
            {
                label: 'Monthly Expenses',
                data: Object.values(monthlyData),
                backgroundColor: '#36A2EB',
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Expense Dashboard</h2>

            <div className="chart-row">
                <div className="chart-col">
                    <div className="chart-container">
                        <h3 className="chart-title">Expense by Category</h3>
                        <Pie data={ pieChartData } />
                    </div>
                </div>

                <div className="chart-col">
                    <div className="chart-container">
                        <h3 className="chart-title">Monthly Expenses</h3>
                        <Bar data={ barChartData } options={ {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        } } />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;