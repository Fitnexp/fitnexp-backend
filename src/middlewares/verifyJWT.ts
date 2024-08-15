import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function verifyRefreshToken(
    cookies: Record<string, string>,
    req: Request & { username?: string },
    res: Response,
    next: NextFunction,
) {
    jwt.verify(
        cookies.refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: Error | null, decoded: unknown) => {
            if (err) {
                return res.status(400).send({ errors: 'Unauthorized' });
            }
            req.username = (decoded as { username: string }).username;
            next();
        },
    );
}

function verifyJWT(
    req: Request & { username?: string },
    res: Response,
    next: NextFunction,
) {
    const cookies: Record<string, string> = req.cookies;
    if (!cookies?.accessToken || !cookies?.refreshToken) {
        return res.status(400).send({ errors: 'Unauthorized' });
    }

    jwt.verify(
        cookies.accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: Error | null, decoded: unknown) => {
            if (err) {
                return verifyRefreshToken(cookies, req, res, next);
            }
            req.username = (decoded as { username: string }).username;
            next();
        },
    );
}

export default verifyJWT;
