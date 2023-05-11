import PieChartSexo from "../../components/PieChartSexo";
import BarChartEdades from "../../components/BarChartEdades";
import PieChartMayoriaEdad from "../../components/PieChartMayoriaEdad";
import BarChartSexo from "../../components/BarChartSexo";
import PieChartDiabetes from "../../components/PieChartDiabetes";
import PieChartHipertension from "../../components/PieChartHipertension";
import PieChartFumar from "../../components/PieChartFumar";
import MapChart from "../../components/MapChart";

export default function Dashboard() {

    return (
        <div className="w-5/6 m-auto mt-5">
            <h1 className="font-poppins text-3xl font-semibold">Dashboard</h1>
            <h1 className="font-poppins mb-5">Información sobre la población con enfermedades cardiovasculares</h1>
            <h1>Edades de las personas con enfermedades cardiovasculares</h1>
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="w-2/3">
                    <BarChartEdades />
                </div>
                <div className="w-1/4">
                    <PieChartMayoriaEdad />
                </div>
            </div>

            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="w-1/4">
                    <PieChartSexo />
                </div>
                <div className="w-2/3">
                    <BarChartSexo />
                </div>
            </div>

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
            <MapChart/>
        </div>
    );

    
}