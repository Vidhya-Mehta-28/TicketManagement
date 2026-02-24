import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import sendResponse from '../utils/responseHandler.js';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return sendResponse(res, 400, false, null, 'User already exists');
        }

        const user = await User.create({
            username,
            email,
            password,
            role: role || 'USER'
        });

        if (user) {
            sendResponse(res, 201, true, {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            }, 'User registered successfully');
        } else {
            sendResponse(res, 400, false, null, 'Invalid user data');
        }
    } catch (error) {
        console.error('registerUser error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            sendResponse(res, 200, true, {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            }, 'Login successful');
        } else {
            sendResponse(res, 401, false, null, 'Invalid email or password');
        }
    } catch (error) {
        console.error('loginUser error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            sendResponse(res, 200, true, {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }, 'User profile fetched');
        } else {
            sendResponse(res, 404, false, null, 'User not found');
        }
    } catch (error) {
        console.error('getUserProfile error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        if (users) {
            sendResponse(res, 200, true, users, 'All users fetched successfully');
        } else {
            sendResponse(res, 404, false, null, 'No users found');
        }
    } catch (error) {
        console.error('getAllUsers error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            sendResponse(res, 200, true, user, 'User fetched successfully');
        } else {
            sendResponse(res, 404, false, null, 'User not found');
        }
    } catch (error) {
        console.error('getUserById error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return sendResponse(res, 404, false, null, 'User not found');
        }

        // Update allowed fields
        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;
        if (req.body.role) user.role = req.body.role;
        if (req.body.password) user.password = req.body.password;

        // Save will trigger the pre-save middleware to hash password
        await user.save();

        // Return user without password
        const updatedUser = await User.findById(req.params.id).select('-password');
        sendResponse(res, 200, true, updatedUser, 'User updated successfully');
    } catch (error) {
        console.error('updateUser error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            sendResponse(res, 200, true, null, 'User deleted successfully');
        } else {
            sendResponse(res, 404, false, null, 'User not found');
        }
    } catch (error) {
        console.error('deleteUser error:', error);
        sendResponse(res, 500, false, null, error.message);
    }
};

export default { registerUser, loginUser, getUserProfile, getAllUsers, getUserById, updateUser, deleteUser };
