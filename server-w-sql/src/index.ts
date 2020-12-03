import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection} from 'typeorm';


import userRoutes from './routes/user.routes'

//nuestro servidor
const app = express();
createConnection();

//midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); //interpretar datos en forma json

//routes
app.use(userRoutes);

app.listen(3000);

console.log(`Server on port`, 3000);
