import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import connectDb from "./db/index.js";
import customerRouter from "./routes/customer.routes.js";
import sellerRouter from "./routes/seller.routes.js";
connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", customerRouter);
app.use("/seller", sellerRouter);
// app.use("/admin", adminRouter);
app.listen(5000);
