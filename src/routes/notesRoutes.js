import express from "express"
import Note from "../models/noteModel.js"
import authMiddleware from "../middleware/authMiddleware.js" // el guardia de seguridad, porque sin él cualquiera entra
const router = express.Router()

// obtener todas las notas (para el que tenga token, no para cualquier merodeador)
router.get("/", authMiddleware, async (req, res) => {
try {
const notes = await Note.find({ user: req.user.id }); // N mayúscula, no es tan difícil
return res.status(200).json(notes);
} catch (error) {
console.error("Error al obtener las notas:", error);
return res.status(500).json({ error: "Error interno del servidor" });
}
});

// obtener una nota por id (si no la encontrás, no es mi problema)
router.get("/:id", authMiddleware, async (req, res) => {
try {
const id = req.params.id
const note = await Note.findById(id)
if(!note) return res.status(404).json({error: "Nota no encontrada"})
res.status(200).json(note)    
} catch (error) {
console.error("error al obtener una nota por id", error)
res.status(500).json({ error: "internal server error"})
}
})

// crear una nueva nota (por fin algo constructivo)
router.post("/", authMiddleware, async (req, res) => {
try {
const { title, description } = req.body
const note = new Note({ title, description, user: req.user.id })
const savedNote = await note.save()
if(savedNote) 
res.status(201).json({ message: "Note creada correctamente", note: savedNote })
} catch (error) {
console.error("Error al crear la nota", error)
res.status(500).json({ Error: "Internal server error" })
}
})

// eliminar una nota (lo más fácil, como en el ring)
router.delete("/:id", authMiddleware, async (req, res) => {
try {
const id = req.params.id;
const deletedNote = await Note.findByIdAndDelete(id)
if(!deletedNote) return res.status(404).json({ error: "Note no eliminada"})
res.status(200).json({ message: "Nota eliminada correctamente" })    
} catch (error) {
console.log("Error al eliminar una nota", error)
res.status(500).json({error: "internal server error" })
}
})

// editar una nota (porque nadie escribe bien a la primera, ni en código ni en la vida)
router.put("/:id", authMiddleware, async (req, res) => {
try {
const id = req.params.id;
const { title, description } = req.body;
const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
if(!updatedNote) return res.status(404).json({ error: "Nota no encontrada" });
res.status(200).json({ message: "Nota actualizada", note: updatedNote });     
} catch (error) {
console.error("Error al actualizar:", error);
res.status(500).json({ error: "Internal server error" });
}
});

export default router