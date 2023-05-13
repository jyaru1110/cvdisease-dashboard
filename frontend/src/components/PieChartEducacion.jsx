import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChartEducacion({pais}) {
    const [data_received, setData] = useState();

    const get_data = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        const data_aux = [];
        data.forEach(element => {
            data_aux.push(element.cantidad);
        });
        await setData(data_aux);
    };

    useEffect(() => {
        if (pais == "Todos")
            get_data("http://localhost:3900/api/cantidad_educacion");
        else
            get_data("http://localhost:3900/api/cantidad_educacion/" + pais);
    }, [pais]);

    const data = {
        labels: ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4"],
        datasets: [
            {
                label: "% de personas",
                data: data_received,
                backgroundColor: [
                    "rgba(246, 227, 167, 0.2)",
                    "rgba(122, 71, 187, 0.51)",
                    "rgba(213, 148, 51, 0.63)",
                    "rgba(88, 192, 79, 0.44)"
                ],
                borderColor: [
                    "rgba(246, 227, 167, 1)",
                    "rgba(122, 71, 187, 1)",
                    "rgba(213, 148, 51, 1)",
                    "rgba(88, 192, 79,1)"
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
            text: '# de personas con enfermedad por nivel educativo',
          }
        },
      };

    return (
        <div className="lg:w-1/4 w-2/3 m-auto h-96">
            <Pie data={data} options={options}/>
        </div>
    );
}