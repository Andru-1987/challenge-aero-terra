import React, { useState } from "react";
import FiltroDistancia from "./FiltroDistancia";
import FiltroLinea from "./FiltroLinea";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const FiltersHeader = ({
  dataValues,
  setDataFiltered,
  setRadius,
  setClickedLatitud,
  clickedLatitud,
}) => {
  const [activeFilter, setActiveFilter] = useState("linea");

  const handleToggle = (filter) => {
    setActiveFilter(filter);
  };

  return (
    < div className="filters">
      <Stack spacing={2} direction="row"  >
        <Button
          variant={activeFilter === "linea" ? "contained" : "outlined"}
          onClick={() => handleToggle("linea")}
        >
          Filtro por linea de colectivo
        </Button>
        <Button
          variant={activeFilter === "distancia" ? "contained" : "outlined"}
          onClick={() => handleToggle("distancia")}
        >
          Filtro por barrio y coordenadas
        </Button>
      </Stack>
      <hr />

      {activeFilter === "linea" ? (
        <FiltroLinea
          dataValues={dataValues}
          setDataFiltered={setDataFiltered}
        />
      ) : (
        <FiltroDistancia
          dataValues={dataValues}
          setDataFiltered={setDataFiltered}
          setRadius={setRadius}
          setClickedLatitud={setClickedLatitud}
          clickedLatitud={clickedLatitud}
        />
      )}
    </div>
  );
};

export default FiltersHeader;
