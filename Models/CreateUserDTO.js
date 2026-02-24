import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const CreateUserDTOSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
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
    },
    role: {
        type: String,
        enum: ['Manager', 'Support', 'User'],
        default: 'Manager'
    }
}, { timestamps: true });

CreateUserDTOSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

CreateUserDTOSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserDTO = mongoose.model('UserDTO', CreateUserDTOSchema);
export default UserDTO;
