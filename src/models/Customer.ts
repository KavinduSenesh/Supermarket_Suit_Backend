import {ICustomer} from "../types/SchemaTypes";
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    cartList: [{ type: mongoose.Types.ObjectId }],
    loyaltyPoints: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
}, {timestamps: true
});

CustomerSchema.pre<ICustomer>("save", async function (next){
    if (!this.isModified("passwordHash")) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    next();
})

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
