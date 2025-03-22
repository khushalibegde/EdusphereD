import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import * as Speech from "expo-speech";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";
import { Ionicons } from "@expo/vector-icons";

// Types
interface Signal {
  id: string;
  name: string;
  color: string;
  emoji: string;
  description: string;
  action: string;
  image: any;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  image: any;
  hint: string;
}

// Constants
const SPEECH_CONFIG = { language: "hi-IN", pitch: 1.0, rate: 0.8 };
const WRONG_FEEDBACKS = [
  "Oops! Try again.",
  "That's not quite right!",
  "Think again!",
  "Let's try one more time!",
  "Almost there!",
];

const SIGNALS: Signal[] = [
  {
    id: "red",
    name: "Red Light",
    color: "#FF3B30",
    emoji: "🔴",
    description: "Stop! Don't walk or cross the road. Look for the red light at the top.",
    action: "STOP",
    image: require("../../assets/images/traffic/red-light.png"),
  },
  {
    id: "yellow",
    name: "Yellow Light",
    color: "#FFCC00",
    emoji: "🟡",
    description: "Wait! Be ready to stop. The yellow light is in the middle.",
    action: "WAIT",
    image: require("../../assets/images/traffic/yellow-light.png"),
  },
  {
    id: "green",
    name: "Green Light",
    color: "#34C759",
    emoji: "🟢",
    description: "Go! It's safe to cross. Before crossing, look left and right.",
    action: "GO",
    image: require("../../assets/images/traffic/green-light.png"),
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "1",
    question: "What should you do at a red light?",
    options: ["Run across", "Stop and wait", "Walk slowly", "Look at phone"],
    correctAnswer: 1,
    image: require("../../assets/images/traffic/red-light.png"),
    hint: "Remember: Red means stop!",
  },
  {
    id: "2",
    question: "Before crossing, what should you do?",
    options: ["Close your eyes", "Look both ways", "Run fast", "Play music"],
    correctAnswer: 1,
    image: require("../../assets/images/traffic/look-both-ways.png"),
    hint: "Always look left and right!",
  },
  {
    id: "3",
    question: "Where should you cross the road?",
    options: ["Anywhere", "Zebra crossing", "Middle of road", "Near cars"],
    correctAnswer: 1,
    image: require("../../assets/images/traffic/zebra-crossing.png"),
    hint: "Look for the black and white stripes!",
  },
];

// Reusable Components
const SignalLight = ({ signal, isActive, onPress }: { signal: Signal; isActive: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[styles.signalLight, { backgroundColor: signal.color }]} accessibilityLabel={`${signal.name} light. ${signal.description}`}>
    <Image source={signal.image} style={styles.signalImage} />
    <Text style={styles.signalEmoji}>{signal.emoji}</Text>
    <Text style={styles.signalText}>{signal.action}</Text>
    {isActive && <Animatable.View animation="pulse" iterationCount="infinite" style={styles.activeIndicator} />}
  </TouchableOpacity>
);

const QuizOption = ({ text, onPress, isCorrect, isSelected }: { text: string; onPress: () => void; isCorrect?: boolean; isSelected?: boolean }) => (
  <TouchableOpacity style={[styles.quizOption, isSelected && styles.selectedOption, isCorrect && styles.correctOption]} onPress={onPress} disabled={isSelected}>
    <Text style={styles.quizOptionText}>{text}</Text>
  </TouchableOpacity>
);

const QuestionImage = ({ image, isActive }: { image: any; isActive: boolean }) => (
  <Animatable.View 
    animation={isActive ? "bounce" : "fadeIn"} 
    iterationCount={isActive ? "infinite" : 1} 
    style={styles.questionImageContainer}
  >
    <Image source={image} style={styles.questionImage} />
  </Animatable.View>
);

const TrafficScreen = () => {
  const [state, setState] = useState({
    activeSignal: "red",
    showQuiz: false,
    currentQuestion: 0,
    selectedAnswer: null as number | null,
    score: 0,
    showConfetti: false,
    showFeedback: false,
    isCorrect: false,
    quizCompleted: false,
    hasScored: false,
  });
  const idleAnimation = useRef(new Animated.Value(0)).current;
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Welcome to Traffic Safety Learning! Tap on the traffic lights to learn more!");
      startIdleAnimation();
      hasSpoken.current = true;
    }
  }, []);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text.replace(/[\u{1F300}-\u{1F9FF}]/gu, ''), SPEECH_CONFIG);
  };

  const startIdleAnimation = () => {
    Animated.loop(Animated.sequence([
      Animated.delay(10000),
      Animated.timing(idleAnimation, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(idleAnimation, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ])).start();
  };

  const handleSignalPress = (signal: Signal) => {
    setState(prev => ({ ...prev, activeSignal: signal.id }));
    speak(`${signal.name}! ${signal.description}`);
  };

  const handleQuizAnswer = (index: number) => {
    const isCorrectAnswer = index === QUIZ_QUESTIONS[state.currentQuestion].correctAnswer;
    
    setState(prev => ({
      ...prev,
      selectedAnswer: index,
      isCorrect: isCorrectAnswer,
      showFeedback: true,
      score: isCorrectAnswer && !prev.hasScored ? prev.score + 1 : prev.score,
      hasScored: isCorrectAnswer || prev.hasScored,
      showConfetti: isCorrectAnswer && state.currentQuestion < QUIZ_QUESTIONS.length - 1,
    }));

    speak(isCorrectAnswer ? "Great job! That's correct!" : WRONG_FEEDBACKS[Math.floor(Math.random() * WRONG_FEEDBACKS.length)]);

    setTimeout(() => {
      setState(prev => {
        if (prev.currentQuestion < QUIZ_QUESTIONS.length - 1) {
          return { 
            ...prev, 
            currentQuestion: prev.currentQuestion + 1, 
            selectedAnswer: null, 
            showFeedback: false,
            hasScored: false
          };
        }
        return { ...prev, quizCompleted: true, showFeedback: false };
      });
      if (state.currentQuestion === QUIZ_QUESTIONS.length - 1) {
        speak(`Quiz completed! You scored ${state.score + (isCorrectAnswer && !state.hasScored ? 1 : 0)} out of ${QUIZ_QUESTIONS.length}!`);
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      showQuiz: false,
      quizCompleted: false,
      selectedAnswer: null,
      hasScored: false,
    }));
    speak("Let's start the quiz again!");
  };

  const bounce = idleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>🚦 Traffic Safety Learning</Text>
        <Text style={styles.score}>Score: {state.score} ⭐</Text>

        <Animated.View style={{ transform: [{ scale: bounce }] }}>
          <View style={styles.signalsContainer}>
            {SIGNALS.map(signal => (
              <TouchableOpacity key={signal.id} onPress={() => handleSignalPress(signal)} style={[styles.signalLight, { backgroundColor: signal.color }]} accessibilityLabel={`${signal.name} light. ${signal.description}`}>
                <Image source={signal.image} style={styles.signalImage} />
                <Text style={styles.signalEmoji}>{signal.emoji}</Text>
                <Text style={styles.signalText}>{signal.action}</Text>
                {state.activeSignal === signal.id && <Animatable.View animation="pulse" iterationCount="infinite" style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {!state.showQuiz ? (
          <TouchableOpacity style={styles.quizButton} onPress={() => {
            setState(prev => ({ ...prev, showQuiz: true, currentQuestion: 0, selectedAnswer: null }));
            speak("Let's take a quiz to test what you've learned!");
          }}>
            <Text style={styles.quizButtonText}>🧠 Take Quiz</Text>
          </TouchableOpacity>
        ) : state.quizCompleted ? (
          <Animatable.View animation="fadeIn" style={styles.quizContainer}>
            <Text style={styles.questionText}>🎉 Quiz Complete! 🎉</Text>
            <Text style={styles.scoreText}>You scored {state.score} out of {QUIZ_QUESTIONS.length}!</Text>
            <TouchableOpacity style={styles.quizButton} onPress={handlePlayAgain}>
              <Text style={styles.quizButtonText}>🔄 Play Again</Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <View style={styles.quizContainer}>
            <Animatable.View animation={!state.selectedAnswer ? "bounce" : "fadeIn"} iterationCount={!state.selectedAnswer ? "infinite" : 1} style={styles.questionImageContainer}>
              <Image source={QUIZ_QUESTIONS[state.currentQuestion].image} style={styles.questionImage} />
            </Animatable.View>
            <Text style={styles.questionText}>{QUIZ_QUESTIONS[state.currentQuestion].question}</Text>
            <Text style={styles.hintText}>Hint: {QUIZ_QUESTIONS[state.currentQuestion].hint}</Text>
            <View style={styles.optionsContainer}>
              {QUIZ_QUESTIONS[state.currentQuestion].options.map((option, index) => (
                <TouchableOpacity key={index} style={[styles.quizOption, state.selectedAnswer === index && styles.selectedOption, state.showFeedback && index === QUIZ_QUESTIONS[state.currentQuestion].correctAnswer && styles.correctOption]} onPress={() => handleQuizAnswer(index)} disabled={state.selectedAnswer === index}>
                  <Text style={styles.quizOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {state.showFeedback && (
              <Animatable.View animation={state.isCorrect ? "bounceIn" : "shake"} style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>{state.isCorrect ? "👍 Correct!" : "❌ Try Again!"}</Text>
              </Animatable.View>
            )}
          </View>
        )}

        {state.showConfetti && <ConfettiCannon count={100} origin={{ x: Dimensions.get("window").width / 2, y: 0 }} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: "#F3F8FF", alignItems: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#1A237E", marginBottom: 15, textAlign: "center" },
  score: { fontSize: 28, color: "#C62828", marginBottom: 20, fontWeight: "bold" },
  signalsContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 30 },
  signalLight: { width: 120, height: 120, borderRadius: 60, justifyContent: "center", alignItems: "center", elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  signalImage: { width: 60, height: 60, marginBottom: 5 },
  signalEmoji: { fontSize: 40, marginBottom: 5 },
  signalText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold", textShadowColor: "rgba(0, 0, 0, 0.3)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  activeIndicator: { position: "absolute", top: -5, right: -5, width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF" },
  quizButton: { backgroundColor: "#6A1B9A", padding: 20, borderRadius: 15, minWidth: 200, alignItems: "center", elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, marginTop: 20 },
  quizButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  quizContainer: { width: "100%", backgroundColor: "#FFFFFF", padding: 20, borderRadius: 20, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, alignItems: "center" },
  questionText: { fontSize: 24, color: "#1A237E", marginBottom: 20, textAlign: "center", fontWeight: "bold", lineHeight: 32 },
  scoreText: { fontSize: 28, color: "#2E7D32", fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  optionsContainer: { gap: 15, width: "100%" },
  quizOption: { backgroundColor: "#E3F2FD", padding: 20, borderRadius: 15, alignItems: "center" },
  selectedOption: { backgroundColor: "#BBDEFB" },
  correctOption: { backgroundColor: "#C8E6C9" },
  quizOptionText: { fontSize: 20, color: "#1A237E", fontWeight: "500" },
  feedbackContainer: { marginTop: 20, padding: 15, borderRadius: 10, backgroundColor: "#FFFFFF", alignItems: "center" },
  feedbackText: { fontSize: 24, fontWeight: "bold", color: "#1A237E" },
  questionImageContainer: { width: "100%", height: 200, justifyContent: "center", alignItems: "center", marginBottom: 20, backgroundColor: "#FFFFFF", borderRadius: 15, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  questionImage: { width: "100%", height: "100%", resizeMode: "contain" },
  hintText: { fontSize: 18, color: "#1A237E", marginBottom: 20, textAlign: "center", fontWeight: "bold" },
});

export default TrafficScreen;
