import 'dotenv/config'
import app from './app'
import { prisma } from './lib/prisma'

const PORT = process.env.PORT || 4000;


app.get("/", (req, res) => {
    res.json({message: "API Running!"})
})

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})


const shutdown = async () => {
    console.log('Shutting down...')
    await prisma.$disconnect()
    server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

