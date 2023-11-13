import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";

import { theme } from "../theme";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";
import { storeData, getData } from "../utils/asyncStorage";

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
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, [location]);

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
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { location, current } = weather;

  // const HomeComponent = useMemo(() => {
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
            <View className="flex flex-1 mx-4 justify-around mb-2">
              <Text className="text-white text-center text-2xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {" " + location?.country}
                </Text>
              </Text>
              {/* Weather Image */}
              <View className="flex-row justify-center">
                <Image
                  source={weatherImages[current?.condition?.text]}
                  className="w-52 h-52"
                />
              </View>
              {/*Degree Celeuis */}
              <View className="space-y-2">
                <Text className="text-white text-bold text-center text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-white text-center text-xl tracking-widest">
                  {current?.condition.text}
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
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                {/* Drop */}
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/images/drop.png")}
                    className="h-7 w-7"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                {/* Sunrise */}
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/images/sun-white.png")}
                    className="h-7 w-7"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>

            {/* Forcast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-6 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-base text-white">Daily Forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];
                  console.log(weather);
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                      <Image
                        // source={{uri: 'https:'+item?.day?.condition?.icon}}
                        source={
                          weatherImages[item?.day?.condition?.text || "other"]
                        }
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    );
  // }, []);

  // return HomeComponent;
}
