import { Request, Response } from 'express';
import Product from '../models/Product.js';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(400).json({error:'Product creation failed', details:err.message});
    }
}

export const getAllProducts = async (req:Request, res:Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching Products:', err);
        res.status(400).json({error:'Failed to Fetch products', details: err.message});
    }
};

export const getProductsById = async (req:Request,res:Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found'});
        }
        res.json(product);
    } catch (err) {
        console.error('Error getting product by ID:',err);
        if (err.name === 'CastError') {
            return res.status(400).json({
                error:'Invalid product ID format'
            });
        }
        res.status(500).json({error:'Failed to get product', details:err.message});
    }
};

export const updateProduct = async (req:Request,res:Response) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({error:'Product not found'});
        }
        res.json(updated);
    } catch (err) {
        console.error('Error updating Product',err);
        if(err.name === 'CastError') {
            return res.status(400).json({
                error:'Invalid product ID format'
            });
        }
        if (err.name  === 'ValidationError') {
            return res.status(400).json({
                error:'Product validation failed',
                details:err.message
            });
        }
        res.status(400).json({
            error:'Product update failed',
            details: err.message
        });
    }
};

export const deleteProduct = async (req:Request, res:Response) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({error:'Product not found'});
        } 
        res.json({message:'Product deleted successfully'})
    } catch (err) {
        console.error('Error deleting product:',err);
        if (err.name === 'CastError') {
            return res.status(400).json({
                error:'Invalid product ID format'
            });
        }
        res.status(500).json({
            error:'Product deletion failed',
            details: err.message
        });
    }
};