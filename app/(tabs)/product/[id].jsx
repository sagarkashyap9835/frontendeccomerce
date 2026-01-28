import {View,Text,Image,StyleSheet,ScrollView,ActivityIndicator,TouchableOpacity,} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getSingleProductApi } from "../../../src/api/product.js"
import { CartContext } from "../../../src/context/CartContext.js";
import { useContext } from "react";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getSingleProductApi(id);
      setProduct(res.data.data);
    } catch (err) {
      alert("Failed to load product");
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

  if (!product) return null;
// console.log("PRODUCT:", product?._id, product?.title);
console.log("OPENED PRODUCT:", product?._id, product?.id, product?.title);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.rating}>⭐ {product.rating}</Text>

        <Text style={styles.section}>Description</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <Text style={styles.section}>Brand</Text>
        <Text style={styles.desc}>{product.brand}</Text>

        <Text style={styles.section}>Stock</Text>
        <Text style={styles.desc}>{product.stock} available</Text>
      </View>
      <TouchableOpacity
  style={styles.addBtn}
  onPress={() => addToCart(product)}
>
  <Text style={styles.addText}>Add to Cart</Text>
</TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  center: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 280,
  },
  content: {
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  price: {
    color: "#38bdf8",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  rating: {
    color: "#94a3b8",
    marginTop: 4,
  },
  section: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 18,
  },
  desc: {
    color: "#cbd5f5",
    marginTop: 6,
    lineHeight: 20,
  },
  addBtn: {
  backgroundColor: "#38bdf8",
  padding: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20,
},
addText: {
  fontWeight: "700",
  color: "#020617",
  fontSize: 16,
},

});
