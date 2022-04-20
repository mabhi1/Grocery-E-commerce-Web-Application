const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;

router.get('/', async (req, res) => {
    try {
      const productsList = await productsData.getAllProducts();
      res.json(productsList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productsData.getProductById(req.params.id);
        res.json(product);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    //console.log(newProduct);
    try{
        const product = await productsData.createProduct(newProduct);
        res.json(product);
    }catch(e){
        res.status(404).json({ error: e });
    }
});

router.post('/category/asc/:category', async (req, res) => {
    const category = req.params.category;
    try{
        const products = await productsData.sortAscByCategory(category);
        res.json(products);
    }catch(e){
        res.status(404).json({ error: e });
    }   
});

router.post('/category/des/:category', async (req, res) => {
    const category = req.params.category;
    try{
        const products = await productsData.sortDesByCategory(category);
        res.json(products);
    }catch(e){
        res.status(404).json({ error: e });
    }   
});

router.post('/category/:category', async (req, res) => {
    const category = req.params.category;
    try{
        const products = await productsData.sortDesByCategory(category);
        res.json(products);
    }catch(e){
        res.status(404).json({ error: e });
    }   
});

module.exports= router;