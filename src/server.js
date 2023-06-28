import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(errorHandler);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

const PORT = 8080;

app.listen(PORT, ()=> {
    console.log(`server ok en puerto ${PORT}`)
})

