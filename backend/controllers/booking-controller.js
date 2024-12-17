import mongoose from "mongoose";
import TicketModel from "../models/ticket-model.js";
import BookingModel from "../models/booking-model.js";
import FandBModel from "../models/F&B-model.js";
import Account from "../models/account-model.js";

export const createBooking = async (req, res) => {
    const { ticket_ids, fandb_items } = req.body;
    const accountId = req.user.id;
    console.log(accountId);
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        return res.status(400).json({ status: false, message: "Invalid Account ID" });
      }
        // Tìm user thông qua accountId
        const account = await Account.findById(accountId).populate("member");
       
        if (!account || !account._id) {
           
          return res.status(404).json({ status: false, message: "User not found" });
        }
    
        const userId = account._id;
    
    if (!ticket_ids) {
        return res.status(400).json({ message: "Tickets are required." });
    }

    try {
        // Kiểm tra danh sách vé
        const tickets = await TicketModel.find({ _id: { $in: ticket_ids } });
        if (tickets.length !== ticket_ids.length) {
            return res.status(404).json({ message: "Invalid ticket IDs provided." });
        }

        // Kiểm tra danh sách đồ ăn/thức uống
        let fandbTotal = 0;
        const validatedFandbItems = [];
        if (fandb_items && fandb_items.length > 0) {
            for (const item of fandb_items) {
                const fandb = await FandBModel.findById(item.id);
                if (!fandb) {
                    return res.status(404).json({ message: `Invalid FandB ID: ${item.id}` });
                }
                fandbTotal += fandb.price * item.quantity;
                validatedFandbItems.push({ id: fandb._id, quantity: item.quantity });
            }
        }

        // Tính tổng tiền
        const ticketTotal = tickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0);
        const total = ticketTotal + fandbTotal;

        // Tạo đơn đặt vé
        const booking = new BookingModel({
            user_id:userId,
            ticket_id: ticket_ids,
            FandB_id: validatedFandbItems,
            total,
            status: false
        });
        const newBooking = await booking.save();

        return res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};