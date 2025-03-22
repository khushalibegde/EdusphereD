import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";  // ✅ Import Gesture Handler
import BottomTabBar from "./components/BottomTabBar";
import Home from "./src/screens/Home";
import FestivalSelection from "./src/screens/FestivalSelection";
import Mood from "./src/screens/Mood";
import Profile from "./src/screens/Profile";
import BirthdayScreen from "./src/screens/BirthdayScreen";
import MRPScreen from "./src/screens/MRPScreen";
import ComputerScreen from "./src/screens/ComputerScreen";
import GreetingsScreen from "./src/screens/GreetingsScreen";
import MobileScreen from "./src/screens/MobileScreen";
import TrafficScreen from "./src/screens/TrafficScreen";
import Feelings from "./src/screens/Feelings";
import HelplineScreen from "./src/screens/HelplineScreen";
import RescueScreen from "./src/screens/RescueGame";


export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      {/* ✅ Wrap the entire app in GestureHandlerRootView */}
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          {currentScreen === "Home" && <Home navigateTo={navigateTo} />}
          {currentScreen === "Mood" && <Mood />}
          {currentScreen === "Profile" && <Profile />}
          {currentScreen === "FestivalSelection" && <FestivalSelection />}
          {currentScreen === "BirthdayScreen" && <BirthdayScreen />}
          {currentScreen === "MRPScreen" && <MRPScreen />}
          {currentScreen === "ComputerScreen" && <ComputerScreen />}
          {currentScreen === "GreetingsScreen" && <GreetingsScreen />}
          {currentScreen === "HelplineScreen" && <HelplineScreen navigateTo={navigateTo}/>}
          {currentScreen === "MobileScreen" && <MobileScreen />}
          {currentScreen === "TrafficScreen" && <TrafficScreen />}
          {currentScreen === "Feelings" && <Feelings />}
          {currentScreen === "RescueScreen" && <RescueScreen />}
        </View>

        {/* Bottom Tab Bar stays fixed at the bottom */}
        <View style={styles.bottomTabContainer}>
          <BottomTabBar navigateTo={navigateTo} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1, // Ensures this takes full space except bottom tab
  },
  bottomTabContainer: {
    height: 65, // Adjust based on your BottomTabBar height
  },
});
