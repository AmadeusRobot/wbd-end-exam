import express from "express";
import Payment from "../models/payment.js";

const router = express.Router();

// Create a new payment
router.post("/", async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (get) all payments
router.get("/", async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("patient", "name")
            .populate("doctor", "name");
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (get) a single payment by ID
router.get("/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate("patient", "name")
            .populate("doctor", "name");
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a payment
router.put("/:id", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a payment
router.delete("/:id", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
