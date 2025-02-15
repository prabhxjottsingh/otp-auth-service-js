import {
  createAccToken,
  generateOtp,
  sendOtpMail,
} from "../Helpers/authUtils.js";
import { clientConnection } from "../Helpers/dbConnection.js";

export const emaillogin = async (req, res) => {
  try {
    const result = await clientConnection("Users").findOne({
      email: req.body.email,
    });

    if (result > 0) {
      const otpValue = generateOtp(4);
      console.log("This is the OTP sent to the user in email: ", otpValue);

      sendOtpMail(req?.body, otpValue, async (err, response) => {
        if (err) {
          res.status(200).send([{ message: err.message }]);
        } else {
          let result = await clientConnection("Users").findOne({
            email: req.body.email,
          });
          await clientConnection("Users").updateOne(
            { email: req.body.email },
            { $set: { otp: otpValue } }
          );
          res.status(200).json({ success: true, response });
        }
      });
    } else {
      console.log("Login not allowed, as user is not found in the DB.");

      res.status(200).send({
        success: false,
        msg: "User not listed!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

export const emailLoginVerify = async (req, res) => {
  try {
    const result = await clientConnection("Users").findOne({
      email: req.body.email,
    });

    if (result.otp == req.body.otp) {
      const accessToken = createAccToken({ id: result._id });

      res.status(200).send({
        success: true,
        msg: "otp verified",
        accessToken,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "otp not verified",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

export const userSignup = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(404).send({
        success: false,
        msg: "Email is required",
      });
    }
    const result = await clientConnection("Users").findOne({ email });
    if (result) {
      res.status(301).send({
        success: false,
        msg: "User already exists",
      });
    }
    await clientConnection("Users").insertOne({
      email: req.body.email,
      otp: null,
    });
    res.status(200).send({
      success: true,
      msg: "User successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
