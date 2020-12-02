//Existen 3 tipos de requires
//Cuando utilizamos una libreria existente de node
//Cuando utilizamos una libreria no perteneciente a node pero que la instalamos
//Cuando utilizamos algun archivo que nosotros creamos, usamos ./
const fs = require('fs');

//Guardar en archivo

// let crearArchivo = async(base) => {
//     let data = '';
//     for (let i = 1; i <= 10; i++) {
//         data += `${base} * ${i} = ${base*i}\n`;
//     }
//     fs.writeFile(`tablas-${base}.txt`, data, err => {
//         if (err) throw new Error(err);
//         else return `tablas-${base}.txt`;
//     });
// }

const crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(base)) {
            let data = '';
            for (let i = 1; i <= limite; i++) {
                data += `${base} * ${i} = ${base*i}\n`;
            }
            fs.writeFile(`tablas-${base}.txt`, data, err => {
                if (err) reject(err);
                else resolve(`tablas-${base}.txt`);
            })
        } else {
            reject(`No se pudo crear el archivo`.red);
        }
    })
}

const listarArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(base)) {
            for (let i = 1; i <= limite; i++) {
                console.log(`${base} * ${i} = ${base*i}`.yellow);
            }
            resolve(`${base}`);
        } else
            reject(`El dato ingresado no es un numero`.red);
    })
}

module.exports = {
    crearArchivo,
    listarArchivo
}