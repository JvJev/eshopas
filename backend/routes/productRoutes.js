import express from 'express';
import Product from '../schemas/productSchema.js';

const productRouter =
  ('/',
  async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });

productRouter.get('/id/id', async (req, res) => {
  const product = await Product.findOne({id: req.params.id});
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default productRouter;
