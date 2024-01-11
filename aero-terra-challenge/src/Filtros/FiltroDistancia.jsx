import React, { useEffect, useState,memo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import getUbicaciones from "../utils/getUbicaciones";
import filterMarkersByRadius from "../utils/radiusFilter";
import useSwr from "swr";
import { fetcher } from "../utils/fetcher";
import splitCoordinates from "../utils/splitLatitudLongitud";

import Options from "./Options";

const FiltroDistancia = memo(({
  dataValues,
  setDataFiltered,
  setRadius,
  setClickedLatitud,
  clickedLatitud,
}) => {
  const setDistancias = [ "1 Kilometros", "2 Kilometros", "3 Kilometros"];
  const [selectedOption, setSelectedOption] = useState("barrio");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("default");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const URI =import.meta.env.VITE_API_URL_BARRIOS
  const { data, error } = useSwr(URI, fetcher);

  const ubicaciones = data && !error ? getUbicaciones(data) : [];

  const handleDistanceChange = (e) => {
    setSelectedDistance(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedValue("");
  };

  const handleCoordChange = (e) => {
    let value = e.target.value;

    setSelectedValue(value);
    const result = splitCoordinates(value);

    if (result) {
      setCoordinates(result);
      setClickedLatitud(`${result.latitude},${result.longitude}`);
    }
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    
    setSelectedValue(value);
    setCoordinates(null);

  };

  useEffect(() => {


    let center = null;

    if (selectedOption === "barrio") {
      center = ubicaciones[selectedValue] ?? {
        latitud: -34.603684,
        longitud: -58.381559,
      };
    } else {
      const { latitude, longitude } = splitCoordinates(clickedLatitud);

      center = {
        latitud: latitude,
        longitud: longitude,
      };
    }

    const { latitud, longitud } = center;

    setCoordinates({ latitude: latitud, longitude: longitud });

    const radiusMetres = {
      
      "1 Kilometros": 1000,
      "2 Kilometros": 2000,
      "3 Kilometros": 3000,
      
      default: import.meta.env.VITE_MAX_RADIUS,
    };

    const ratio = radiusMetres[selectedDistance];

    const data = filterMarkersByRadius(center, dataValues, ratio);

    setRadius(selectedDistance);

    let reCenterUpdate = { id: 1, latitude: latitud, longitude: longitud };
    let dataTotal = data ? [reCenterUpdate, ...data] : [reCenterUpdate]

    setDataFiltered(dataTotal);

  },  [selectedDistance, selectedValue, clickedLatitud,selectedOption]);

  return (
    <div>
      <Options
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
      />

      {selectedOption === "barrio" && (
        <div>
          <input
            list="barrios"
            placeholder="Seleccione un barrio"
            value={selectedValue}
            onChange={handleValueChange}
            className="inputFormat"
          />
          <datalist id="barrios">
            {Object.keys(ubicaciones).map((ubicacion) => (
              <option key={ubicacion} value={ubicacion} />
            ))}
          </datalist>
        </div>
      )}

      <div>
        {selectedOption === "coordenadas" && (
          <>
            <p>Inserte las coordenadas o haga click sobre el punto de partida</p>
            <input
              type="text"
              placeholder="-34.567, -123.456"
              value={clickedLatitud}
              onChange={handleCoordChange}
              className="inputFormat"
            />
          </>
        )}
      </div>

      {coordinates && selectedOption === "coordenadas" ? (
        <div>
          <p>Latitud: {coordinates.latitude}</p>
          <p>Longitud: {coordinates.longitude}</p>
        </div>
      ) : (
        ""
      )}

      {setDistancias.map((distancia) => (
        <div key={distancia}>
          <label>
            <input
              type="radio"
              value={distancia}
              checked={selectedDistance === distancia}
              onChange={handleDistanceChange}
            />
            {distancia}
          </label>
        </div>
      ))}

      <div>
        <label>
          <input
            type="radio"
            value="default"
            checked={selectedDistance === "default"}
            onChange={handleDistanceChange}
            hidden
          />
        </label>
      </div>
    </div>
  );
});

export default FiltroDistancia;
