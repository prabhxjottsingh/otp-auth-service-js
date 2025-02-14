import express from "express";
import {
  emaillogin,
  emailLoginVerify,
} from "../Controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/emaillogin", emaillogin);
authRoutes.post("/emailverify", emailLoginVerify);

export default authRoutes;
