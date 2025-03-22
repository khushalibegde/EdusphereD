import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Speech from "expo-speech"; 

const moods = [
  { color: "yellow", label: "Happy", speech: "Happy, cheerful", image: require("../../assets/images/happy2.png") },
  { color: "red", label: "Angry", speech: "Angry, frustrated", image: require("../../assets/images/angry.png") },
  { color: "#9EC532", label: "Disgusted", speech: "Disgusted, grossed out", image: require("../../assets/images/disgust.png") },
  { color: "#82CAFF", label: "Sad", speech: "Sad, downhearted", image: require("../../assets/images/sad2.png") },
  { color: "#7500C6", label: "Fearful", speech: "Fearful, anxious", image: require("../../assets/images/fear1.png") },
];

const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodData, setMoodData] = useState<Record<string, string>>({});

  const handleMoodSelect = (color: string, speech: string): void => {
    setSelectedMood(color);
    Speech.speak(speech); 
  };

  const handleDayPress = (month: string, day: number): void => {
    if (selectedMood) {
      setMoodData({ ...moodData, [`${month}-${day}`]: selectedMood });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Tracker - 2025</Text>
      <View style={styles.content}>
        <View style={styles.monthsContainer}>
          {months.map((month) => (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthText}>{month.name}</Text>
              <View style={styles.gridContainer}>
                {Array.from({ length: month.days }, (_, i) => i + 1).map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayBox, { backgroundColor: moodData[`${month.name}-${day}`] || "white" }]}
                    onPress={() => handleDayPress(month.name, day)}
                  >
                    <Text style={styles.dayText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.moodSelector}>
          {moods.map((mood) => (
            <View key={mood.color} style={styles.moodItem}>
              <TouchableOpacity onPress={() => handleMoodSelect(mood.color, mood.speech)}>
                <Image source={mood.image} style={[styles.moodImage, selectedMood === mood.color && styles.selectedMood]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, alignItems: "center", backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  content: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", width: "100%" },
  monthsContainer: { flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  monthContainer: { alignItems: "center", marginBottom: 10, marginHorizontal: 5 },
  monthText: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  moodSelector: { width: 120, alignItems: "center" },
  moodItem: { alignItems: "center", marginBottom: 10 },
  moodImage: { width: 100, height: 120, marginVertical: 3 },
  selectedMood: { borderWidth: 2, borderColor: "black", borderRadius: 10 },
  dayBox: {
    width: 30,
    height: 30,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dayText: { fontSize: 11 },
});

