import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de ejemplo
const cajas = [
  { id: '1', nombre: 'Básica', precio: '$200' },
  { id: '2', nombre: 'Standar', precio: '$250' },
  { id: '3', nombre: 'Premium', precio: '$300' },
];

export default function ListaCajas() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.caja}
      onPress={() => router.push(`/detalleCaja?id=${item.id}`)}
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>{item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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

      {/* LISTA DE CAJAS */}
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Cajas</Text>
        <FlatList
          data={cajas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  dropdown: { backgroundColor: '#000', paddingVertical: 10 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 20 },
  dropdownText: { color: '#fff', fontSize: 16 },

  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', width: '80%', padding: 20, borderRadius: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalButton: { backgroundColor: '#000', padding: 12, borderRadius: 10, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },

  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#000' },
  caja: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nombre: { fontSize: 18, fontWeight: '500', color: '#333' },
  precio: { fontSize: 16, color: '#555', marginTop: 5 },
});
