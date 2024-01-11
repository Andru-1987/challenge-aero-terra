const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371000; 
    const phi1 = lat1 * (Math.PI / 180);
    const phi2 = lat2 * (Math.PI / 180);
    const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
    const deltaLambda = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance; 
  }

const filterMarkersByRadius=(center, markers, radius = undefined) => {
    if (!radius) return markers

    const filteredMarkers = markers.filter((marker) => {
      const distance = calculateDistance(
        center.latitud, 
        center.longitud, 
        marker.latitude, 
        marker.longitude 
      );
  
      return distance <= radius;
    });
  
    return filteredMarkers;
  }

export default filterMarkersByRadius