import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getAllProductsApi } from "../../src/api/product";
import { router } from "expo-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getAllProductsApi(1, 20);
      setProducts(res.data.data.products);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛍️ Explore Products</Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card } onPress={() => router.push(`/(tabs)/product/${item._id}`)}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.price}>${item.price}</Text>

            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 12,
  },
  center: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#020617",
    width: "48%",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  rating: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },
});
