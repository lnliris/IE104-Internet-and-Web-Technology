import express from "express"
import { createBooking } from "../controllers/booking-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
const bookingRouter = express.Router();
    bookingRouter.post("/",authMiddleware,createBooking);
    
export default bookingRouter;