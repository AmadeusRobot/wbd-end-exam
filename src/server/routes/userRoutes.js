import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    if (!req.body.password || !req.body.email) {
        return res.status(404).json({ error: "Bad Request" })
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (get) all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate("admin");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (get) a single user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("admin");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a user
router.put("/:id", async (req, res) => {
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
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
