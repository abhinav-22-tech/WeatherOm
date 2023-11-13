import React, { useMemo } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";

import { theme } from "../theme";
import { weatherImages } from "../constants";

export default function Forcast({ location, weather, current }) {
  console.log("Forcast Component");
  const forcastComponent = useMemo(() => {
    return (
      <View className="flex flex-1">
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
      </View>
    );
  }, [location]);

  return forcastComponent;
}
