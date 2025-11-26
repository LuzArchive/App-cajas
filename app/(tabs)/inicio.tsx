import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Inicio() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

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
                router.push('/suscripciones');
                setMenuVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>Suscripciones</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => {
                router.push('/proveedores');
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

  header: { padding: 20, alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  headerSubtitle: { fontSize: 16, color: "#333", textAlign: "center", marginTop: 5 },

  banner: { alignItems: "center", marginVertical: 10 },
  bannerImage: { width: "90%", height: 180, borderRadius: 15 },
});
