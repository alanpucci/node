const fs = require('fs');

let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, err => {
        if (err) throw new Error(`No se pudo guardar`, err);
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index > -1) {
        console.log(index);
        listadoPorHacer[index].completado = true;
        guardarDB();
        return true;
    } else return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index > -1) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else return false;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}