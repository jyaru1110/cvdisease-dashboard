import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);
const url_backend  = import.meta.env.VITE_URL_API;

export default function PieChartMayoriaEdad({pais}) {
    const [data_received, setData] = useState({ma: 0, me: 0});

    const get_data = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        if(pais == "Todos")
            get_data(url_backend+"/cantidad_mayoria_edad");
        else
            get_data(url_backend+"/cantidad_mayoria_edad/"+pais);
    }, [pais]);

    const data = {
        labels: ["Mayor de 50 años", "Menor de 50 años"],
        datasets: [
            {
                label: "% de personas",
                data: [(data_received.ma*100)/(data_received.ma+data_received.me), (data_received.me*100)/(data_received.ma+data_received.me)],
                backgroundColor: [
                    "rgba(246, 227, 167, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(246, 227, 167, 1)",
                    "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '% de personas con enfermedad que tienen más de 50 años',
          }
        },
      };

    return (
        <div className="lg:w-1/4 w-2/3 m-auto h-96">
            <Pie data={data} options={options}/>
        </div>
    );
}