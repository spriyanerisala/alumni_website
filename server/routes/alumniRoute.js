import express from "express";
import {  createAlumni,myProfile ,updateProfile,deleteProfile} from "../controllers/alumniController.js";
import { verifyUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", createAlumni);
router.get('/my-profile',verifyUser,myProfile)
router.put('/update-profile',verifyUser,updateProfile)
router.delete('/delete-profile',verifyUser,deleteProfile)



export default router;
