import { model, Schema } from "mongoose";
const adminSchema = new Schema({
    role: {
        type: String,
        required: "This field is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Admin = model("Admin", adminSchema);

export default Admin;
