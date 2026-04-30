import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import messageRoutes from "./routes/message.routes.js";
import chatWidgetRoutes from "./routes/chatWidget.routes.js";
import publicRoutes from "./routes/public.routes.js";
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin/widgets", chatWidgetRoutes);
app.use("/api/public", publicRoutes);

export default app;