import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
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
      alert("🎉 Order placed successfully!");
      router.push("/(tabs)/orders");
    } catch {
      alert("Order failed");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
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

      {/* Order Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Order Summary</Text>

        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Items Total</Text>
          <Text style={styles.summaryValue}>
            ₹ {totalPrice.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.free}>FREE</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.total}>₹ {totalPrice.toFixed(2)}</Text>
        </View>
      </View>

      {/* Place Order */}
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
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
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
    borderRadius: 16,
    padding: 14,
    color: "#f8fafc",
    borderWidth: 1,
    borderColor: "#1e293b",
    fontSize: 15,
  },

  summaryCard: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  summaryLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },

  summaryValue: {
    color: "#f8fafc",
    fontWeight: "700",
  },

  free: {
    color: "#4ade80",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 10,
  },

  totalLabel: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
  },

  total: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "900",
  },

  btn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  btnText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
