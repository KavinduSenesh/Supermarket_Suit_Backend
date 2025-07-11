import Customer from "../models/Customer";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken";
import { error } from "console";
import jwt, {Secret} from "jsonwebtoken";

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

export const refreshToken = async (req: any, res: any) => {
   const { refreshToken } = req.body;

   if (!refreshToken) {
       return res.status(401).json({ message: "No refresh token provided" });
   }

   try {
       const payload = jwt.verify(
           refreshToken, process.env.REFRESH_TOKEN as Secret
       ) as { customerId: string };

       const user = await Customer.findOne({ _id: payload.customerId })
           .select("email name")
           .lean();
       const newAccessToken = generateAccessToken(payload.customerId);

       res.json({
           user: user,
           accessToken: newAccessToken
       });
   }catch (e){
       res.status(401).json({ message: "Invalid or expired refresh token" })
   }

}

