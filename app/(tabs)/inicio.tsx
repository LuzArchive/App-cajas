import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const router = useRouter();

export default function Inicio() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        {/* MENÚ SUPERIOR */}
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Text style={styles.menuText}>☰ Menú</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLoginVisible(true)}>
            <Ionicons name="person-circle-outline" size={32} color="#000" />
          </TouchableOpacity>
        </View>

        {/* MENÚ DESPLEGABLE */}
        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Conócenos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Suscripciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Proveedores</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MODAL LOGIN */}
        <Modal visible={loginVisible} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Login / Register</Text>
              <TouchableOpacity onPress={() => setLoginVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* HEADER / BANNER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FitDrop</Text>
          <Text style={styles.headerSubtitle}>
            Elige tu suscripción y recibe tu caja fitness cada mes
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={{ uri: "https://i.imgur.com/w05U66I.png" }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
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

  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#fff", width: "80%", padding: 20, borderRadius: 15 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalButton: { backgroundColor: "#000", padding: 12, borderRadius: 10, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold" },

  header: { padding: 20, alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  headerSubtitle: { fontSize: 16, color: "#333", textAlign: "center", marginTop: 5 },

  banner: { alignItems: "center", marginVertical: 10 },
  bannerImage: { width: "90%", height: 180, borderRadius: 15 },
});
