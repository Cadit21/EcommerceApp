import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FloatingWishlistButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate("Wishlist")}
    >
      <Text style={styles.fabText}>❤️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#ff5c5c",
    padding: 16,
    borderRadius: 50,
    elevation: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default FloatingWishlistButton;
