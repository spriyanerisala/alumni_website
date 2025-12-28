import Alumni from "../models/Alumni.js";

// Create new alumni
export const createAlumni = async (req, res) => {
  try {
    const alumniData = { ...req.body, gender: req.body.gender.toLowerCase().trim() };
    const newAlumni = new Alumni(alumniData);
    const saved = await newAlumni.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("Error in createAlumni:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};





export const myProfile = async (req, res) => {
  try {
    // Assuming Alumni.email is rollNo
    console.log("Roll No from token",req.user.rollNo)
    const alumni = await Alumni.findOne({ rollNo: req.user.rollNo });

    if (!alumni) {
      return res.status(404).json({ success: false, message: "Alumni profile not found" });
    }

    res.status(200).json({ success: true, data: alumni });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const updated = await Alumni.findOneAndUpdate(
      { rollNo: req.user.rollNo },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Alumni not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated", data: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const deleted = await Alumni.findOneAndDelete({ rollNo: req.user.rollNo });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Alumni not found" });
    }

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Failed to delete profile" });
  }
};
