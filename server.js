import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import companyRoutes from "./routes/compRoutes.js";
import eWasteRoutes from './routes/eWasteRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

// https://e-waste-six.vercel.app

const app = express();
const port = 5174;

//middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true                
  }));
app.use(cookieParser());
env.config();

//mongoDb connection
mongoose
    .connect('mongodb+srv://yasersiddiquee:yjeu3vw2ZGKipwL3@cluster0.gk8fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log("Mongo connection error --->", err));



//routes
app.use('/api/auth/user', userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/e-waste", eWasteRoutes);
app.use("/api/auth/company", companyRoutes);
app.use("/uploads", express.static("uploads"));


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})