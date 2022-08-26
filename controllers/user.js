import express from "express";
import UserModel from "../models/User.model.js";
import { v4 as uuid } from "uuid";

const router = express.Router();

const AUTH_KEY = process.env.AUTH_KEY;

export const getSingleData = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await UserModel.findById(id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const getUsers = await UserModel.find();
    let users = getUsers
      .map((user) => user.toObject())
      .map((modUser) => {
        let newUser = modUser;
        newUser.id = modUser._id;
        delete newUser._id;
        return newUser;
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { contact } = req.body;
  try {
    const newUser = await UserModel.findOne({ contact });

    if (newUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let finalData = req.body;
    finalData.contact = parseInt(finalData.contact);

    console.log(finalData, "fd");
    const result = await UserModel.create({
      ...finalData,
      _id: `PIB_${uuid().replace(/-/g, "_")}`,
      userType: "registered",
    });

    const token = jwt.sign(
      {
        contact,
        id: result._id,
        userType: result.userType,
      },
      process.env.AUTH_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, message: "User created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    await UserModel.findByIdAndRemove(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.body;

    await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updateUser);
  } catch (error) {
    res.status(404).status({ message: error.message });
  }
};

export const updateUserReward = async (req, res) => {
  try {
    const { id, points } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.findByIdAndUpdate(
      id,
      { $inc: { rewardPoints: points } },
      { new: true }
    );
    res.status(200).json({ message: "Reward Added!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await UserModel.find(
      {}, { rewardPoints: 1, _id : 1, name:1, contact:1 }
    ).sort({ rewardPoints: -1 });
      return res.status(200).json(users);
  } catch (error){
    res.status(404).json({ message: error.message });
  }
}


export default router;
