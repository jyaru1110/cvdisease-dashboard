import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
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
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    csv('vulnerability.csv').then((data) => {
      setData(data);
    });

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
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    setContent(`${geo.properties.name}: ${d["2017"]}%`);
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