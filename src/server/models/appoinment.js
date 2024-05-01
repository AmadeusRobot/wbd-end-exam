import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "Doctor field is required",
    },
    nurse: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "Patient field is required",
    },
    appointmentTime: {
        type: Date,
        required: "Appointment time is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    record: {
        type: String,
    },
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
