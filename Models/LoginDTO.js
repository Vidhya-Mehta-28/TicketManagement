import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const LoginSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });


const LoginUser = mongoose.model('login', LoginSchema);
export default LoginUser;
