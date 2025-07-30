import mongoose, { Schema, Document} from "mongoose";

export interface IProduct extends Document {
    name : string;
    quality: string;
    price: number;
    imageUrl: string;
}

const productSchema = new Schema<IProduct>({
    name: {
        type : String,
        required : true,
    },
    quality: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    }
},  
    { 
        timestamps: true
    });

const Product = mongoose.model<IProduct>('Product',productSchema);
export default Product;