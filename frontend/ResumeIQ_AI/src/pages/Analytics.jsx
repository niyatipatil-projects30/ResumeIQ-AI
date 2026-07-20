import {DashboardNavbar} from "../component/DashboardNavbar";
import "../styles/Analytics.css";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);
export default function Analytics() {
const [scores, setScores] = useState([]);

   const progressData = {
    labels: scores.map((_, index) => `Resume ${index + 1}`),
    datasets: [
        {
            label: "Resume Score",
           data: scores.map(item => item.score),

            borderColor: "#00F5FF",

            backgroundColor: "rgba(0,245,255,0.25)",

            pointBackgroundColor: "#00F5FF",

            pointBorderColor: "#ffffff",

            pointRadius: 6,

            pointHoverRadius: 9,

            borderWidth: 3,

            tension: 0.45,

            fill: true
        }
    ]
};

const progressOptions = {

    responsive: true,

    plugins: {

        legend: {

            display: false

        }

    },

    scales: {

        x: {

            grid: {

                display: false

            },

            ticks: {

                color: "#cbd5e1"

            }

        },

        y: {

            beginAtZero: true,

            max: 100,

            ticks: {

                color: "#cbd5e1"

            },

            grid: {

                color: "rgba(255,255,255,.08)"

            }

        }

    }

};
const skillsData = {
    labels: [
        "React",
        "Java",
        "SQL",
        "AWS",
        "Docker"
    ],
    datasets: [
        {
            data: [30, 25, 20, 15, 10],

            backgroundColor: [
                "#7FB3F1", // Light Blue
                "#3B82F6", // Blue
                "#2563EB", // Royal Blue
                "#1D4ED8", // Dark Blue
                "#2643C4"  // Deep Blue
            ],

            borderWidth: 0,

            hoverOffset: 8
        }
    ]
};

const pieOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {
            display: false
        },

        tooltip: {
            enabled: true
        },

        datalabels: {

            color: "#000",

            font: {
                size: 15,
                weight: "500"
            },

            formatter: (value, context) =>
                context.chart.data.labels[context.dataIndex]
        }

    }

};
    
useEffect(() => {

    const fetchScores = async () => {

        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) return;

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/resumes?email=${user.email}`
        );
        
        const result = await response.json();

        if (result.success) {

            setScores(result.data);

        }

    };

    fetchScores();

}, []);



    return (
        <>
            <DashboardNavbar />

            <div className="analytics-page">

                <h1>Resume Analytics</h1>

                <div className="analytics-grid">

                    <div className="card">
                        <h2>Resume Improvement</h2>
                        <Line
    data={progressData}
    options={progressOptions}
/>
                    </div>

                    <div className="card">
    <h2>Trending Skills</h2>

    <div
        style={{
            width: "260px",
            height: "260px",
            margin: "20px auto"
        }}
    >
        <Pie
            data={skillsData}
            options={pieOptions}
        />
    </div>
</div>

                    <div className="card insights">

                        <h2>AI Insights</h2>

                        <ul>

                            <li>Resume score increased by 12%.</li>

                            <li>Add Docker projects.</li>

                            <li>Include measurable achievements.</li>

                            <li>Improve ATS keywords.</li>

                            <li>React + SQL are highly demanded.</li>

                        </ul>

                    </div>

                </div>

            </div>

        </>
    );

}