import { StyleSheet } from "react-native";

export const inicioStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20 },
  headerTitle: { fontSize: 26, fontWeight: "bold" },
  headerSubtitle: { fontSize: 16, color: "#555" },
  banner: { alignItems: "center", paddingHorizontal: 20 },
  bannerImage: { width: "100%", height: 180, borderRadius: 15 },
  mainButton: { backgroundColor: "#ff6b81", padding: 15, borderRadius: 10, alignItems: "center" },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  categoryContainer: { paddingHorizontal: 20, marginTop: 10 },
  categoryTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  categoryItem: { backgroundColor: "#f1f2f6", padding: 12, paddingHorizontal: 18, borderRadius: 20, marginRight: 10 },
  featuredContainer: { padding: 20 },
  featuredTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  featuredCard: { backgroundColor: "#fff", padding: 15, marginBottom: 15, borderRadius: 12, elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 } },
  featuredImage: { width: "100%", height: 160, borderRadius: 10 },
  featuredName: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  featuredDescription: { color: "#777", marginBottom: 10 },
  featuredButton: { backgroundColor: "#ff6b81", padding: 12, borderRadius: 10, alignItems: "center" },
  featuredButtonText: { color: "#fff", fontSize: 16 },
});
