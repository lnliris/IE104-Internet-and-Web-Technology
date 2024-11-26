import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user-router.js";
import movieRouter from "./routers/movie-router.js"
import couponRouter from "./routers/coupon-router.js"
import Account from "./models/account-model.js";
import AccountRouter from "./routers/account-router.js";
dotenv.config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1qcpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => 
    app.listen(8081,() => {
    console.log("Connected to Database and Server is running")}
    )
)
.catch((e) => console.log(e));
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/coupon", couponRouter);
app.use("/account", AccountRouter);




