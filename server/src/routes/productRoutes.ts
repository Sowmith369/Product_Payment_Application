import express  from 'express';
import { createProduct, getAllProducts, getProductsById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/',getAllProducts);
router.get('/:id',getProductsById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

export default router;