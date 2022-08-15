import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import AdminModel from "../models/Admin.model.js";

export const userLogin = async function (req, res) {
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

export const adminLogin = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email,
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
