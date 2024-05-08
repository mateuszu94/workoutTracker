import React from "react";
import { Image, Pressable, Text, ToastAndroid, View } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants";
import { useObject, useQuery, useRealm } from "@realm/react";
import { UserExercise } from "../models/userExercise";
import { Workout } from "../models/Workout";
import { BSON } from "realm";

interface ExerciseListItemProps {
  currentValue: { name: string; id: any };

  item: {
    name: string;
    muscle: string;
    equipment: string;
    instructions: string;
  };
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  item,
  currentValue,
}) => {
  let workout = null;

  if (currentValue.id !== "") {
    workout = useObject<Workout>(
      Workout,
      new BSON.ObjectID(currentValue.id as string)
    );
  }
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Ćwiczenie Zostało dodane",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
  };

  const userExercises = useQuery(UserExercise);

  const realm = useRealm();
  const createExercise = () => {
    if (!workout) {
      return;
    }
    realm.write(() => {
      if (userExercises.length === 0) {
        realm.create(UserExercise, {
          name: item.name,
          muscle: item.muscle,
          instructions: item.instructions,
          equipment: item.equipment,
        });
      } else {
        const userEsxercisetoAdd = userExercises.filter(
          (userExercise) => userExercise.name === item.name
        );
        if (userEsxercisetoAdd.length === 0) {
          realm.create(UserExercise, {
            name: item.name,
            muscle: item.muscle,
            instructions: item.instructions,
            equipment: item.equipment,
          });
        }
      }
      const userEsxercisetoAdd = userExercises.filter(
        (userExercise) => userExercise.name === item.name
      );

      workout.exercises.push(userEsxercisetoAdd[0]);
    });
    showToastWithGravity();
  };
  return (
    <View className="flex flex-row justify-center  items-center mx-4 my-2   ">
      <Link href={`search/${item.name}`} asChild>
        <Pressable className="flex-1 ">
          <Text className="text-white text-2xl">{item.name}</Text>
          <Text className="text-gray-300 ">
            {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
          </Text>
        </Pressable>
      </Link>
      <Pressable
        className={`mr-2  `}
        onPress={createExercise}
        disabled={currentValue.id === "" ? true : false}
      >
        <View className="bg-secondary-100 m-1 p-2 rounded-xl border border-accent">
          <Image
            source={icons.plus}
            className="w-10 h-10   "
            resizeMode="contain"
            tintColor={"black"}
          ></Image>
        </View>
      </Pressable>
    </View>
  );
};
