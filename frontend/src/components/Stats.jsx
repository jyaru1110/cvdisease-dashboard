import { useState, useEffect } from "react";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { BsPeopleFill } from "react-icons/bs";
import {IoMdSchool} from "react-icons/io";

const Stats = () => {
  const [totalEnfermos, setTotalEnfermos] = useState(0);
  const [paisMasEnfermos, setPaisMasEnfermos] = useState("");
  const [porcentajeEnfermos, setPorcentajeEnfermos] = useState(0);
  const [nivelMasEnfermos, setNivelMasEnfermos] = useState(0);
  const url_backend = import.meta.env.VITE_URL_API;

  const get_data = async (url) => {
    const response = await fetch(url_backend + "/cantidad");
    const data = await response.json();
    setTotalEnfermos(data[0].cantidad);
    const response2 = await fetch(url_backend + "/pais_mas_casos");
    const data2 = await response2.json();
    setPaisMasEnfermos(data2[0].pais);
    const response3 = await fetch(url_backend + "/porcentaje_enfermos");
    const data3 = await response3.json();
    setPorcentajeEnfermos(data3[0].porcentaje);
    const reponse4 = await fetch(url_backend + "/mayor_nivel");
    const data4 = await reponse4.json();
    setNivelMasEnfermos(data4[0].educacion);
  };

  useEffect(() => {
    get_data(url_backend + "/cantidad");
  }, []);

  return (
    <div className="flex space-x-5 mb-10 w-full justify-center flex-wrap">
      <div className="font-poppins border p-2 rounded-md flex items-center space-x-5">
        <div>
          <h1 className="text-slate-400 text-sm mb-2 font-light">
            Nivel educativo con más enfermos
          </h1>
          <h1 className="font-semibold text-4xl">
           Nivel {nivelMasEnfermos}
          </h1>
        </div>
        <div className="mt-2 bg-blue-300 rounded-full h-12 w-12 flex items-center justify-center">
          <IoMdSchool className="text-3xl text-blue-500" />
        </div>
      </div>

      <div className="font-poppins border p-2 rounded-md flex items-center space-x-5">
        <div>
          <h1 className="text-slate-400 text-sm mb-2 font-light">
            Porcentaje enfermos
          </h1>
          <h1 className="font-semibold text-4xl">
            {porcentajeEnfermos * 100}%
          </h1>
        </div>
        <div className="mt-2 bg-yellow-300 rounded-full h-12 w-12 flex items-center justify-center">
          <BsPeopleFill className="text-3xl text-yellow-500" />
        </div>
      </div>

      <div className="font-poppins border p-2 rounded-md flex items-center space-x-5">
        <div>
          <h1 className="text-slate-400 text-sm mb-2 font-light">
            País con más enfermos
          </h1>
          <h1 className="font-semibold text-4xl">{paisMasEnfermos}</h1>
        </div>
        <div className="mt-2 bg-green-300 rounded-full h-12 w-12 flex items-center justify-center pt-1">
          <TiWorld className="text-4xl text-green-500" />
        </div>
      </div>

      <div className="font-poppins border p-2 rounded-md flex items-center space-x-5">
        <div>
          <h1 className="text-slate-400 text-sm mb-2 font-light">
            Total enfermos
          </h1>
          <h1 className="font-semibold text-4xl">{totalEnfermos}</h1>
        </div>
        <div className="mt-2 bg-red-300 rounded-full h-12 w-12 flex items-center justify-center pt-2">
          <BsFillHeartPulseFill className="text-3xl text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
