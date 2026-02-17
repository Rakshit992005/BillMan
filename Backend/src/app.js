import express from 'express'
import userRoutes from "../src/routes/user.routes.js"
import cookieParser from 'cookie-parser';
import customerRoutes from "../src/routes/customer.routes.js"


const app = express();


app.use(express.json());
app.use(cookieParser());


app.use('/api/user' , userRoutes);

app.use('/api/customer' , customerRoutes);


export default app;