import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
export const verifyfreelancer = async (req, res, next) => {
  try {
    let token = req.cookies.jwt

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ status: false, message: "jwt token expired" });
        } else {
          const userfind = await usermodel.findById(decodedtoken.id);
          // console.log(userfind);
          const role = userfind.role;
          if (role !== "freelancer")
            return res
              .status(401)
              .json({ status: false, message: "permission denied" });
          req.user = decodedtoken.id;
          next();
        }
      });
    } else {
      res.status(401).json({ status: false, message: "jwt token missing" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
