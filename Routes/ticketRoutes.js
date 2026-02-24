import express from 'express';
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket, assignTicket, updateStatus } from '../Controllers/TicketController.js';
import { createComment, getComments } from '../Controllers/commentController.js';
import { protect, ManagerOnly, allowRoles } from '../Middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /tickets
// @desc    Create a new ticket
// @access  Private (User, Manager)
router.post('/', protect, allowRoles('USER', 'MANAGER'), createTicket);

// @route   GET /tickets
// @desc    Get all tickets
// @access  Private
router.get('/', protect, getTickets);

// @route   GET /tickets/:id
// @desc    Get ticket by ID
// @access  Private
router.get('/:id', protect, getTicketById);

// @route   PUT /tickets/:id
// @desc    Update a ticket
// @access  Private
router.put('/:id', protect, updateTicket);

// @route   PATCH /tickets/:id/assign
// @desc    Assign ticket to support (Manager, Support)
// @access  Private (Manager, Support)
router.patch('/:id/assign', protect, allowRoles('MANAGER', 'SUPPORT'), assignTicket);

// @route   PATCH /tickets/:id/status
// @desc    Update ticket status (Manager, Support)
// @access  Private (Manager, Support)
router.patch('/:id/status', protect, allowRoles('MANAGER', 'SUPPORT'), updateStatus);

// @route   DELETE /tickets/:id
// @desc    Delete a ticket (Manager only)
// @access  Private (Manager)
router.delete('/:id', protect, ManagerOnly, deleteTicket);

// Comments nested under tickets
// @route   POST /tickets/:id/comments
// @desc    Add a comment to a ticket
// @access  Private
router.post('/:id/comments', protect, createComment);

// @route   GET /tickets/:id/comments
// @desc    Get all comments for a ticket
// @access  Private
router.get('/:id/comments', protect, getComments);

export default router;
