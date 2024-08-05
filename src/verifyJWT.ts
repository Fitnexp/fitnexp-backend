import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function verifyJWT(
    req: Request & { email?: string },
    res: Response,
    next: NextFunction,
) {
    const cookies = req.cookies;
    if (!cookies?.accessToken) {
        return res.status(400).send({ message: 'Unauthorized' });
    }

    jwt.verify(
        cookies.accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: Error | null, decoded: unknown) => {
            if (err) {
                return res.status(400).send({ message: 'Unauthorized' });
            }
            req.email = (decoded as { email: string }).email;
            next();
        },
    );
}

export default verifyJWT;
