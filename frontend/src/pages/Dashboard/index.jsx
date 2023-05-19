import PieChartSexo from "../../components/PieChartSexo";
import BarChartEdades from "../../components/BarChartEdades";
import PieChartMayoriaEdad from "../../components/PieChartMayoriaEdad";
import BarChartSexo from "../../components/BarChartSexo";
import PieChartDiabetes from "../../components/PieChartDiabetes";
import PieChartHipertension from "../../components/PieChartHipertension";
import PieChartFumar from "../../components/PieChartFumar";
import MapChart from "../../components/MapChart";
import BarChartEducacion from "../../components/BarchartEducacion";
import PieChartEducacion from "../../components/PieChartEducacion";
import Stats from "../../components/Stats";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [paises, setPaises] = useState([{"pais":"Todos"}]);
  const [pais, setPais] = useState("Todos");

  const url_backend  = import.meta.env.VITE_URL_API;
  const get_data = async () => {
    const response = await fetch(url_backend+"/paises");
    const data = await response.json();
    await setPaises(data);
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div className="sm:w-5/6 sm:p-0 p-1 m-auto mt-5">
      <h1 className="font-poppins text-3xl font-semibold">Dashboard</h1>
      <div className="flex items-center flex-wrap">
      <h1 className="font-poppins mb-5 mr-4">
        Información sobre la población con enfermedades cardiovasculares en 2020
        en
      </h1>
      <select
        className="lg:w-1/4 w-full mb-4 border-2 rounded-lg shadow-lg font-poppins z-50"
        onChange={(e) => {
          setPais(e.target.value);
        }}
      >
        <option key={"Todos"} value="Todos" className="z-50" selected={pais=="Todos"?true:false}>
          Todo el mundo
        </option>
        {paises.map((pais_el) => (
          <option key={pais_el.pais} value={pais_el.pais} className="z-50" selected={pais==pais_el.pais?true:false}>
            {pais_el.pais}
          </option>
        ))}
      </select>
      </div>
      <Stats></Stats>
      <MapChart pais={pais} setPais={setPais} />

      
      <div className="flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
        <h1 className="self-center mb-4 font-poppins text-lg font-medium">
          RELACIÓN ENTRE EDAD Y ENFERMEDADES CARDIOVASCULARES
        </h1>
        <div className="flex lg:flex-row justify-between items-center w-full flex-col">
          <BarChartEdades pais={pais} />
          <PieChartMayoriaEdad pais={pais} />
        </div>
      </div>

      <div className="flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
        <h1 className="self-center mb-4 font-poppins text-lg font-medium">
          RELACIÓN ENTRE EDAD Y ENFERMEDADES CARDIOVASCULARES
        </h1>
        <div className="flex lg:flex-row justify-between items-center w-full flex-col">
          <BarChartSexo pais={pais} />
          <PieChartSexo pais={pais} />
        </div>
      </div>

      <div className="flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
        <h1 className="self-center mb-4 font-poppins text-lg font-medium">
          RELACIÓN ENTRE NIVEL EDUCATIVO Y ENFERMEDADES CARDIOVASCULARES
        </h1>
        <div className="flex lg:flex-row justify-between items-center w-full flex-col">
          <PieChartEducacion pais={pais}/>
          <BarChartEducacion pais={pais}/>
        </div>
      </div>

      <div className="flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
        <h1 className="self-center mb-4 font-poppins text-lg font-medium text-center">
          RELACIÓN ENTRE ENFERMEDADES CARDIOVASCULARES Y OTROS PADECIMIENTOS O
          HÁBITOS
        </h1>
        <div className="flex lg:flex-row justify-between items-center w-full flex-col">
            <PieChartDiabetes pais={pais}/>
            <PieChartHipertension pais={pais}/>
            <PieChartFumar pais={pais} />
        </div>
      </div>
    </div>
  );
}
