import TicketComment from '../Models/TicketComment.js';
import sendResponse from '../utils/responseHandler.js';
import Ticket from '../Models/Ticket.js';

const hasTicketAccess = (user, ticket) => {
    if (!user || !ticket) return false;
    if (user.role === 'MANAGER') return true;
    if (user.role === 'SUPPORT') return ticket.assigned_to && ticket.assigned_to.toString() === user.id.toString();
    if (user.role === 'USER') return ticket.createdby && ticket.createdby.toString() === user.id.toString();
    return false;
};
export const createComment = async (req, res) => {
    try {
        const { id: ticketId } = req.params;
        if (!ticketId) return sendResponse(res, 400, false, null, 'ticketId is required');

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) return sendResponse(res, 404, false, null, 'Ticket not found');

        if (!hasTicketAccess(req.user, ticket)) return sendResponse(res, 403, false, null, 'Not authorized to comment on this ticket');

        const comment = await TicketComment.create({ comment: req.body.comment, user: req.user.id, ticket: ticketId });
        return sendResponse(res, 201, true, comment, 'Comment created');
    } catch (err) {
        return sendResponse(res, 500, false, null, err.message);
    }
};

export const getComments = async (req, res) => {
    try {
        const { id: ticketId } = req.params;
        if (!ticketId) return sendResponse(res, 400, false, null, 'ticketId is required');

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) return sendResponse(res, 404, false, null, 'Ticket not found');

        if (!hasTicketAccess(req.user, ticket)) return sendResponse(res, 403, false, null, 'Not authorized to view comments for this ticket');

        const comments = await TicketComment.find({ ticket: ticketId }).populate('user', 'username name -_id');
        return sendResponse(res, 200, true, comments, 'Comments fetched');
    } catch (err) {
        return sendResponse(res, 500, false, null, err.message);
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await TicketComment.findById(req.params.id);
        if (!comment) return sendResponse(res, 404, false, null, 'Comment not found');

        if (req.user.role !== 'MANAGER' && comment.user.toString() !== req.user.id.toString()) {
            return sendResponse(res, 403, false, null, 'Not authorized to edit this comment');
        }

        comment.comment = req.body.comment ?? comment.comment;
        await comment.save();
        return sendResponse(res, 200, true, comment, 'Comment updated');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await TicketComment.findById(req.params.id);
        if (!comment) return sendResponse(res, 404, false, null, 'Comment not found');

        if (req.user.role !== 'MANAGER' && comment.user.toString() !== req.user.id.toString()) {
            return sendResponse(res, 403, false, null, 'Not authorized to delete this comment');
        }

        await TicketComment.findByIdAndDelete(req.params.id);
        return sendResponse(res, 200, true, null, 'Comment deleted');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export default { createComment, getComments, updateComment, deleteComment };
