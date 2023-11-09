import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  MagnifyingGlassIcon,
  CalculatorIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

import { theme } from "../theme";

export default function HomeScreen() {
  // Toggle Search Input
  const [toggleSearch, setToggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]); // Locations

  const handleLocation = (loc) => {
    console.log(loc);
  };

  const handleSearch = (value) => {
    console.log("value: " + value);
  };

  return (
    <View className="flex-1 relative ">
      <StatusBar style="light" />
      <Image
        blurRadius={100}
        source={require("../assets/images/bg-1.jpg")}
        className="absolute h-full w-full"
      />
      <SafeAreaView
        className="flex flex-1"
        style={{ marginTop: Constants.statusBarHeight + 10 }}
      >
        {/* Search area */}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full "
            style={{
              backgroundColor: toggleSearch
                ? theme.bgWhite(0.2)
                : "transparent",
            }}
          >
            {toggleSearch ? (
              <TextInput
                onChangeText={handleSearch}
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}
            <TouchableOpacity
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
              onPress={() => setToggleSearch(!toggleSearch)}
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && toggleSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">London, UK</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* Forcast Sections*/}
        <View className="flex flex-1 mx-4 justify-around mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          {/* Weather Image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/sun.png")}
              className="w-52 h-52"
            />
          </View>
          {/*Degree Celeuis */}
          <View className="space-y-2">
            <Text className="text-white text-bold text-center text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-white text-center text-xl tracking-widest">
              Sunny
            </Text>
          </View>
          {/* Other stats*/}
          <View className="flex-row justify-between mx-4">
            {/* Wind */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/wind.png")}
                className="h-7 w-7"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            {/* Drop */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/drop.png")}
                className="h-7 w-7"
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            {/* Sunrise */}
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/sun-white.png")}
                className="h-7 w-7"
              />
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Forcast for next days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-6 space-x-2">
            <CalculatorIcon size="22" color="white" />
            <Text className="text-base text-white">Daily Forecast</Text>
          </View>
          <ScrollView
            horizontal
            conttentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Wednesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../assets/images/storm.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
