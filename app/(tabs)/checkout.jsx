import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { CartContext } from "../../src/context/CartContext";
import { AuthContext } from "../../src/context/AuthContext";
import { createOrderApi } from "../../src/api/order";
import { router } from "expo-router";

export default function Checkout() {
  const { cart, totalPrice } = useContext(CartContext);
  const { TOKEN } = useContext(AuthContext);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleOrder = async () => {
    try {
      const orderData = {
        products: cart.map((i) => ({
          productId: i._id || i.id,
          quantity: i.quantity,
        })),
        shippingAddress: address,
        paymentMethod: "card",
      };

      await createOrderApi(orderData, TOKEN);
      alert("Order placed successfully!");
      router.push("/(tabs)/orders");
    } catch {
      alert("Order failed");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Checkout</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shipping Address</Text>

        {[
          { key: "address", label: "Street Address" },
          { key: "city", label: "City" },
          { key: "state", label: "State" },
          { key: "postalCode", label: "Postal Code" },
          { key: "country", label: "Country" },
        ].map((f) => (
          <View key={f.key} style={styles.field}>
            <Text style={styles.label}>{f.label}</Text>
            <TextInput
              placeholder={f.label}
              placeholderTextColor="#64748b"
              style={styles.input}
              onChangeText={(v) =>
                setAddress({ ...address, [f.key]: v })
              }
            />
          </View>
        ))}
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Order Total</Text>
        <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleOrder}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },

  heading: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#e5e7eb",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 14,
    color: "#f8fafc",
    borderWidth: 1,
    borderColor: "#1e293b",
    fontSize: 15,
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
  },

  summaryText: {
    color: "#94a3b8",
    fontSize: 15,
    fontWeight: "600",
  },

  total: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "800",
  },

  btn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 40,
  },

  btnText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
