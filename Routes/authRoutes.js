import express from "express";
import {
  emaillogin,
  emailLoginVerify,
  userSignup,
} from "../Controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/emaillogin", emaillogin);
authRoutes.post("/emailverify", emailLoginVerify);
authRoutes.post("/usersignup", userSignup);

export default authRoutes;
