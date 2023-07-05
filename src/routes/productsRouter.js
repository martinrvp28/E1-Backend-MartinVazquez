import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
import {upload} from "../middlewares/multerThumbnail.js";

const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', async (req,res)=> {

    const limit = Number(req.query.limit);

    try {
        const products = await productManager.getProducts();

        if (limit) {
            if (products.length < limit) {
                res.status(200).json(products);
            } else{
                res.status(200).json(products.slice(0,limit));
            }
        } else {
            res.status(200).json(products);
        }

    } catch (error) {
        next(error);
        
    }
    
    
})

router.get('/:idProd', async (req,res)=> {

    try {

        const {idProd} = req.params;
        const product = await productManager.getProductById(Number(idProd));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json({message : 'Product not found'});
        }
    } catch (error) {
        next(error);
    }

})

router.post('/', upload.array('thumbnail'), async (req, res, next) => {
    
    try {

        const prod = {
            ...req.body,
            thumbnail: []
        }    
        prod.stock=Number(prod.stock);
        prod.price=Number(prod.price);

        const thumb = req.files;
        if (thumb) thumb.forEach(f => prod.thumbnail.push(f.path));

        console.log(prod);
        
        const newProduct = await productManager.addProduct(prod);
        res.json(newProduct);
        
    } catch (error) {

        next(error);

    }
    
});

router.put('/:id', async (req, res, next) => {
    
    try {
        const {id} = req.params;
        const newInfo = req.body;
        console.log(newInfo);
    
        const updProduct = await productManager.updateProduct(Number(id),newInfo);
        res.json(updProduct);
        
    } catch (error) {
        next(error);
    }
    
});


router.delete('/:id', async (req, res, next) => {

    try {

        const {id} = req.params;
        const delProd = await productManager.deleteProduct(Number(id));
        res.json(delProd);
        
    } catch (error) {
        next(error);
    }
})


export default router;