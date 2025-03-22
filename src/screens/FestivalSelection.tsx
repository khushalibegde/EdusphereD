import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const festivals = [
  { name: "Diwali", image: require("../../assets/images/diwali.png") },
  { name: "Christmas", image: require("../../assets/images/christmas.jpg") },
  { name: "Eid", image: require("../../assets/images/eid.jpg") },
  { name: "Holi", image: require("../../assets/images/holi.jpg") },
];

const FestivalSelection = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-2xl font-bold mb-6">🎉 Choose a Festival 🎊</Text>

      <View className="grid grid-cols-2 gap-4">
        {festivals.map((festival, index) => (
          <TouchableOpacity
            key={index}
            className="bg-gray-200 rounded-xl p-3 items-center shadow-md"
          >
            <Image source={festival.image} className="w-24 h-24 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{festival.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FestivalSelection;
