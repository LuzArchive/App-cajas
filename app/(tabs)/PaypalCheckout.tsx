import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState } from "react";

const subscriptions = [
  { name: "Básica", price: "5.00" },
  { name: "Estándar", price: "10.00" },
  { name: "Premium", price: "20.00" },
];

const PAYPAL_CLIENT_ID = "AZo6u5lr-1qM5hgGU2lbXrS7GBb2lBKS5IWqIYWOwj3RA-Yo3Ffp1WvXkWetyRxd9w04ezr8ee3nICpG"; // <- Pega tu Client ID aquí

const PaypalCheckout: React.FC = () => {
  const [selected, setSelected] = useState(subscriptions[0]);

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Selecciona tu suscripción</h2>

      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        {subscriptions.map((sub) => (
          <div
            key={sub.name}
            onClick={() => setSelected(sub)}
            style={{
              flex: 1,
              margin: "0 5px",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              border: selected.name === sub.name ? "3px solid #0070f3" : "1px solid gray",
              backgroundColor: selected.name === sub.name ? "#e0f0ff" : "#fff",
              boxShadow: selected.name === sub.name ? "0 0 10px rgba(0,0,0,0.2)" : "none",
            }}
          >
            <h3>{sub.name}</h3>
            <p>${sub.price} USD</p>
          </div>
        ))}
      </div>

      <PayPalScriptProvider
        options={{
          clientId: PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
          createOrder={async () => {
            const res = await fetch("http://192.168.0.141:50000/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: selected.price }),
            });
            const data = await res.json();
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch(`http://192.168.0.141:50000/capture-order/${data.orderID}`, {
              method: "POST",
            });
            const capture = await res.json();
            alert(`¡Pago de ${selected.name} completado!`);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalCheckout;
