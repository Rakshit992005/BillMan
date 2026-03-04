import express from 'express'
import userRoutes from "../src/routes/user.routes.js"
import cookieParser from 'cookie-parser';
import customerRoutes from "../src/routes/customer.routes.js"
import invoiceRoutes from "../src/routes/invoice.routes.js"
import dashboardRoutes from "../src/routes/dashboard.routes.js"
import cors from 'cors'

const app = express();


app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({limit:"50mb", extended: true }));
app.use('/api/user' , userRoutes);

app.use('/api/customer' , customerRoutes);

app.use('/api/invoice' , invoiceRoutes );

app.use("/api/dashboard" , dashboardRoutes);

export default app;