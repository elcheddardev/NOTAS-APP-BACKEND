import express from "express"
import Note from "../models/noteModel.js"
const router = express.Router()

// obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find(); // ← con N mayúscula (casi siempre)
        return res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener las notas:", error);
        
        // En producción: no exponer el error real
        return res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

// obtener una nota por id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if(!note) return res.status(404).json({error: "Nota no encontrada"})
          res.status(200).json(note)    
        } catch (error) {
     console.error("error al obtener una nota por id", error)
            res.status(500).json({ error: "internal server error"})                    }
 })
// crear una nueva nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body
        const note = new Note({ title, description})
        
        const savedNote = await note.save()

        if(savedNote) 
        res.status(201).json({ message: "Note creada correctamente", note: savedNote })
    } catch (error) {
        console.error("Error al crear la nota", error)
        res.status(500).json({ Error: "Internal server error" })
    }
})

// eliminar una nota
router.delete("/:id", async (req, res) => {
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
// Editar una nota
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        // CAMBIO: Note con N mayúscula
        const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
        
        if(!updatedNote) return res.status(404).json({ error: "Nota no encontrada" });
        res.status(200).json({ message: "Nota actualizada", note: updatedNote });     
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}); // Borré una llave de más que tenía al final
export default router 