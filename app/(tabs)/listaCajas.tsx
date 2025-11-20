// app/(tabs)/listaCajas.tsx
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de ejemplo
const cajas = [
  { id: '1', nombre: 'Caja de Regalo A', precio: '$200' },
  { id: '2', nombre: 'Caja de Regalo B', precio: '$250' },
  { id: '3', nombre: 'Caja de Regalo C', precio: '$300' },
];

export default function ListaCajas() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.caja}
      onPress={() => router.push(`/detalleCaja?id=${item.id}`)} // link a detalle
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>{item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cajas</Text>
      <FlatList
        data={cajas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  caja: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  nombre: {
    fontSize: 18,
    fontWeight: '500',
  },
  precio: {
    fontSize: 16,
    color: '#555',
  },
});
