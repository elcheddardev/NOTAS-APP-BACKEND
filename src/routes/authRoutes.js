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

router.post("/login", async (req, res) => {
    try { 
        const { email, password } = req.body 
        const user = await User.findOne({ email: email })
        if(!user) return res.status(400).json({ error: "Usuario no encontrado"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ error: "contraseña incorrecta"})
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ token: token })    
    } catch (error) {
        console.error("Error al hacer login", error)  // ← adentro del catch
    res.status(500).json({ error: "internal server error" })
    }
})

export default router