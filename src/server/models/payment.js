import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    fee: {
        type: Number,
        required: "This field is required",
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});

const Payment = model("Payment", paymentSchema);

export default Payment;
