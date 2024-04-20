import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import FormField from "@/src/components/FormField";
import CustomButton from "@/src/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex flex-row">
            <Image
              resizeMode="contain"
              source={icons.flex}
              className="w-[54px] h-[54px] "
            ></Image>
            <Text className="p-5 font-pextrabold text-3xl text-accent">
              FitMate
            </Text>
          </View>
          <Text className="text-2xl  text-white mt-10 font-semibold font-psemibold">
            Zaloguj Się do FitMate
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Hasło"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Zaloguj Się"
            hendlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row items-center gap-5  mt-2 justify-center text-center">
            <Text className="text-lg text-gray-100 font-pregular">
              Nie masz Konta ?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg text-accent font-pregular"
            >
              Zarejstruj Się
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
