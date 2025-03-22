import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomTabBar from "./components/BottomTabBar";
import Home from "./src/screens/Home";
import FestivalSelection from "./src/screens/FestivalSelection";
import Mood from "./src/screens/Mood";
import Profile from "./src/screens/Profile";
import DiwaliPage from "./src/screens/DiwaliPage";
import DiwaliItemsPage from "./src/screens/DiwaliItemsPage";
import DiwaliPracticePage from "./src/screens/DiwaliPracticePage";
import EidPage from "./src/screens/EidPage";
import EidItemsPage from "./src/screens/EidItemsPage";
import EidPracticePage from "./src/screens/EidPracticePage";
import ChristmasPage from "./src/screens/ChristmasPage";
import ChristmasItemsPage from "./src/screens/ChristmasItemsPage";
import ChristmasPracticePage from "./src/screens/ChristmasPracticePage";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {currentScreen === "Home" && <Home navigateTo={navigateTo} />}
        {currentScreen === "Mood" && <Mood/>}
        {currentScreen === "Profile" && <Profile/>}
        {currentScreen === "FestivalSelection" && <FestivalSelection navigateTo={navigateTo} />}
        {currentScreen === "DiwaliPage" && <DiwaliPage navigateTo={navigateTo} />}
        {currentScreen === "DiwaliItemsPage" && <DiwaliItemsPage navigateTo={navigateTo}/>}
        {currentScreen === "DiwaliPracticePage" && <DiwaliPracticePage/>}
        {currentScreen === "EidPage" && <EidPage navigateTo={navigateTo}/>}
        {currentScreen === "EidItemsPage" && <EidItemsPage navigateTo={navigateTo}/>}
        {currentScreen === "EidPracticePage" && <EidPracticePage/>}
        {currentScreen === "ChristmasPage" && <ChristmasPage navigateTo={navigateTo}/>}
        {currentScreen === "ChristmasItemsPage" && <ChristmasItemsPage navigateTo={navigateTo}/>}
        {currentScreen === "ChristmasPracticePage" && <ChristmasPracticePage/>}
      </View>

      {/* Bottom Tab Bar stays fixed at the bottom */}
      <View style={styles.bottomTabContainer}>
        <BottomTabBar navigateTo={navigateTo}/>
      </View>
    </View>
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
