import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

const API_URL = "http://192.168.0.141:50000/api";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // Para saber si ya se envió

  // Datos del usuario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Ojo
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [suscripcion, setSuscripcion] = useState(false);
  const [terminos, setTerminos] = useState(false);

  // Paso 1: enviar correo
  const handleSendEmail = async () => {
    if (!email.includes("@")) {
      Alert.alert("Error", "Ingresa un correo válido");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Código enviado a tu correo");
        setStep(2);
        setIsCodeSent(true);
      } else {
        if (data.error === "El usuario ya existe") {
          Alert.alert("CORREO YA REGISTRADO");
        } else {
          Alert.alert("Error", data.error || "Error enviando código");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: verificar código
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      Alert.alert("Error", "Ingresa el código recibido");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: verificationCode })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Código verificado");
        setStep(3);
      } else {
        Alert.alert("Error", data.error || "Código incorrecto");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Paso 3: crear usuario
  const handleCreateAccount = async () => {
    if (!nombre || !apellido || password.length < 6 || !terminos) {
      Alert.alert("Error", "Completa los campos correctamente y acepta los términos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre,
          apellido,
          password,
          fecha: fecha.toLocaleDateString(),
          suscripcion,
          terminos
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setStep(4);
      } else {
        Alert.alert("Error", data.error || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setFecha(selectedDate);
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
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Enviar código</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.form}>
          <Text style={styles.title}>Código de verificación</Text>
          <TextInput
            placeholder="Ingresa el código recibido"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verificar código</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.form}>
          <Text style={styles.title}>Completa tus datos</Text>
          <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
          <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1 }]}
              secureTextEntry={!showPassword}
            />
            <Icon
              name={showPassword ? "eye" : "eye-off"}
              type="ionicon"
              onPress={() => setShowPassword(!showPassword)}
              containerStyle={{ marginLeft: 10 }}
            />
          </View>

          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text>{fecha.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          <CheckBox title="Suscribirme a emails" checked={suscripcion} onPress={() => setSuscripcion(!suscripcion)} />
          <CheckBox title="Acepto los términos y condiciones" checked={terminos} onPress={() => setTerminos(!terminos)} />
          <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleCreateAccount} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Creando cuenta..." : "Crear cuenta"}</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
        <View style={styles.form}>
          <Text style={styles.title}>¡Cuenta creada con éxito!</Text>
          <Text style={styles.subtitle}>Bienvenido(a), {nombre}</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/inicio")}>
            <Text style={styles.buttonText}>Ir al Inicio</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  form: { width: "100%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#000", borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#000", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonDisabled: { backgroundColor: "#666" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  passwordContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 }
});
