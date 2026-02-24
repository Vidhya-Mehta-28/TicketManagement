import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/authController.js';
import { protect, ManagerOnly } from '../Middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /auth/manager-route
// @desc    Test route for managers only
// @access  Private (Manager)
router.get('/manager-route', protect, ManagerOnly, (req, res) => {
    res.send('This route is only for Managers');
});

// @route   POST /auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   GET /auth/users
// @desc    Get all users (Manager only)
// @access  Private (Manager)
router.get('/users', protect, ManagerOnly, getAllUsers);

// @route   GET /auth/users/:id
// @desc    Get user by ID (Manager only)
// @access  Private (Manager)
router.get('/users/:id', protect, ManagerOnly, getUserById);

// @route   PUT /auth/users/:id
// @desc    Update user (Manager only)
// @access  Private (Manager)
router.put('/users/:id', protect, ManagerOnly, updateUser);

// @route   DELETE /auth/users/:id
// @desc    Delete user (Manager only)
// @access  Private (Manager)
router.delete('/users/:id', protect, ManagerOnly, deleteUser);

export default router;
