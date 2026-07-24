import jwt from 'jsonwebtoken'
import type {Response} from 'express'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

export interface TokenPayload {
    userId: string
}

export const signAccessToken = (userId: string) =>
    jwt.sign({ userId }, ACCESS_SECRET, {expiresIn: '15m'})

export const signRefreshToken = (userId: string) =>
    jwt.sign({ userId }, REFRESH_SECRET, {expiresIn: '7d'})

export const verifyAccessToken = (token: string): TokenPayload =>
    jwt.verify(token, ACCESS_SECRET) as TokenPayload

export const verifyRefreshToken = (token: string): TokenPayload =>
    jwt.verify(token, REFRESH_SECRET) as TokenPayload

export const setRefreshCookie = (res: Response, token: string) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    })
}

export const clearRefreshCookie = (res: Response) => {
    res.clearCookie('refreshToken', { path: '/' })
}