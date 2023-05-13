import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);

const url_backend  = import.meta.env.VITE_URL_API;

export default function PieChartSexo({pais}) {
    const [data_received, setData] = useState({m: 0, f: 0});

    const get_data = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        if(pais == "Todos")
            get_data(url_backend+"/cantidad_genero");
        else
            get_data(url_backend+"/cantidad_genero/"+pais);
    }, [pais]);

    const data = {
        labels: ["Masculino", "Femenino"],
        datasets: [
            {
                label: "% de personas",
                data: [(data_received.m*100)/(data_received.m+data_received.f), (data_received.f*100)/(data_received.m+data_received.f)],
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

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '% de personas con enfermedad cardiovascular por sexo',
            }
        },
    };

    return (
        <div className="lg:w-1/4 w-2/3 m-auto h-96">
            <Pie data={data} options={options}/>
        </div>
    );
}