import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await register(form);
      router.replace("/(tabs)");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join us and start shopping 
        </Text>

        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="John"
              placeholderTextColor="#64748b"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, firstName: v })}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Doe"
              placeholderTextColor="#64748b"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, lastName: v })}
            />
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="john@example.com"
            placeholderTextColor="#64748b"
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, email: v })}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Create a strong password"
            placeholderTextColor="#64748b"
            secureTextEntry
            style={styles.input}
            onChangeText={(v) => setForm({ ...form, password: v })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 28,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  inputBox: {
    flex: 1,
    marginBottom: 16,
  },

  label: {
    color: "#cbd5f5",
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    color: "#f8fafc",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
  },

  link: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 22,
  },

  linkBold: {
    color: "#38bdf8",
    fontWeight: "700",
  },
});
