import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
}

const adminSchema = new Schema<IAdmin>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    }
}, {
    timestamps: true,
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;