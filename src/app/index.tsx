import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full gap-2 items-center min-h-[85vh] px-4">
          <Text className="p-5 font-pextrabold text-white">FitMate</Text>
          <Image
            className="max-w-[350px] w-full h-[300px]"
            source={icons.flex}
            resizeMode="contain"
          ></Image>
          <Text className="text-white text-3xl font-bold text-center">
            Monitoruj i osiągaj swoje cele z{" "}
            <Text className="text-accent">FitMate</Text>
          </Text>
          <Text className="text-sm font-pregular text-gray-200 mt-7 text-center">
            Monitoring jest kluczem do regularnosci zacznij monitorowac swoje
            treningi juz dziś
          </Text>
          <CustomButton
            title="Zaloguj się"
            hendlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-8"
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </SafeAreaView>
  );
}
