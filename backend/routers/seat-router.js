import { updateStatusSeat } from "../controllers/seat-controller.js";
import express from "express"
const SeatRouter = express.Router();
    SeatRouter.put('/:id', updateStatusSeat);
    SeatRouter.put('/:id', updateStatusSeat);
export default SeatRouter;