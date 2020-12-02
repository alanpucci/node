let empleados = [{
    id: 1,
    nombre: 'Alan'
}, {
    id: 2,
    nombre: 'Ezequiel'
}, {
    id: 3,
    nombre: 'Juan'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = async(id) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);
    if (!empleadoDB) {
        throw new Error(`No existe un empleado con el ID ${id}`);
    } else {
        return empleadoDB;
    }
}

let getSalario = async(empleado) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    if (!salarioDB) {
        throw new Error(`No existe un salario para el empleado ${empleado.nombre}`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        };
    }
}

let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let respuesta = await getSalario(empleado);
    return `${respuesta.nombre} tiene un salario de: $${respuesta.salario}`
}

getInformacion(4)
    .then(mensaje => console.log(mensaje))
    .catch(error => console.log(error));