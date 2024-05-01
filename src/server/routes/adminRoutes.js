import express from "express";
import Admin from "./adminModel";

const router = express.Router();

// Create a new admin
router.post("/", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (get) all admins
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find().populate("createdBy");
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (get) a single admin by ID
router.get("/:id", async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).populate("createdBy");
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an admin
router.put("/:id", async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
