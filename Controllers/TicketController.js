import Ticket from '../Models/Ticket.js';
import sendResponse from '../utils/responseHandler.js';
import User from '../Models/User.js';

export const createTicket = async (req, res) => {
    try {
        const payload = { ...req.body, createdby: req.user.id };
        const ticket = await Ticket.create(payload);
        return sendResponse(res, 201, true, ticket, 'Ticket created');
    } catch (err) {
        return sendResponse(res, 500, false, null, err.message);
    }
};
export const getTickets = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'SUPPORT') {
            query.assigned_to = req.user.id;
        } else if (req.user.role === 'USER') {
            query.createdby = req.user.id;
        }
        // MANAGER sees all

        const tickets = await Ticket.find(query).populate('createdby assigned_to', '-password');
        return sendResponse(res, 200, true, tickets, 'Tickets fetched');
    } catch (err) {
        return sendResponse(res, 500, false, null, err.message);
    }
};
export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('createdby assigned_to', '-password');
        if (!ticket) return sendResponse(res, 404, false, null, 'Ticket not found');
        return sendResponse(res, 200, true, ticket, 'Ticket fetched');
    } catch (err) {
        return sendResponse(res, 400, false, null, 'Invalid ID');
    }
};

export const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return sendResponse(res, 200, true, ticket, 'Ticket updated');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export const deleteTicket = async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        return sendResponse(res, 200, true, null, 'Ticket deleted');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export const assignTicket = async (req, res) => {
    try {
        const { assigneeId } = req.body;
        if (!assigneeId) return sendResponse(res, 400, false, null, 'assigneeId is required');

        const user = await User.findById(assigneeId);
        if (!user) return sendResponse(res, 404, false, null, 'Assignee user not found');

        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { assigned_to: assigneeId }, { new: true }).populate('createdby assigned_to', '-password');
        if (!ticket) return sendResponse(res, 404, false, null, 'Ticket not found');

        return sendResponse(res, 200, true, ticket, 'Ticket assigned');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return sendResponse(res, 400, false, null, 'status is required');

        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('createdby assigned_to', '-password');
        if (!ticket) return sendResponse(res, 404, false, null, 'Ticket not found');

        return sendResponse(res, 200, true, ticket, 'Ticket status updated');
    } catch (err) {
        return sendResponse(res, 400, false, null, err.message);
    }
};

export default { createTicket, getTickets, getTicketById, updateTicket, deleteTicket, assignTicket, updateStatus };
