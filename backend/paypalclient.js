require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Credenciales desde .env
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// Crear orden con monto dinámico
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

// Iniciar servidor en IP específica
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://192.168.0.141:${PORT}`);
});
