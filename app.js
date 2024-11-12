import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import connectDb from "./db/index.js";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.listen(5000);