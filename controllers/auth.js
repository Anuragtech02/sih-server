import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

export const userLogin = async function (req, res, next) {
  const { contact } = req.body;
  console.log(req.body);

  try {
    const user = await UserModel.findOne({ contact });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign(
      {
        contact,
        id: user._id,
        userType: user.userType,
      },
      process.env.AUTH_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: "ok",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: "server error",
    });
  }
};
