const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  codigo: String,
  nombre: String,
  apellido: String,
  password: String,
  fecha: String,
  suscripcion: Boolean,
  terminos: { type: Boolean, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Rutas
app.post('/api/register', async (req, res) => {
  try {
    const { email, codigo, nombre, apellido, password, fecha, suscripcion, terminos } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const newUser = new User({
      email,
      codigo,
      nombre,
      apellido,
      password, // ⚠️ En producción, deberías encriptar esto
      fecha,
      suscripcion: suscripcion || false,
      terminos
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para verificar si el servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});