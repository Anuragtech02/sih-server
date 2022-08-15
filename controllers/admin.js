import express from "express";
import AdminModel from "../models/Admin.model.js";
import { v4 as uuid } from "uuid";

export const getSingleAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const singleUser = await AdminModel.findById(id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const getUsers = await AdminModel.find();
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

export const createAdmin = async (req, res) => {
  const { contact } = req.body;
  try {
    const newUser = await AdminModel.findOne({ contact });

    if (newUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let finalData = req.body;
    finalData.contact = parseInt(finalData.contact);

    console.log(finalData, "fd");
    const result = await AdminModel.create({
      ...finalData,
      _id: `PIB_${uuid().replace(/-/g, "_")}`,
    });

    res.status(200).json({ result, message: "User created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await AdminModel.findByIdAndRemove(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await AdminModel.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updateUser);
  } catch (error) {
    res.status(404).status({ message: error.message });
  }
};
