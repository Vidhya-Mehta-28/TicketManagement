import express from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../Controllers/commentController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// NOTE: Creating and listing comments is done via /tickets/:id/comments

// @route   PATCH /comments/:id
// @desc    Update a comment
// @access  Private (Owner/Manager)
router.patch('/:id', protect, updateComment);

// @route   DELETE /comments/:id
// @desc    Delete a comment
// @access  Private (Owner/Manager)
router.delete('/:id', protect, deleteComment);

export default router;
