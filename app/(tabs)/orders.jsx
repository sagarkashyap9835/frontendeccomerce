import {View,Text,FlatList,TouchableOpacity, StyleSheet,} from "react-native";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { getMyOrdersApi } from "../../src/api/order";
import { router, useFocusEffect } from "expo-router";

export default function Orders() {
  const { TOKEN } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await getMyOrdersApi(TOKEN);
      setOrders(res.data.data.orders);
    } catch (e) {
      alert("Failed to load orders");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}></Text>
        <Text style={styles.emptyText}>No orders yet</Text>
        <Text style={styles.emptySub}>
          Your orders will appear here
        </Text>
      </View>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return styles.delivered;
      case "shipped":
        return styles.shipped;
      case "cancelled":
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/(tabs)/order/${item._id}`)
            }
          >
            <View style={styles.topRow}>
              <Text style={styles.orderId}>
                Order #{item._id.slice(-6)}
              </Text>
              <Text
                style={[
                  styles.statusBadge,
                  getStatusStyle(item.status),
                ]}
              >
                {item.status}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Items</Text>
              <Text style={styles.value}>
                {item.totalQuantity}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.total}>
                ₹ {item.grandTotal}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },

  /* Empty */
  center: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },

  emptyText: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
  },

  emptySub: {
    color: "#94a3b8",
    marginTop: 6,
  },

  heading: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
  },

  /* Card */
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  orderId: {
    color: "#38bdf8",
    fontSize: 15,
    fontWeight: "800",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  delivered: {
    backgroundColor: "#022c22",
    color: "#4ade80",
  },

  shipped: {
    backgroundColor: "#1e293b",
    color: "#38bdf8",
  },

  pending: {
    backgroundColor: "#2e1065",
    color: "#c4b5fd",
  },

  cancelled: {
    backgroundColor: "#450a0a",
    color: "#f87171",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  label: {
    color: "#94a3b8",
    fontSize: 14,
  },

  value: {
    color: "#f8fafc",
    fontWeight: "700",
  },

  total: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "900",
  },
});
