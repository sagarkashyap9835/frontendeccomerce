import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";

export default function Cart() {
  const {cart,increaseQty,decreaseQty,removeFromCart,totalPrice,} = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.actionRow}>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={styles.qtyCircle}
                    onPress={() => decreaseQty(item._id)}
                  >
                    <Text style={styles.qtySymbol}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qty}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyCircle}
                    onPress={() => increaseQty(item._id)}
                  >
                    <Text style={styles.qtySymbol}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkout}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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

  emptyText: {
    color: "#cbd5f5",
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 14,
    borderRadius: 18,
    elevation: 4,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 14,
    marginRight: 14,
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
  },

  price: {
    color: "#38bdf8",
    fontSize: 15,
    marginTop: 4,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    fontWeight: "600",
    marginHorizontal: 14,
  },

  remove: {
    color: "#f87171",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  totalLabel: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },

  total: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
  },

  checkout: {
    backgroundColor: "#38bdf8",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },

  checkoutText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
    letterSpacing: 0.5,
  },
});
