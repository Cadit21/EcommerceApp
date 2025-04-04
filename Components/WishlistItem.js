import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WishlistItem = ({ item, onAddToCart, onRemove }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onAddToCart} style={styles.cartButton}>
            <Text style={styles.buttonText}>Add to Tray</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove} style={styles.removeIcon}>
            <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 14,
    color: "#f1f1f1",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffc107",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#ff6600",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  removeIcon: {
    padding: 6,
  },
});

export default WishlistItem;
