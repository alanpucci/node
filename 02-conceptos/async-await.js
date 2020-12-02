let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Alan');
        }, 2000)
    })
}

//El resultado de async es lo mismo que declarar una promesa
//Con el metodo await, pausa la ejecucion del async hasta obtener el resultado
//de esa funcion
let saludar = async() => {
    let nombre = await getNombre();
    return `hola ${nombre}`;
};

saludar().then(resp => console.log(resp)).catch(err => console.log(err))