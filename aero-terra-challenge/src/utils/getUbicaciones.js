const getUbicaciones =  (data) => {


  const newData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const [lat, lon] = data[key];
      newData[key] = {
        latitud: lat,
        longitud: lon
      };
    }
  }

  return newData;
}


export default getUbicaciones