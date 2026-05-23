import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    if(existingUser) return res.status(400).json({ error: "El email ya está registrado" })
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    const savedUser = await newUser.save()
    if(savedUser) return res.status(201).json({ message: "Usuario creado correctamente" })     
    } catch (error) {
        console.error("Error al registrar usuario", error)
        res.status(500).json({ error: "internal server error"})
    }
})
export default router