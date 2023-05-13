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




export default function BarChartEdades({pais}) {
    const [labels, setLabels] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datos_2, setDatos2] = useState([]);
    
    const get_data = async (url) => {
        const response = await fetch(url);
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

    const get_data_2 = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        var datos_aux = [];
        data.forEach(element => {
            datos_aux.push(element.cantidad);

        });
        await setDatos2(datos_aux);
    };

    useEffect(()=>{
      if(pais == "Todos")
      {   get_data("http://localhost:3900/api/cantidad_edad");
          get_data_2("http://localhost:3900/api/cantidad_edad_negativo");
      }
      else
      {   get_data("http://localhost:3900/api/cantidad_edad_pais/"+pais);
          get_data_2("http://localhost:3900/api/cantidad_edad_negativo/"+pais);
      }
    },[pais])

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
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de personas con enfermedad cardiovascular por edad',
          }
        },
      };
    return (
      <div className="sm:w-2/3 w-full m-auto h-80 md:h-96">
        <Bar data={data} options = {options} />
      </div>     
    );
}
                            