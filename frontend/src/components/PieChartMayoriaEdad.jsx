import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState,useEffect } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChartMayoriaEdad() {
    const [data_received, setData] = useState({ma: 0, me: 0});

    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_mayoria_edad");
        const data = await response.json();
        await setData(data);
    };

    useEffect(() => {
        get_data();
    }, []);

    const data = {
        labels: ["Mayor de 50 años", "Menor de 50 años"],
        datasets: [
            {
                label: "% de personas con enfermedad cardiovascular",
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

    return (
        <div>
            <Pie data={data} />
        </div>
    );
}