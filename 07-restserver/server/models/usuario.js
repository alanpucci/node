const mongoose = require('mongoose');
//Validaciones unicas (por ejemplo mail)
const uniqueValidator = require('mongoose-unique-validator');

//Determinamos que roles son validos unicamente
let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}


//Creamos un nuevo esquema
let Schema = mongoose.Schema;

//Creamos un esquema de usuario
let usuarioSchema = new Schema({
    nombre: {
        type: String, //tipo string
        required: [true, `El nombre es necesario`] //es obligatorio, ponemos entre corchetes para mandar un mensaje personalizado
    },
    email: {
        type: String,
        unique: true, //Para que no se pueda volver a ingresar el mismo mail
        required: [true, `El correo es necesario`]
    },
    password: {
        type: String,
        required: [true, `El password es necesario`]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado: {
        type: Boolean,
        require: true,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    }
});

//Eliminamos la contrasena para que no aparezca en la db
//Modificamos el metodo toJSON ya que este siempre es llamado cuando se intenta imprimir
//No usamos funcion flecha porque necesitamos el "this"
usuarioSchema.methods.toJSON = function() {
    //me guardo lo que tenga en ese momento
    let user = this;
    //tomo el objeto de ese usuario
    let userObject = user.toObject();
    //borro el password
    delete userObject.password;
}

//A nuestro esquema de usuario vamos a meterle el plugin del uniqueValidator
//ademas de forma opcional podemos agregarle un mensaje
usuarioSchema.plugin(uniqueValidator, {
    mensaje: '{PATH} debe de ser unico'
});

//Para importarlo lo importamos de esta manera, es un modelo de mongoose
//pero evitando que se llame "usuarioSchema" como esta declarado arriba,
//por lo tanto le damos el nombre de "Usuario"
module.exports = mongoose.model('Usuario', usuarioSchema);