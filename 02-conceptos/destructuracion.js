let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre: function() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
    }
};

console.log(deadpool.getNombre());

//Destructuracion
let { nombre, apellido, poder } = deadpool;

console.log(nombre, apellido, poder);


//Funciones flechas
const saludar = () => 'Hola mundo';
console.log(saludar);