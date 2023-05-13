import React, { useEffect, useState,memo } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const url_backend  = import.meta.env.VITE_URL_API;

const geoUrl = "features.json";

const colorScale = scaleLinear()
  .domain([1, 8])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({pais,setPais}) => {
  const [data, setData] = useState({});
  const [content, setContent] = useState("Todos");

  const get_data = async () => {
    const response = await fetch(url_backend+"/paises_cantidad");
    const data = await response.json();
    var labels_aux = {};
    data.forEach(element => {
        labels_aux[element.pais] = element.cantidad;
    });
    await setData(labels_aux);
  };
  useEffect(() => {
    get_data();
  }, [pais]);

  return (
    <div className="flex flex-col">
      {
        content !== "Todos"? <h1 className="font-poppins self-center text-base sm:text-xl text-center">Personas con enfermedad cardiovascular en <b>{content}</b> </h1>
        :
        <>
        {
          pais !== "Todos"? <h1 className="font-poppins self-center text-base sm:text-xl text-center">Personas con enfermedad cardiovascular en <b>{pais}</b> </h1> : <h1 className="font-poppins self-center font-medium text-base sm:text-xl text-center">Personas con enfermedad cardiovascular en el mundo</h1>
        }
        </>
      }
    
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
      className="w-full "
    >
      <ZoomableGroup zoom={1.5} center={[0,0]}>
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
                          outline: "none",
                        },
                        hover: {
                          fill: "#FFC200",
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                          fill: "#FFC200",
                        }
                      },
                    } : {
                      style: {
                        default: {
                          outline: "none",
                        },
                        hover: {
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                        }
                      },
                    }
                  }
                  fill={d ? colorScale(d) : "#F5F4F6"}
                  onMouseEnter={() => {
                    setContent(`${geo.properties.name}: ${d?d:0}`);
                  }}
                  onMouseLeave={() => {
                    setContent("Todos");
                  }}
                  onClick={() => {
                      setPais(geo.id);
                    } 
                  }
                />
              );
            })
          }
        </Geographies>
      )}

    </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

export default memo(MapChart);