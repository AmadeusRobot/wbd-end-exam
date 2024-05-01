import express from "express";
import Appointment from "./appointmentModel";

const router = express.Router();

// Create a new appointment
router.post("/", async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (get) all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("doctor", "name")
            .populate("nurse", "name")
            .populate("patient", "name")
            .populate("createdBy", "name");
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (get) a single appointment by ID
router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate("doctor", "name")
            .populate("nurse", "name")
            .populate("patient", "name")
            .populate("createdBy", "name");
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an appointment
router.put("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
