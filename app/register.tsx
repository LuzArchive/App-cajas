// app/register.tsx
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";

// URL de tu backend - cambia el IP por tu IP local si estás en dispositivo físico
const API_URL = "http://localhost:5000/api";

export default function Register() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Email
  const [email, setEmail] = useState("");

  // Step 2: Datos
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [fecha, setFecha] = useState("");
  const [suscripcion, setSuscripcion] = useState(false);
  const [terminos, setTerminos] = useState(false);

  const handleNextEmail = () => {
    if (!email.includes("@")) {
      Alert.alert("Error", "Ingresa un correo válido");
      return;
    }
    setStep(2);
  };

  const handleCreateAccount = async () => {
    if (!nombre || !apellido || password.length < 6 || !terminos) {
      Alert.alert("Error", "Completa los campos correctamente y acepta los términos");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          codigo,
          nombre,
          apellido,
          password,
          fecha,
          suscripcion,
          terminos
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        Alert.alert("Error", data.error || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <View style={styles.form}>
          <Text style={styles.title}>Correo electrónico</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleNextEmail}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.form}>
          <Text style={styles.title}>Completa tus datos</Text>
          <TextInput
            placeholder="Código enviado al correo"
            value={codigo}
            onChangeText={setCodigo}
            style={styles.input}
          />
          <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <TextInput
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Fecha de nacimiento (DD/MM/AAAA)"
            value={fecha}
            onChangeText={setFecha}
            style={styles.input}
          />
          <CheckBox
            title="Suscribirme a emails"
            checked={suscripcion}
            onPress={() => setSuscripcion(!suscripcion)}
          />
          <CheckBox
            title="Acepto los términos y condiciones"
            checked={terminos}
            onPress={() => setTerminos(!terminos)}
          />
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.form}>
          <Text style={styles.title}>¡Cuenta creada con éxito!</Text>
          <Text style={styles.subtitle}>Bienvenido(a), {nombre}</Text>
          <Text style={styles.subtitle}>Tus datos se han guardado en la base de datos</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  form: { width: "100%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 18, textAlign: "center", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#000", borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonDisabled: { backgroundColor: "#666" },
  buttonText: { color: "#fff", fontWeight: "bold" }
});