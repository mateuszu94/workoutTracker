import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants";
import { useRealm } from "@realm/react";
import { UserExercise } from "../models/userExercise";

interface ExerciseListItemProps {
  userWorkout: any;
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
}) => {
  const realm = useRealm();
  const createExercise = () => {
    realm.write(() => {
      realm.create(UserExercise, {
        name: item.name,
        muscle: item.muscle,
        instructions: item.instructions,
        equipment: item.equipment,
      });
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
