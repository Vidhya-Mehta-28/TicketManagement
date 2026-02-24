import jwt from 'jsonwebtoken';
import sendResponse from '../utils/responseHandler.js';
import User from '../Models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return sendResponse(res, 401, false, null, 'Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth Error:', error.message);
        return sendResponse(res, 401, false, null, 'Not authorized, token failed');
    }
};

export const ManagerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'MANAGER') {
        next();
    } else {
        return sendResponse(res, 403, false, null, 'Not authorized: Manager access required');
    }
};

export const SupportOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'SUPPORT' || req.user.role === 'MANAGER')) {
        next();
    } else {
        return sendResponse(res, 403, false, null, 'Not authorized: Support or Manager access required');
    }
};

export const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            return sendResponse(res, 403, false, null, `Not authorized: ${roles.join(' or ')} access required`);
        }
    };
};
