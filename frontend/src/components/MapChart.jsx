import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "features.json";

const colorScale = scaleLinear()
  .domain([1, 8])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({pais}) => {
  const [data, setData] = useState({});
  const [content, setContent] = useState("");


  const get_data = async () => {
    const response = await fetch("http://localhost:3900/api/paises_cantidad");
    const data = await response.json();
    var labels_aux = {};
    data.forEach(element => {
        labels_aux[element.pais] = element.cantidad;
    });
    await setData(labels_aux);
  };
  useEffect(() => {
    get_data();
  }, []);

  return (
    <div className="flex flex-col">
      {
        content !== "" ? <h1 className="font-poppins self-center absolute text-xl text-center">Personas con enfermedad cardiovascular en <b>{content}</b> </h1> :
        <h1 className="font-poppins self-center font-medium text-xl absolute text-center">Personas con enfermedad cardiovascular en el mundo</h1>
      
      }
    
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
      style={{
        width: "100%",
        margin: "-10% 0 0 0",
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {Object.keys(data).length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data[geo.id];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  {
                    ...geo.id == pais ? {
                      style: {
                        default: {
                          fill: "#FFC200",
                        },
                        hover: {
                          fill: "#FFC200",
                        }
                      },
                      
                    } : {}
                  }
                  fill={d ? colorScale(d) : "#F5F4F6"}
                  onMouseEnter={() => {
                    setContent(`${geo.properties.name}: ${d?d:0}`);
                  }}
                  onMouseLeave={() => {
                    setContent("");
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
    </div>
  );
};

export default MapChart;