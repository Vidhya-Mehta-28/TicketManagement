import express from 'express';
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket, assignTicket, updateStatus } from '../Controllers/TicketController.js';
import { createComment, getComments } from '../Controllers/commentController.js';
import { protect, ManagerOnly, allowRoles } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, allowRoles('USER', 'MANAGER'), createTicket);


router.get('/', protect, getTickets);


router.get('/:id', protect, getTicketById);


router.put('/:id', protect, updateTicket);


router.patch('/:id/assign', protect, allowRoles('MANAGER', 'SUPPORT'), assignTicket);

router.patch('/:id/status', protect, allowRoles('MANAGER', 'SUPPORT'), updateStatus);

router.delete('/:id', protect, ManagerOnly, deleteTicket);

router.post('/:id/comments', protect, createComment);

router.get('/:id/comments', protect, getComments);

export default router;
