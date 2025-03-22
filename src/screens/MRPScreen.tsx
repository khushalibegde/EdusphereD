import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";

interface Product {
  id: string;
  name: string;
  image: any;
  mrp: string;
  expiryDate: string;
  description: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Milk Packet",
    image: require("../../assets/images/milk.png"),
    mrp: "₹60",
    expiryDate: "15/04/2024",
    description: "Look for a white packet with a cow picture! 🐄 The price is written in big numbers. This milk makes our bones strong! 💪",
  },
  {
    id: "2",
    name: "Bread",
    image: require("../../assets/images/bread.png"),
    mrp: "₹40",
    expiryDate: "10/04/2024",
    description: "Find the brown packet with bread slices! 🍞 The price is on the front. This bread helps us grow tall! 🌱",
  },
  {
    id: "3",
    name: "Eggs",
    image: require("../../assets/images/eggs.png"),
    mrp: "₹80",
    expiryDate: "20/04/2024",
    description: "Look for the white eggs in a box! 🥚 The price is on the top. Eggs give us energy to play! ⚡",
  },
];

const SPEECH_CONFIG = { language: "hi-IN", pitch: 1.0, rate: 0.8 };

const MRPScreen = () => {
  const [state, setState] = useState({
    currentProduct: products[0],
    showConfetti: false,
    showHint: false,
    score: 0,
  });
  const [animations] = useState({
    scale: new Animated.Value(1),
    rotation: new Animated.Value(0),
  });
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Welcome to MRP and Expiry Date Finder! Let's learn to find prices and expiry dates on products. Tap on the product to rotate it, and use the buttons below to learn more!");
      hasSpoken.current = true;
    }
  }, []);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text.replace(/[\u{1F300}-\u{1F9FF}]/gu, ''), SPEECH_CONFIG);
  };

  const animateProduct = () => {
    Animated.sequence([
      Animated.timing(animations.rotation, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animations.rotation, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();
  };

  const handleAction = (action: 'mrp' | 'expiry' | 'hint' | 'next') => {
    switch (action) {
      case 'mrp':
        speak(`The MRP of ${state.currentProduct.name} is ${state.currentProduct.mrp}`);
        setState(prev => ({ ...prev, showConfetti: true, score: prev.score + 1 }));
        break;
      case 'expiry':
        speak(`The expiry date of ${state.currentProduct.name} is ${state.currentProduct.expiryDate}`);
        setState(prev => ({ ...prev, showConfetti: true, score: prev.score + 1 }));
        break;
      case 'hint':
        setState(prev => ({ ...prev, showHint: true }));
        speak(state.currentProduct.description);
        setTimeout(() => setState(prev => ({ ...prev, showHint: false })), 10000);
        break;
      case 'next':
        const currentIndex = products.findIndex(p => p.id === state.currentProduct.id);
        const nextProduct = products[(currentIndex + 1) % products.length];
        setState(prev => ({ ...prev, currentProduct: nextProduct }));
        speak(`Let's look at ${nextProduct.name}`);
        break;
    }
    if (action === 'mrp' || action === 'expiry') {
      setTimeout(() => setState(prev => ({ ...prev, showConfetti: false })), 2000);
    }
  };

  const spin = animations.rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const buttons = [
    { text: "Show MRP", color: "#4CAF50", action: () => handleAction('mrp') },
    { text: "Show Expiry Date", color: "#2196F3", action: () => handleAction('expiry') },
    { text: "Get Hint", color: "#FF9800", action: () => handleAction('hint') },
    { text: "Next Product", color: "#9C27B0", action: () => handleAction('next') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ MRP & Expiry Date Finder</Text>
      <Text style={styles.score}>Score: {state.score} ⭐</Text>

      <TouchableOpacity onPress={animateProduct} style={styles.productContainer}>
        <Animated.Image
          source={state.currentProduct.image}
          style={[styles.productImage, { transform: [{ scale: animations.scale }, { rotate: spin }] }]}
        />
      </TouchableOpacity>

      {state.showHint && (
        <Animatable.View animation="fadeIn" style={styles.hintContainer}>
          <Text style={styles.hintText}>{state.currentProduct.description}</Text>
        </Animatable.View>
      )}

      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: button.color }]}
            onPress={button.action}
          >
            <Text style={styles.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {state.showConfetti && (
        <ConfettiCannon count={100} origin={{ x: Dimensions.get("window").width / 2, y: 0 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F8FF", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#2C3E50", marginBottom: 10, textAlign: "center" },
  score: { fontSize: 24, color: "#E74C3C", marginBottom: 20 },
  productContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  productImage: { width: 250, height: 250, resizeMode: "contain" },
  buttonContainer: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  button: { padding: 15, borderRadius: 15, minWidth: 150, alignItems: "center", justifyContent: "center", margin: 5 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  hintContainer: { backgroundColor: "rgba(255, 255, 255, 0.9)", padding: 15, borderRadius: 10, marginBottom: 20, width: "90%" },
  hintText: { fontSize: 16, color: "#2C3E50", textAlign: "center" },
});

export default MRPScreen;
