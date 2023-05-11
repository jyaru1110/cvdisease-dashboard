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




export default function BarChartEdades() {
    const [labels, setLabels] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datos_2, setDatos2] = useState([]);
    
    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_edad");
        const data = await response.json();
        var labels_aux = [];
        var datos_aux = [];
        data.forEach(element => {
            labels_aux.push("Edad "+element.edad);
            datos_aux.push(element.cantidad);
        });
        await setLabels(labels_aux);
        await setDatos(datos_aux);
    };

    const get_data_2 = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_edad_negativo");
        const data = await response.json();
        var datos_aux = [];
        data.forEach(element => {
            datos_aux.push(element.cantidad);

        });
        await setDatos2(datos_aux);
    };

    useEffect(()=>{
        get_data();
        get_data_2();
    },[])

    const data = {
        labels,
        datasets: [
          {
            label : "Cantidad de personas con enfermedad cardiovascular",
            data: datos,
            backgroundColor: ['rgba(88, 192, 79, 0.64)']
          },
            {
                label : "Cantidad de personas sin enfermedad cardiovascular",
                data: datos_2,
                backgroundColor: ['rgba(255, 99, 132, 0.2)']
            }
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de personas con enfermedad cardiovascular por edad',
          }
        },
      };
    return (
        <div>
            <Bar data={data} options = {options} />
        </div>
    );
}
                            