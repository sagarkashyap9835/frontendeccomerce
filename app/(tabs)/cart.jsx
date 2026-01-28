import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySub}>
          Add items to continue shopping
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₹ {item.price}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(item._id)}
                >
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item._id)}
                >
                  <Text style={styles.qtySymbol}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item._id)}
                >
                  <Text style={styles.qtySymbol}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Checkout Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.total}>₹ {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

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

  card: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 20,
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: 16,
    marginRight: 14,
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "800",
  },

  remove: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "600",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },

  qtySymbol: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },

  qty: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
  },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },

  total: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "900",
  },

  checkout: {
    backgroundColor: "#38bdf8",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,
  },

  checkoutText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "800",
  },
});
