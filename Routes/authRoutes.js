import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/authController.js';
import { protect, ManagerOnly } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/manager-route', protect, ManagerOnly, (req, res) => {
    res.send('This route is only for Managers');
});
0
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);

router.get('/users', protect, ManagerOnly, getAllUsers);

router.get('/users/:id', protect, ManagerOnly, getUserById);

router.put('/users/:id', protect, ManagerOnly, updateUser);

router.delete('/users/:id', protect, ManagerOnly, deleteUser);

export default router;
