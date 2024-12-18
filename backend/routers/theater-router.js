import {addTheater, deleteTheater, getAllTheater,updateTheater} from '../controllers/theater-controller.js'
import express from 'express'

const TheaterRouter = express.Router();
    TheaterRouter.get('/all',getAllTheater)
    TheaterRouter.post('/add',addTheater)
    TheaterRouter.put('/:id',updateTheater)
    TheaterRouter.delete('/:id',deleteTheater)
export default TheaterRouter;