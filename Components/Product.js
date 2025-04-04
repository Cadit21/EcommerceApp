import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.9;

const ProductList = ({ searchQuery = "" }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        loadWishlist();
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const loadWishlist = async () => {
    const storedWishlist = await AsyncStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  };

  const saveWishlist = async (updatedWishlist) => {
    await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const toggleWishlist = async (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      Alert.alert("Removed", "Item removed from wishlist.");
    } else {
      updatedWishlist = [...wishlist, product];
      Alert.alert("Added", "Item added to wishlist.");
    }

    saveWishlist(updatedWishlist);
  };

  const addToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      let cart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = cart.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      Alert.alert("Success", "Item added to tray!");
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!flatListRef.current || !searchQuery || filteredProducts.length === 0) return;

    const index = 0; // scroll to top of filtered list
    setTimeout(() => {
      try {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      } catch (err) {
        console.warn("Scroll failed", err);
      }
    }, 500); // wait a bit for layout
  }, [searchQuery]);

  const renderCard = ({ item }) => {
    const isWishlisted = wishlist.some((w) => w.id === item.id);

    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.wishlistIcon}
          onPress={() => toggleWishlist(item)}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={22}
            color={isWishlisted ? "#ff3366" : "#fff"}
          />
        </TouchableOpacity>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Add to Tray</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <FlatList style={{ width: '100%' }}

      ref={flatListRef}
      data={filteredProducts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCard}
      contentContainerStyle={{ padding: 20,alignItems: 'center',  }}
      ListEmptyComponent={<Text style={styles.noResults}>No products found.</Text>}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
        }, 500);
      }}
      getItemLayout={(data, index) => ({
        length: 240,
        offset: 240 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: cardWidth,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
    
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 12,
  },
  productName: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffcc00",
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  wishlistIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 2,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  noResults: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProductList;
