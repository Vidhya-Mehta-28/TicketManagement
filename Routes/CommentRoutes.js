import express from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../Controllers/commentController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();


router.patch('/:id', protect, updateComment);

router.delete('/:id', protect, deleteComment);

export default router;
