import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChartHipertension() {
    const [data_received, setData] = useState({p: 0, n: 0});

    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_hipertension");
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        get_data();
    }, []);

    const data = {
        labels: ["Con hipertensión", "Sin hipertensión"],
        datasets: [
            {
                label: "% de personas",
                data: [(data_received.p*100)/(data_received.p+data_received.n), (data_received.n*100)/(data_received.p+data_received.n)],
                backgroundColor: [
                    'rgba(88, 192, 79, 0.44)',
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
                    "rgba(88, 192, 79,1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '% de personas con hipertensión y enfermedad cardiovascular',
            font:{
                size : 10
            }
          }
        },
      };

    return (
        <div>
            <Pie data={data} options={options}/>
        </div>
    );
}