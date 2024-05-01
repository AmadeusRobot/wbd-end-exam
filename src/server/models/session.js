import { model, Schema } from "mongoose";

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    token: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Session = model("session", sessionSchema)
export default Session