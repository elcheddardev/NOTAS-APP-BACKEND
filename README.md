# Todo App - Backend


API REST para app de notas con autenticación JWT.


## 🛠️ Tech Stack


- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- BCrypt


## ✨ Features


- Registro e inicio de sesión con JWT
- Middleware de autenticación protegiendo rutas
- CRUD completo de notas
- Cada nota vinculada a su usuario


## 🔗 Links


- [Demo en vivo](https://celadon-torte-02d9bc.netlify.app/login)
- [Repositorio Frontend](https://github.com/elcheddardev/NOTAS-APP-FRONTEND)


## ⚙️ Correr localmente


1. Clonar el repositorio
2. Instalar dependencias
\```
npm install
\```
3. Crear archivo `.env` con:
\```
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto
\```
4. Correr el proyecto
\```
npm run dev
\```


## �endpoints


| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Login y obtención de token |
| GET | /api/notes | Obtener notas del usuario |
| POST | /api/notes | Crear nota |
| PUT | /api/notes/:id | Editar nota |
| DELETE | /api/notes/:id | Eliminar nota |