import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants";
import { useObject, useQuery, useRealm } from "@realm/react";
import { UserExercise } from "../models/userExercise";
import { Workout } from "../models/Workout";
import { BSON } from "realm";

interface ExerciseListItemProps {
  userWorkout: any;
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
  userWorkout,
  currentValue,
}) => {
  const userExercise = useQuery(UserExercise);
  const realm = useRealm();
  const createExercise = () => {
    if (currentValue.id === "") {
      return;
    }
    const workout = useObject<Workout>(
      Workout,
      new BSON.ObjectID(currentValue.id as string)
    );
    realm.write(() => {
      if (userExercise.length === 0) {
        realm.create(UserExercise, {
          name: item.name,
          muscle: item.muscle,
          instructions: item.instructions,
          equipment: item.equipment,
        });
      }
    });
  };
  return (
    <View className="flex flex-row justify-center items-center m-2   ">
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
        disabled={userWorkout.length === 0 ? true : false}
      >
        <Image
          source={icons.plus}
          className="w-10 h-10  "
          resizeMode="contain"
          tintColor={userWorkout.length === 0 ? "#CE081D" : "#29CE08"}
        ></Image>
      </Pressable>
    </View>
  );
};
