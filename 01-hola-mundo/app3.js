console.log('Inicio del programa');

setTimeout(() => {
    console.log('Primer timeout');
}, 3000);

setTimeout(() => {
    console.log('Segundo timeout');
}, 30);

setTimeout(() => {
    console.log('Tercer timeout');
}, 30);

console.log('Fin del programa');