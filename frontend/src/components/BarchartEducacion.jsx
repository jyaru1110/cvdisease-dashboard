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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




export default function BarChartEducacion() {
    const [labels, setLabels] = useState([]);
    const [datos, setDatos] = useState([]);
    
    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/cantidad_educacion");
        const data = await response.json();
        var labels_aux = [];
        var datos_aux = [];
        data.forEach(element => {
            labels_aux.push("Nivel "+element.edad);
            datos_aux.push(element.cantidad);
        });
        await setLabels(labels_aux);
        await setDatos(datos_aux);
    };

    useEffect(()=>{
        get_data();
    },[])

    const data = {
        labels,
        datasets: [
          {
            label : "Cantidad de personas con enfermedad cardiovascular",
            data: datos,
            backgroundColor: ['rgba(88, 192, 79, 0.64)']
          }
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de personas con enfermedad cardiovascular por nivel educativo',
          }
        },
      };
    return (
        <div>
            <Bar data={data} options = {options} />
        </div>
    );
}
                            