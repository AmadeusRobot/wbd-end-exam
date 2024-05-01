import express from "express";
import User from "../models/user.js";
import { UserRoles } from "../../utils/roles.js";

const router = express.Router();

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
router.post("/", createUser);

export const loginUser = async (req, res) => {
    if (!req.body.password || !req.body.email) {
        return res.status(404).json({ error: "Bad Request" })
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
router.post("/login", loginUser);

// Read (get) all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("admin");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
router.get("/", getAllUsers);

export const doctors = async (req, res) => {
    try {
        const users = await User.find({ role: UserRoles.doctor }).populate("admin");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
router.get("/doctors", doctors);

// Read (get) a single user by ID
export const findUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("admin");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
router.get("/:id", findUserByID);

// Update a user
export const updateUser =  async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
router.put("/:id", updateUser);

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
router.delete("/:id", deleteUser);

export default router;
