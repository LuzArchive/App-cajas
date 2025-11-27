const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 50000;

const paypal = require('@paypal/checkout-server-sdk');

// Configuración PayPal (sandbox)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

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
  verificationCode: String,
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

// Transporter para enviar correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- RUTAS EXISTENTES ---
// Health
app.get('/api/health', (req, res) => res.json({ message: '✅ Servidor funcionando correctamente' }));

// Enviar código de verificación
app.post("/api/send-code", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Correo requerido" });

  const codigo = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await User.updateOne(
      { email },
      { verificationCode: codigo },
      { upsert: true }
    );
//hola
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${codigo}`
    });

    res.json({ message: "Código enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enviando el correo" });
  }
});

// Verificar código
app.post("/api/verify-code", async (req, res) => {
  const { email, codigo } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verificationCode !== codigo)
    return res.status(400).json({ error: "Código incorrecto" });

  res.json({ message: "Código verificado" });
});

// Crear usuario definitivo
app.post('/api/register', async (req, res) => {
  try {
    const { email, codigo, nombre, apellido, password, fecha, suscripcion, terminos } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== codigo)
      return res.status(400).json({ error: 'Código incorrecto o usuario no existe' });

    user.nombre = nombre;
    user.apellido = apellido;
    user.password = password;
    user.fecha = fecha;
    user.suscripcion = suscripcion || false;
    user.terminos = terminos;
    user.verificationCode = undefined;
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Correo y contraseña son requeridos" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    if (user.password !== password) return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json({ message: "Login exitoso", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// --- NUEVOS ENDPOINTS PAYPAL ---

// Crear orden
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: amount } }]
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Capturar orden
app.post('/capture-order/:orderId', async (req, res) => {
  const request = new paypal.orders.OrdersCaptureRequest(req.params.orderId);
  request.requestBody({});
  try {
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://192.168.0.141:${PORT}`);
});
