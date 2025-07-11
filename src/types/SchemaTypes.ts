import mongoose, {Document, Schema} from "mongoose";

export interface ICustomer extends Document{
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    address: string;
    cartList: mongoose.Types.ObjectId[];
    loyaltyPoints: number;
    isBanned: boolean;
    createdAt: Date;
    UpdatedAt: Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface IBranch extends Document{
    name: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IEmployee extends Document{
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    jobTitle: string;
    role: string;
    branchId: IBranch['_id'];
    active: boolean;
    joinedDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
