import React, { useEffect, useState ,memo} from "react";

const FiltroLinea = memo(({ dataValues, setDataFiltered }) => {
  const [selectedLinea, setSelectedLinea] = useState('');
  const uniqueLines = Array.from(
    new Set(dataValues.map((i) => i.route_short_name))
  );

  const handleLineaChange = (e) => {
    setSelectedLinea(e.target.value);
  };

  useEffect(() => {

    const filteredData = selectedLinea
      ? dataValues.filter((item) => item.route_short_name === selectedLinea)
      : dataValues;

      setDataFiltered(filteredData);

  }, [ selectedLinea, setDataFiltered]);

  return (
    <div className="search">
      <label htmlFor="linea">Seleccione una línea de colectivo:</label>
      <input
        type="text"
        list="lineaOptions"
        placeholder="Todas las líneas"
        onChange={handleLineaChange}
        value={selectedLinea}
        className="inputFormat"
      />
      <datalist id="lineaOptions">
        <option value="" label="Todas las líneas" />
        {uniqueLines.map((item, index) => (
          <option key={index} value={item} />
        ))}
      </datalist>
    </div>
  );
});

export default FiltroLinea;
