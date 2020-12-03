//importamos axios
const axios = require('axios');

const key = `ab928f9d820c31ec81d7368a70ede04e`;

const getLugarLatLng = async(direccion) => {

    const encodedUrl = encodeURI(direccion);

    const instance = axios.create({
        baseURL: `api.openweathermap.org/data/2.5/weather?q=${encodedUrl}&appid=${key}`,
    });

    const resp = await instance.get();

    // if (resp.data.Results.length === 0) {
    //     throw new Error(`No hay resultados para ${direccion}`);
    // }
    // getLugarLatLng
    // const data = resp.data.Results[0];
    // const dir = data.name;
    // const lat = data.lat;
    // const lng = data.lon;

    // return {
    //     dir,
    //     lat,
    //     lng
    // }
    return resp;
}

module.exports = {
    getLugarLatLng
}