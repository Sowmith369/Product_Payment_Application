import { Request, Response } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from "../models/Admin.js";

dotenv.config();

export const loginAdmin = async (req: Request, res: Response) =>{
    const { email, password} = req.body

    try{
        const admin = await Admin.findOne({email})

        if (!admin) {
            return res.status(401).json({message:'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({message:"Invalid email or password"});
        }

        const token = jwt.sign(
            {id: admin._id, email:admin.email, role:admin.role},
            process.env.JWT_SECRET!,
            { expiresIn:'1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message:'Internal Server Error'});
    }
};