import {addTheater, getAllTheater} from '../controllers/theater-controller.js'
import express from 'express'

const TheaterRouter = express.Router();
    TheaterRouter.get('/all',getAllTheater)
    TheaterRouter.post('/add',addTheater)
export default TheaterRouter;