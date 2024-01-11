import React, { useState, memo, useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Circle,
} from "react-leaflet";
import useSwr from "swr";

import "../assets/css/leaflet.css";
import "../assets/css/App.css"

// utils
import { displayTime } from "../utils/updatedTime.js";
import { fetcher } from "../utils/fetcher.js";

import FiltersHeader from "../Filtros/FiltersHeader.jsx";
const envData = import.meta.env;

const centerValue = [-34.603684, -58.381559];
const radiusMetres = {
  
  "1 Kilometros": 1000,
  "2 Kilometros": 2000,
  "3 Kilometros": 3000,
};

const MapaInteractivo = memo(() => {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [radius, setRadius] = useState([]);
  const [clickedLatitud, setClickedLatitud] = useState(
    `${centerValue[0]},${centerValue[1]}`
  );

  const URI = import.meta.env.VITE_API_URL_COLECTIVOS;

  const { data, error } = useSwr(URI, fetcher);

  const dataValues = data && !error ? data : [];

  const MemoizedMarker = memo(Marker);

  const MapRecenter = ({ dataFiltered, dataLength, radius }) => {
    const map = useMap();
    const mapRef = useRef(null);

    const [centerUpdate, setCenterUpdate] = useState(centerValue);
    const handleMapClick = (event) => {
      const { lat, lng } = event.latlng;
      setClickedLatitud(`${lat},${lng}`);
    };

    useEffect(() => {

      map.on("click", handleMapClick);
      mapRef.current = map;

      if (dataFiltered.length === dataLength) {
        map.setView(centerValue);
      } else if (dataFiltered.length > 0) {
        const firstItem = dataFiltered[0];
        setCenterUpdate([firstItem.latitude, firstItem.longitude]);
        map.setView([firstItem.latitude, firstItem.longitude]);
      }

      return () => {
        if (mapRef.current) {
          mapRef.current.off("click", handleMapClick);
        }
      };
    }, [clickedLatitud, dataFiltered, map]);

    return <Circle center={centerUpdate} radius={radiusMetres[radius] ?? 0} />;
  };

  return (
    <>
      <div>
        <FiltersHeader
          dataValues={dataValues}
          clickedLatitud={clickedLatitud}
          setDataFiltered={setDataFiltered}
          setRadius={setRadius}
          setClickedLatitud={setClickedLatitud}

        />
      </div>
      <div>
        <MapContainer center={centerValue} zoom={envData.VITE_ZOOM_INIT}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dataFiltered.slice(0, 500).map((item, index) => (
            <MemoizedMarker
              key={item.id}
              position={[item.latitude, item.longitude]}
            >
              <Popup>
                <h3>Linea de colectivo: {item.route_short_name}</h3>
                <p>Nombre de la empresa: {item.agency_name}</p>
                <p>Se dirige {item.trip_headsign}</p>
                <p>{displayTime(item.timestamp)}</p>
              </Popup>
            </MemoizedMarker>
          ))}

          {dataFiltered.length > 0 && (
            <MapRecenter
              dataFiltered={dataFiltered}
              dataLength={dataValues.length}
              radius={radius}
            />
          )}
        </MapContainer>
      </div>
    </>
  );
});

export default MapaInteractivo;
