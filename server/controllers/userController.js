import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register =async (req,res)=>{
    const {name,rollNo,password} = req.body;
    try{
        const userExists =await User.findOne({rollNo})
        if(userExists){
            return res.status(400).json({success:false,message:"Roll number already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,rollNo,password:hashedPassword})
        await newUser.save()
        return res.status(200).json({success:true,message:"User Registered Successfully"})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}

export const login = async(req,res)=>{
    const {rollNo,password}  =req.body
    try{
        const user = await User.findOne({rollNo})
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(401).json({success:false,message:"Invalid Credentials"})
        }

        const token = jwt.sign({id:user._id,rollNo:user.rollNo},process.env.JWT_SECRET,{expiresIn:'1h'})
           
        res.status(200).json({success:true,message:"Login Successfully",user:{name:user.name,rollNo:user.rollNo},token})
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}



