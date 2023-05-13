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
import { useEffect, useState } from "react";

export default function Dashboard() {

    const[paises, setPaises] = useState(["Todos"]);
    const [pais, setPais] = useState("Todos");

    const get_data = async () => {
        const response = await fetch("http://localhost:3900/api/paises");
        const data = await response.json();
        await setPaises(data);
    };

    useEffect(() => {
        get_data();
    }, []);

    return (
        <div className="w-5/6 m-auto mt-5">
            <h1 className="font-poppins text-3xl font-semibold">Dashboard</h1>
            <h1 className="font-poppins mb-5">Información sobre la población con enfermedades cardiovasculares en 2020 en</h1>
            <select className="w-1/4 mb-4 border-2 rounded-lg shadow-lg font-poppins" onChange={(e)=>{setPais(e.target.value)}}>
                        <option key={"Todos"} value="Todos">Todo el mundo</option>
                        {
                            paises.map((pais) => (
                                <option key={pais.pais} value={pais.pais}>{pais.pais}</option>
                            ))
                        }
                    </select>
            <div className = "flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
                <h1 className=" mb-4 font-poppins text-lg font-medium text-center">RELACIÓN ENTRE EDAD Y ENFERMEDADES CARDIOVASCULARES</h1>
                <div className="flex flex-row justify-between items-center flex-wrap">
                    <div className="w-2/3">
                        <BarChartEdades pais = {pais}/>
                    </div>
                    <div className="w-1/4">
                        <PieChartMayoriaEdad pais = {pais}/>
                    </div>
                </div>
            </div>

            <div className = "flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
                <h1 className="self-center mb-4 font-poppins text-lg font-medium">RELACIÓN ENTRE SEXO Y ENFERMEDADES CARDIOVASCULARES</h1>
                
                <div className="flex flex-row justify-between items-center flex-wrap">
                    <div className="w-1/4">
                        <PieChartSexo />
                    </div>
                    <div className="w-2/3">
                        <BarChartSexo />
                    </div>
                </div>
            </div>

            <div className = "flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
                <h1 className="self-center mb-4 font-poppins text-lg font-medium">RELACIÓN ENTRE NIVEL EDUCATIVO Y ENFERMEDADES CARDIOVASCULARES</h1>
                <div className="flex flex-row justify-between items-center flex-wrap">
                    <div className="w-1/4">
                        <PieChartEducacion />
                    </div>
                    <div className="w-2/3">
                        <BarChartEducacion />
                    </div>
                </div>
            </div>

            <div className = "flex flex-col p-4 border-2 rounded-lg shadow-lg mb-6">
                <h1 className="self-center mb-4 font-poppins text-lg font-medium text-center">RELACIÓN ENTRE ENFERMEDADES CARDIOVASCULARES Y OTROS PADECIMIENTOS O HÁBITOS</h1>
                <div className="flex flex-row justify-between items-center flex-wrap">
                    <div className="w-1/4">
                        <PieChartDiabetes />
                    </div>
                    <div className="w-1/4">
                        <PieChartHipertension />
                    </div>
                    <div className="w-1/4">
                        <PieChartFumar />
                    </div>
                </div>
            </div>
            <MapChart/>
        </div>
    );

    
}