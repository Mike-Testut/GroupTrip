import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.set('trust proxy', 1)

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => {
    res.json({ ok: true })
})

export default app