import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import ticketRoutes from './Routes/ticketRoutes.js';
import commentRoutes from './Routes/CommentRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);
app.use('/comments', commentRoutes);

mongoose.connect("mongodb+srv://Vidhya28:Vidhya28@cluster502.1jobe.mongodb.net/TicketManagement")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
