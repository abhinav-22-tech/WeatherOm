import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";

import { theme } from "../theme";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { storeData, getData } from "../utils/asyncStorage";
import Forcast from "./Forcast";

export default function HomeScreen() {
  // Toggle Search Input
  const [toggleSearch, setToggleSearch] = useState(false);
  const [locations, setLocations] = useState([]); // Locations
  const [weather, setWeather] = useState({});

  const handleSearch = (value) => {
    // Fecth Locations
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
    console.log("Search render");
  };

  const handleLocation = (loc) => {
    setLocations([]);
    setToggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
    });
    storeData("city", loc.name);
    console.log("Location render");
  };

  useEffect(() => {
    fetchMyWeatherData();
    console.log("useEffect render");
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "New Delhi";
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
      // setLoading(false);
    });
    console.log("Fetch render");
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { location, current } = weather;

  console.log("Home Component render");
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
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
                  onChangeText={handleTextDebounce}
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
                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* Forcast Sections*/}
          <Forcast location={location} weather={weather} current={current} />
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
