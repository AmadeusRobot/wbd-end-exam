import express from "express";
import Appointment from "../models/appoinment.js";
import { downloadFile } from "../../utils/download.js";
import Multer from "multer";

const router = express.Router();

const multer = Multer({
    fileFilter: (_, file, cb) => {
        if (file.originalname.split(".").pop() !== "pdf") {
            return cb(new Error("The input file is not a pdf document"));
        }
        return cb(null, true);
    },
});

// Create a new appointment
router.post("/", multer.single("record"), async (req, res) => {
    const user = req.body.patient;
    let url = "";
    try {
        const appointment = new Appointment(req.body);
        const file = req.file;
        if (!file) {
            return res.status(422).send("Error not file found");
        }
        const originalName = file?.originalname.split(".");
        const mimeType = originalName.pop();
        const fileName = (user + "--" + originalName.join(".")).replace(
            /\//g,
            "--"
        );
        url = await downloadFile(`${fileName}.${mimeType}`, user, file?.buffer);
        appointment.set("record", url);
        await appointment.save();
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
