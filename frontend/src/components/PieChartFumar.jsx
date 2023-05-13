import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChartFumar({pais}) {
    const [data_received, setData] = useState({p: 0, n: 0});

    const get_data = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        if(pais == "Todos")
            get_data("http://localhost:3900/api/cantidad_fumar");
        else
            get_data("http://localhost:3900/api/cantidad_fumar/"+pais);
    }, [pais]);

    const data = {
        labels: ["Fuma", "No fuma"],
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
            text: '% de personas fumadoras con enfermedad cardiovascular',
            font:{
                size : 10
            }
          }
        },
      };

    return (
        <div>
            <Pie data={data} options = {options}/>
        </div>
    );
}