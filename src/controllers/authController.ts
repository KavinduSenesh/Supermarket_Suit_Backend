import Customer from "../models/Customer";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken";
import { error } from "console";

export const signUpCustomer = async (req: any, res: any) => {
    const { name, email, passwordHash, phone, address, cartList, loyaltyPoints, isBanned } = req.body;

    try{
        const customerExists = await Customer.findOne({ email });

        if (customerExists) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        const customer = await Customer.create({
            name,
            email,
            passwordHash,
            phone,
            address,
            cartList,
            loyaltyPoints,
            isBanned
        });

        if (customer) {
            const accessToken = generateAccessToken(customer._id as string)

            await customer.save();

            res.status(201).json({
               _id: customer._id,
                name: customer.name,
                email: customer.email,
                accessToken,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (e){
        error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const signInCustomer = async (req: any, res: any) => {
    const { email, passwordHash } = req.body;

    try {
        const customer = await Customer.findOne({ email });

        if (!customer || !(await customer.comparePassword(passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const accessToken = generateAccessToken(customer._id as string);
        const refreshToken = generateRefreshToken(customer._id as string);

        res.status(201).json({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            accessToken,
            refreshToken
        });
    }catch (e){
        error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}

