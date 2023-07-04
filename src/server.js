import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { __dirname } from "../utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.use('/', viewsRouter);

const PORT = 8080;

app.listen(PORT, ()=> {
    console.log(`server ok en puerto ${PORT}`)
})

