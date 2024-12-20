import {addTheater, deleteTheater, getAllTheater,updateTheater} from '../controllers/theater-controller.js'
import { getRoomsByTheaterId } from '../controllers/room-controller.js';
import express from 'express'

const TheaterRouter = express.Router();
    TheaterRouter.get('/all',getAllTheater)
    TheaterRouter.post('/add',addTheater)
    TheaterRouter.put('/:id',updateTheater)
    TheaterRouter.delete('/:id',deleteTheater)
    TheaterRouter.get('/:theaterId',getRoomsByTheaterId)
export default TheaterRouter;