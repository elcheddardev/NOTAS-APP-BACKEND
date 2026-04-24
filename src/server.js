import express from "express"
import notesRouter from "./routes/notesRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use("/api/notes", notesRouter)

const PORT = process.env.PORT || 3001


connectDB()
.then(() => {
   console.log(process.env.PORT)
app.listen(PORT, () => {
    console.log(`servidor levantado en puerto http://localhost:${PORT}`)
    
    })    
    
})