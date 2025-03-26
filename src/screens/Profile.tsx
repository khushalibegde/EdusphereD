import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default function Profile() {
  const [hearts, setHearts] = useState([]);
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();

    const newHearts = Array.from({ length: 10 }).map(() => ({
      id: Date.now() + Math.random(),
      animation: new Animated.Value(0),
      xPos: Math.random() * width - width / 2,
      yPos: Math.random() * height - height / 2,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    newHearts.forEach((heart) => {
      Animated.timing(heart.animation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      });
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/pfp1.png")} style={styles.profileImage} />
      
      <Text style={styles.name}>Khushali Begde</Text>
      <Text style={styles.username}>@khushi_sparkle</Text>
      <Text style={styles.age}>Age: 12</Text>
      <Text style={styles.bio}>🌟 Always Smiling | Loves Music 🎶 | Super Friendly 🤗</Text>
      <Text style={styles.location}>📍 Nagpur</Text>
      
      <Text style={styles.sectionTitle}>Learning Style</Text>
      <Text style={styles.learningStyle}>🎨 Visual | 🎵 Auditory | 🤲 Hands-on</Text>
      
      <View style={styles.badgeContainer}>
        <View style={styles.badge}><FontAwesome5 name="star" size={20} color="#FFD700" /><Text style={styles.badgeText}>Superstar</Text></View>
        <View style={styles.badge}><FontAwesome5 name="music" size={20} color="#1E90FF" /><Text style={styles.badgeText}>Music Lover</Text></View>
        <View style={styles.badge}><FontAwesome5 name="heart" size={20} color="#FF69B4" /><Text style={styles.badgeText}>Kind Soul</Text></View>
      </View>
      
      <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <FontAwesome5 name="heart" size={40} color="#FF69B4" />
        </Animated.View>
      </TouchableOpacity>

      {hearts.map((heart) => (
        <Animated.View key={heart.id} style={[styles.floatingHeart, {
          opacity: heart.animation,
          transform: [
            { translateY: heart.animation.interpolate({ inputRange: [0, 1], outputRange: [0, -Math.random() * height] }) },
            { translateX: heart.animation.interpolate({ inputRange: [0, 1], outputRange: [heart.xPos, heart.xPos + Math.random() * 100 - 50] }) }
          ]
        }]}>
          <FontAwesome5 name="heart" size={20} color="#FF69B4" />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF4E6",
    padding: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 18,
    color: "#777",
    marginBottom: 5,
  },
  age: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  bio: {
    fontSize: 18,
    color: "#555",
    marginVertical: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  learningStyle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 15,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
  },
  badgeText: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  heartButton: {
    marginTop: 20,
  },
  floatingHeart: {
    position: "absolute",
    top: "50%",
  },
});