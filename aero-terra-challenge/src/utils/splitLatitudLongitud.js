const splitCoordinates = (input) => {
    if(!input) return null;

    
    if (typeof input !== 'string') {
        const {latitude,longitude} = input
        input =`${latitude},${longitude}`;
    }

    const match = input.match(/^([+-]?\d+(\.\d+)?)\s*,\s*([+-]?\d+(\.\d+)?)$/);

    if (!match) {
        console.error('Invalid coordinates format');
        return null;
    }

    const [, latitude, , longitude] = match;

    return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
    };
};

export default splitCoordinates