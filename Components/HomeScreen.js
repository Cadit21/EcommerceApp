import React, { useRef,useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Animated,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./Product";
import FloatingWishlistButton from "./WishListScreen";



const HomeScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
 const [searchQuery, setSearchQuery] = useState("");
  return (
    <View style={styles.container}>
      {/* Background Image (Fixed) */}
      <ImageBackground
        source={require("../assets/backgroung.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              {/* Scroll View with Animated Effect */}
              <Animated.ScrollView
                contentContainerStyle={styles.scrollContainer}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
              >
                {/* Navbar */}
                <View style={styles.navbar}>
                  <Image source={require("../assets/icon.png")} style={styles.logo} />
                  <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
                    <TextInput
  style={styles.searchInput}
  placeholder="Search..."
  placeholderTextColor="#ccc"
  value={searchQuery}
  onChangeText={setSearchQuery}
/>

                  </View>
                  <View style={styles.navButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                      <Ionicons name="cart" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.navText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Hero Section (Optional) */}
                <View style={styles.spacer}>
                  {/* You can add a welcome message or banner here */}
                </View>

                {/* Product List Section */}
                <Animated.View
                  style={[
                    styles.productContainer,
                    {
                      opacity: scrollY.interpolate({
                        inputRange: [300, 500],
                        outputRange: [0, 1],
                        extrapolate: "clamp",
                      }),
                      transform: [
                        {
                          translateY: scrollY.interpolate({
                            inputRange: [300, 600],
                            outputRange: [50, 0],
                            extrapolate: "clamp",
                          }),
                        },
                      ],
                    },
                  ]}
                >
                 <ProductList searchQuery={searchQuery} />

                  
                  
                </Animated.View>
              </Animated.ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    width: "100%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    alignItems: "center",
    marginHorizontal: 8,
    borderRadius: 20,
    width: "40%",
    maxWidth: 400,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 5,
  },
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "bold",
  },
  spacer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  productContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen; 