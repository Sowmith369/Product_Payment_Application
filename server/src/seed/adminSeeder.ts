import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Admin from "../models/Admin.js";
import connectDB from "../config/database.js";
import { error } from "console";

dotenv.config();

const seedAdmins = async () => {
    try {
        await connectDB();

        const admins = [
            {
                name: 'Sowmith Jetty',
                email: 'admin@gmail.com',
                password: 'admin123',
                role: 'superadmin'
            },
            {
                name: 'Sowmith Jetty',
                email: 'jettysowmith@gmail.com',
                password: 'sowmith123',
                role: 'admin'
            },
        ];

        for (const admin of admins){
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
        }

        await Admin.insertMany(admins);
        console.log('Admins seeded successfully!');
        process.exit(0);
    } catch {
        console.error('Error seeding admins:', error);
        process.exit(1);
    }  
};

const destroyData = async () => {
    try {
        await connectDB();
        await Admin.deleteMany();
        console.log('Admins deleted successfully!');
        process.exit(0);
    } catch {
        console.error('Error deleting admins:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d'){
    destroyData();
} else {
    seedAdmins();
}