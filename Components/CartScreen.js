import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const saveCart = async (items) => {
    setCartItems(items);
    await AsyncStorage.setItem('cart', JSON.stringify(items));
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    saveCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNum}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹{totalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 50,
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    color: '#ffcc00',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  qtyNum: {
    color: '#fff',
    fontSize: 16,
  },
  remove: {
    color: '#ff4444',
    marginTop: 6,
  },
  footer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutBtn: {
    backgroundColor: '#ff6600',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 80,
  },
});

export default CartScreen;
