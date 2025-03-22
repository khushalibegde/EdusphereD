import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={require("../../assets/images/pfp1.png")} style={styles.profileImage} />
      
      {/* User Details */}
      <Text style={styles.name}>Khushali Begde</Text>
      <Text style={styles.bio}>🌟 Always Smiling | Loves Music 🎶 | Super Friendly 🤗</Text>
      <Text style={styles.location}>📍 Nagpur</Text>
      
      {/* Fun Badges */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}><FontAwesome5 name="star" size={20} color="#FFD700" /><Text style={styles.badgeText}>Superstar</Text></View>
        <View style={styles.badge}><FontAwesome5 name="music" size={20} color="#1E90FF" /><Text style={styles.badgeText}>Music Lover</Text></View>
        <View style={styles.badge}><FontAwesome5 name="heart" size={20} color="#FF69B4" /><Text style={styles.badgeText}>Kind Soul</Text></View>
      </View>
      
      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Let's Be Friends! 💛</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});