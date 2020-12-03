const express = require('express')
const app = express()

//Uso de middleware con express en caso que queramos mostrar un archivo
//html como estatico
//Podemos acceder a otras paginas a traves del /blabla.html
//que esten dentro de la carpeta public
//app.use(express.static(__dirname + '/public'));

const hbs = require('hbs');
//Con el dirname, usamos como un buscador general en todo nuestro proyecto
//y no tenemos que especificar un path concreto.accordion
//A esto le concatenamos el directorio donde queremos acceder al final
hbs.registerPartials(__dirname + '/views/parciales');

//helpers para no repetir codigo en los metodos
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
})

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'Alan'
    });
})
app.get('/about', (req, res) => {

    res.render('about', {
        nombre: 'Alan'
    });
})


app.listen(3000, () => {
    console.log(`Escuchando peticiones en el puerto 3000`);
})