import jwt from 'jsonwebtoken'
import Alumni from '../models/Alumni.js';
import User from '../models/User.js'
export const adminLogin = async (req,res)=>{
    const {email,password} = req.body;
    
    try{

        
      if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
        const adminToken =jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
        
        return res.status(200).json({success:true,message:"Admin Login Successfully",adminToken})
      }else{
        return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
      }
    catch(err){
        console.log(err)
    }

}


export const getAllAlumniStudents = async (req, res) => {
  try {
    // Sort by createdAt descending to get recent users first
    const list = await Alumni.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    console.error("Error in getAllAlumni:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export  const getAllUsers = async (req,res)=>{
     try{
        const users = await User.find().sort({createdAt:-1}).select("-password")
        res.status(200).json({success:true,message:"Fetched Users Successfully",data:users})
     }catch(err){
        res.status(500).json({ success: false, message: "Server Error" });
     }
}