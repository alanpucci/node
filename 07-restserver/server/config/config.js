// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
//en caso de que no existiese la primera condicion, significa que estoy en desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del token
// ============================
process.env.CADUCIDAD_TOKEN = '48h'

// ============================
//  SEED d==========================
//No quiero que esto se visualice, por lo tanto voy a declarar una variable
//de entorno en heroku para que sea el seed
process.env.SEED = process.env.SEED || 'secret'

// ============================
//  Base de datos
// ============================

let urlDB;

//En caso de que estemos en desarrollo, la url de la DB va a ser la local
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //Sino, me conecto a la DB de la nube
    urlDB = process.env.MONGO_URI; //variable de entorno heroku
}

process.env.URLDB = urlDB;

// ============================
//  Google Client ID    
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '165917385202-dhr9gsuc48scs2ghgpk6dc04hqv3lmoj.apps.googleusercontent.com'