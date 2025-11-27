import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Inicio() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  // Simulación de usuario logueado
  const [loggedIn, setLoggedIn] = useState(false); // Cambia según tu lógica real de login

  // Función para mostrar alerta si no está logueado
  const requireLogin = () => {
    if (!loggedIn) {
      Alert.alert("Acceso restringido", "Debes crear una cuenta para ver más información.");
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* MENÚ SUPERIOR */}
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Text style={styles.menuText}>☰ Menú</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Ionicons name="person-circle-outline" size={32} color="#000" />
          </TouchableOpacity>
        </View>

        {/* MENÚ DESPLEGABLE */}
        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                router.push('/conocenos');
                setMenuVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>Conócenos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                router.push('/listaCajas');
                setMenuVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>Suscripciones</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                router.push('/provedores');
                setMenuVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>Proveedores</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* HEADER / BANNER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FitDrop</Text>
          <Text style={styles.headerSubtitle}>
            Elige tu suscripción y recibe tu caja fitness cada mes
          </Text>
        </View>

        {/* Conócenos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conócenos</Text>
          <Text style={styles.sectionText}>
            FitDrop es una empresa tlaxcalteca creada por jóvenes del TECNM Campus Apizaco, apasionados por el fitness y la innovación. A través de nuestra app y cajas sorpresa fitness, ofrecemos una experiencia de suscripción que motiva e inspira a mantener una vida activa, uniendo deporte, tecnología y emprendimiento juvenil.
          </Text>
        </View>

        {/* Catálogo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catálogo</Text>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => requireLogin() && router.push('/detalleProducto1')} // Ruta de detalle
          >
            <Text style={styles.productTitle}>Producto 1</Text>
            <Text style={styles.productInfo}>Pequeña descripción del producto</Text>
            {/* Aquí agregas imagen */}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => requireLogin() && router.push('/detalleProducto2')}
          >
            <Text style={styles.productTitle}>Producto 2</Text>
            <Text style={styles.productInfo}>Pequeña descripción del producto</Text>
          </TouchableOpacity>
        </View>

        {/* Suscripciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suscripciones</Text>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => requireLogin() && router.push('/detalleSuscripcion1')}
          >
            <Text style={styles.productTitle}>Básica</Text>
            <Text style={styles.productInfo}>Incluye 1 caja fitness mensual con productos esenciales.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => requireLogin() && router.push('/detalleSuscripcion2')}
          >
            <Text style={styles.productTitle}>Premium</Text>
            <Text style={styles.productInfo}>Incluye 1 caja fitness mensual con productos exclusivos y sorpresas adicionales.</Text>
          </TouchableOpacity>
        </View>

        {/* Proveedores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proveedores</Text>

          <View style={styles.providerCard}>
            <Text style={styles.productTitle}>Nike</Text>
            <Text style={styles.productInfo}>Artículos deportivos reconocidos a nivel mundial.</Text>
          </View>

          <View style={styles.providerCard}>
            <Text style={styles.productTitle}>Under Armour</Text>
            <Text style={styles.productInfo}>Ropa y accesorios deportivos de alta calidad.</Text>
          </View>

          <View style={styles.providerCard}>
            <Text style={styles.productTitle}>Adidas</Text>
            <Text style={styles.productInfo}>Proveedores de productos para entrenamiento y fitness.</Text>
          </View>
        </View>
        // ... (todo tu código existente de Inicio)

<ScrollView style={styles.container}>
  {/* ... todas tus secciones: header, conocenos, catalogo, suscripciones, proveedores */}

  {/* PIE DE PÁGINA */}
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2025 FitDrop. Todos los derechos reservados.</Text>
    <Text style={styles.footerText}>Contacto: contacto@fitdrop.com</Text>
    <Text style={styles.footerText}>Tel: +52 123 456 7890</Text>
  </View>
</ScrollView>


      </ScrollView>
    </SafeAreaView>
    
  );
}


// ESTILOS
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  menuText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  dropdown: { backgroundColor: "#000", paddingVertical: 10 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 20 },
  dropdownText: { color: "#fff", fontSize: 16 },

  header: { padding: 20, alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  headerSubtitle: { fontSize: 16, color: "#333", textAlign: "center", marginTop: 5 },

  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  sectionText: { fontSize: 16, color: "#333" },

  productCard: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  providerCard: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  productTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  productInfo: { fontSize: 14, color: "#555" },

  banner: { alignItems: "center", marginVertical: 10 },
  bannerImage: { width: "90%", height: 180, borderRadius: 15 },
  footer: {
  padding: 20,
  backgroundColor: "#000",
  alignItems: "center",
  marginTop: 20,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
footerText: {
  color: "#fff",
  fontSize: 14,
  marginBottom: 5,
  textAlign: "center",
},

});

