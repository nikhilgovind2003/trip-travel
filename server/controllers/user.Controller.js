
import {userModel} from "../models/Models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import  otpGenerator from "otp-generator";

const otpStore = [];


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and exclude the password field
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password, role } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      role
    });
    await newUser.save();

    // Generate token with minimal payload
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "An unexpected error occurred",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { data, phone } = req.body;
    if (!data || !phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number and data are required.",
      });
    }
    const { password, confirmPassword } = data;
    // Check if password and confirmPassword are provided
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required." });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const user = await userModel.findOneAndUpdate(
      { phone: phone }, // Query to find the user by phone
      {
        $set: { password: hashedPassword }, // Update the password field
      },
      {
        new: true, // Return the updated document
      }
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Send success response
    res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required." });
    }

    const api_key = process.env.SMS2FACTOR_API_KEY;
    const user = await userModel.findOne({ phone: phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const response = await axios.get(
      `https://2factor.in/API/V1/${api_key}/SMS/+91${phoneNumber}/AUTOGEN2/${otp}`
    );

    if (response.data.Status === "Success") {
      const { OTP } = response.data;

      // Store OTP in database
      await userModel.findOneAndUpdate(
        { phone: phoneNumber },
        {
          $set: {
            "otp.otp": OTP,
            "otp.sendTime": Date.now(),
            "otp.expiresAt": Date.now() + 5 * 60 * 1000, // 6-minute validity
          },
        },
        { new: true }
      );
    }

    return res.status(201).json({
      success: true,
      messsage: "OTP Send successfuly...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    // Ensure phone number exists in session
    if (!phone) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number not found in session. Please send the OTP again.",
      });
    }

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is required." });
    }

    // Find user by phone number
    const user = await userModel.findOne({ phone: phone });

    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    // Ensure OTP exists in the user's record
    if (!user.otp || !user.otp.otp) {
      return res
        .status(400)
        .json({ success: false, message: "No OTP sent to this number." });
    }

    const { otp: storedOtp, expiresAt } = user.otp;

    // Check if OTP has expired
    if (!expiresAt || Date.now() > expiresAt) {
      // OTP expired, remove it from the database
      await userModel.findOneAndUpdate(
        { phone: phone },
        {
          $unset: { otp: "" }, // Remove OTP from the document
        },
        { new: true }
      );
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired." });
    }

    // Verify the OTP
    if (parseInt(otp) === parseInt(storedOtp)) {
      // OTP is valid, remove OTP from the database
      await userModel.findOneAndUpdate(
        { phone: phone },
        {
          $unset: { otp: "" }, // Remove OTP after verification
        },
        { new: true }
      );
      return res.json({ success: true, message: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

