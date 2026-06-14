import express from "express";

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "API Running!"})
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

