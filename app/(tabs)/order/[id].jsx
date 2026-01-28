import {View,Text,StyleSheet,ActivityIndicator,ScrollView,} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getOrderByIdApi } from "../../../src/api/order";
import { AuthContext } from "../../../src/context/AuthContext";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const { TOKEN } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await getOrderByIdApi(id, TOKEN);
      setOrder(res.data.data);
    } catch {
      alert("Failed to load order");
    }
  };

  if (!order) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Order Details informatio</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{order._id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.badge]}>
            {order.status}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.value}>{order.paymentStatus}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.total}>₹ {order.grandTotal}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shipping Address</Text>
        <Text style={styles.address}>
          {order.shippingAddress.address},{" "}
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Items</Text>

        {order.products.map((p, i) => (
          <View key={i} style={styles.itemRow}>
            <Text style={styles.itemTitle}>{p.title}</Text>
            <Text style={styles.qty}>× {p.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },

  center: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#94a3b8",
    marginTop: 10,
  },

  heading: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  cardTitle: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#94a3b8",
    fontSize: 14,
  },

  value: {
    color: "#f8fafc",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  badge: {
    backgroundColor: "#022c22",
    color: "#4ade80",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
  },

  total: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "800",
  },

  address: {
    color: "#e5e7eb",
    lineHeight: 20,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  itemTitle: {
    color: "#f8fafc",
    fontSize: 15,
    flex: 1,
  },

  qty: {
    color: "#94a3b8",
    fontWeight: "600",
  },
});
