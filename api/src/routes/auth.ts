import {Router} from 'express'
import bcrypt from 'bcrypt'
import {z} from 'zod'
import {prisma} from "../lib/prisma";
import {
    signAccessToken,
    signRefreshToken,
    setRefreshCookie,
    clearRefreshCookie,
    verifyRefreshToken,
} from "../lib/tokens";

const router = Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1),
})


router.post('/signup', async (req, res) => {
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({message: parsed.error.issues[0].message})
    }
    const { email, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return res.status(409).json({message: "Email already in use"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {name, email, passwordHash},
        select: {id: true, name: true, email: true, avatarUrl: true},
    })

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    setRefreshCookie(res, refreshToken)
    res.status(201).json({accessToken, user})
})

export default router