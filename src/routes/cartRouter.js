import { Router } from "express";
import { __dirname } from "../../utils.js";
import CartManager from "../managers/cartManager.js";


const router = Router();

const cartManager = new CartManager(__dirname + '/src/db/carts.json');


router.post('/', async (req,res)=>{
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json(newCart);
    } catch (error) {
        res.status(404).send('Error al crear el nuevo carrito ');
    }
})

router.get('/:idCart', async (req,res)=>{
    try {
        const {idCart} = req.params;
        const cart = await cartManager.getCartById(Number(idCart));
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).send('Carrito no encontrado');
    }
})

router.post('/:idCart/product/:idProduct', async (req,res)=>{

    try {

        const {idCart, idProduct} = req.params;
        const newProdtoCart = await cartManager.addProductToCart(Number(idCart),Number(idProduct))
        res.status(200).json('Producto agregado con exito');
        
    } catch (error) {
        console.log(error);
        res.status(404).send('El producto no se pudo agregar con exito');
    }


})

export default router;