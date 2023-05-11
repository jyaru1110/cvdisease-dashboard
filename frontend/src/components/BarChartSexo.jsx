import { useState, useEffect } from 'react';
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
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




export default function BarChartSexo() {
    const [data_received, setData] = useState({m: 0, f: 0});

    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_genero");
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        get_data();
    }, []);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

    const data = {
        labels: ["Masculino", "Femenino"],
        datasets: [
            {
                label: "# de personas con enfermedad cardiovascular",
                data: [data_received.m, data_received.f],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 1
            }
        ]
    };
    return (
        <div>
            <Bar data={data} options={options}/>
        </div>
    );
}
                            