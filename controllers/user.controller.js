import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const userRegistration = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Username and password are required")
      res.redirect("/registration")
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log("User already exists")
      res.redirect("/registration")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User registered successfully")
    res.redirect("/login")

  } catch (error) {
    console.error("Registration failed:", error);
    res.redirect("/error")
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Username and password are required");
      return res.redirect("/login")
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      console.log("Invalid credentials")
      return res.redirect("/login")
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      console.log("Invalid credentials")
      return res.redirect("/login")
    }

    req.session.userId = existingUser._id;

    console.log("Login successful");
    return res.redirect("/home")

  } catch (error) {
    console.error("Login failed:", error);
    return res.redirect("/error")

  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy failed:", err);
        res.redirect("/error")
      }
      console.log("Logout successful")
      res.redirect("/login")
    });
  } catch (error) {
    console.error("Logout failed:", error);
    res.redirect("/error")
  }
};

const loginEJS = (req,res)=>{
  try {
    if(req.session.userId){
      res.redirect("/home");
    }else{
        res.render("login");
    }
  } catch (error) {
    console.error("Failed to render login page",error);
    res.redirect("/error")
  }
};

const registrationEJS = (req,res)=>{
  try {
    if(req.session.userId){
      res.redirect("/home");
    }else{
        res.render("registration");
    }
  } catch (error) {
    console.error("Failed to render registartion page",error);
  }
};

export { userRegistration, userLogin, userLogout, loginEJS, registrationEJS };
