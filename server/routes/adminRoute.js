import express from 'express'
import { adminLogin,getAllAlumniStudents,getAllUsers } from '../controllers/adminController.js'


const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.get('/students',getAllAlumniStudents)
adminRouter.get('/all-users',getAllUsers)

export default adminRouter