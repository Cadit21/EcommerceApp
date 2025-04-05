import React, { useRef, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/HomeScreen";
import CartScreen from "./Components/CartScreen";
import WishlistScreen from "./Components/Wishlist";
import FloatingWishlistButton from "./Components/WishListScreen";
import ProductPage from "./Components/ProductDetails";

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useRef();
  const [currentRoute, setCurrentRoute] = useState("Home"); // 👈 define state

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setCurrentRoute(navigationRef.current.getCurrentRoute().name);
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        setCurrentRoute(currentRouteName);
      }}
    >
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="ProductDetails" component={ProductPage} />

          {/* other screens */}
        </Stack.Navigator>

        {/* Only show button if not on Wishlist screen */}
        {currentRoute !== "Wishlist" && <FloatingWishlistButton />}
      </View>
    </NavigationContainer>
  );
}
