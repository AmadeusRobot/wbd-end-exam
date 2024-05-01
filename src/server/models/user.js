import { model, Schema } from "mongoose";
import { UserRoles } from "../../utils/roles.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: "This field is required",
    },
    dob: {
        type: Date,
        required: "This field is required",
    },
    email: {
        type: String,
        required: "This field is required",
    },
    phone: {
        type: String,
        required: "This field is required",
    },
    password: {
        type: String,
        required: "This field is required",
    },
    profilePhoto: String,
    role: {
        type: String,
        enum: Object.keys(UserRoles),
        default: "Patient",
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin",
    },
    hospital: {
        type: String,
    },
    fee: String
});

const User = model("User", userSchema);

export default User;
