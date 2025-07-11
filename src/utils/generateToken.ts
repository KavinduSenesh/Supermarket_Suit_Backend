import jwt from 'jsonwebtoken';

export const generateAccessToken = (customerId: string) => {
    // @ts-ignore
    return jwt.sign({ customerId }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
    });
};

export const generateRefreshToken = (customerId: string) => {
    // @ts-ignore
    return jwt.sign({ customerId }, process.env.REFRESH_TOKEN as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    });
}
