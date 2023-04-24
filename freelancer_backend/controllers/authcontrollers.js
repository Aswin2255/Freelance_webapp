import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxage,
  });
};
export const register = async (req, res) => {
  try {
    let { role, username, email, phonenumber, pass, cpass } =
      req.body.data.values;
    phonenumber = parseInt(phonenumber);
    const salt = await bcrypt.genSalt();
    const passhash = await bcrypt.hash(pass, salt);
    const newuser = new usermodel({
      username,
      email,
      phonenumber,
      role,
      pass: passhash,
    });
    const saveduser = await newuser.save();
    const token = createToken(saveduser._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxage: maxage * 1000,
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      status: true,
      message: "user created succesfully",
      userfind:[saveduser],token
    });
  } catch (error) {
    let err;
    if (error.code === 11000) {
      err = { status: false, message: "user already existed" };
    } else {
      err = { status: false, message: error.message };
    }
    res.status(406).json(err);
  }
};
export const login = async (req, res) => {
  try {
    const { email, pass } = req.body.data.values;
    const userfind = await usermodel.find({ email: email });
    if (!userfind.length) {
      res
        .status(404)
        .json({ status: false, message: "username or password is wrong" });
    } else {
      const ismatch = await bcrypt.compare(pass, userfind[0].pass);
      if (ismatch) {
        userfind[0].pass = undefined;
        const token = createToken(userfind[0]._id);
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: true,
          maxage: maxage * 1000,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ status: true, userfind,token });
      } else {
        res
          .status(404)
          .json({ status: false, message: "username or password is wrong" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
