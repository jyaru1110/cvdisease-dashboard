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

const url_backend  = import.meta.env.VITE_URL_API;


export default function BarChartEducacion({pais}) {
    const [labels, setLabels] = useState([]);
    const [datos, setDatos] = useState([]);
    
    const get_data = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        var labels_aux = [];
        var datos_aux = [];
        data.forEach(element => {
            labels_aux.push("Nivel "+element.educacion);
            datos_aux.push(element.cantidad);
        });
        await setLabels(labels_aux);
        await setDatos(datos_aux);
    };

    useEffect(()=>{
      if(pais == "Todos")
        get_data(url_backend+"/cantidad_educacion");
      else
        get_data(url_backend+"/cantidad_educacion/"+pais);
    },[pais])

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
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de personas con enfermedad cardiovascular por nivel educativo',
          }
        },
      };
    return (
        <div className='sm:w-2/3 w-full m-auto h-80 md:h-96'>
            <Bar data={data} options = {options} />
        </div>
    );
}
                            