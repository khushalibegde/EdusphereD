import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const questions = [
  {
    question: "Which one is a Diya?",
    options: [
      { image: require("../../assets/images/diwali.png"), label: "Diya", isCorrect: true },
      { image: require("../../assets/images/rocket.jpg"), label: "Firework", isCorrect: false },
      { image: require("../../assets/images/sweet.png"), label: "Sweets", isCorrect: false }
    ]
  },
  {
    question: "What do people eat on Diwali?",
    options: [
      { image: require("../../assets/images/diwali.png"), label: "Diya", isCorrect: false },
      { image: require("../../assets/images/rocket.jpg"), label: "Firework", isCorrect: false },
      { image: require("../../assets/images/sweet.png"), label: "Sweets", isCorrect: true }
    ]
  }
];

const DiwaliPracticePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text,
    {
      language: "mr-IN",
      pitch: 1.0,
      rate: 0.9,
    }
    );
  };

  const handleAnswer = (option: { isCorrect: boolean; label: string }) => {
    speak(option.label); // Speak what the image represents

    if (option.isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 1000);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Your score: ${score + (option.isCorrect ? 1 : 0)}/${questions.length}`);
      }
    }, 1500);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      {/* Question with Speaker */}
      <View className="flex-row items-center mb-6">
        <Text className="text-3xl font-bold text-gray-800 text-center">{questions[currentQuestion].question}</Text>
        <TouchableOpacity onPress={() => speak(questions[currentQuestion].question)} className="ml-3">
          <MaterialCommunityIcons name="volume-high" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Answer Options */}
      <View className="w-full flex-row flex-wrap justify-center items-center">
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => handleAnswer(option)} className="m-2">
            <Image source={option.image} className="w-40 h-40 rounded-xl" resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Confetti Celebration */}
      {showConfetti && <ConfettiCannon count={50} origin={{ x: 200, y: 0 }} fadeOut />}
    </View>
  );
};

export default DiwaliPracticePage;
