import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo:{type:String,required:true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male","female","other"], required: true },
  profileImage: { type: String },
  passedOutYear: { type: Number, required: true },
  branch: { type: String, required: true },
  currentJobRole: { type: String },
  company: { type: String },
  jobLocation: { type: String },
  linkedin: { type: String },
  github: { type: String },
}, {
  timestamps: true,
});

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni;
