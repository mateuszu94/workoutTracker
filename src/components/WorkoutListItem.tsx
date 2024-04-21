import React from "react";
import { Pressable, Text, View } from "react-native";
import { UserExercise } from "../models/userExercise";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Workout } from "../models/Workout";
import { useRealm } from "@realm/react";

interface WorkoutListItemProps {
  item: UserExercise;
  workout: Workout;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ item, workout }) => {
  const realm = useRealm();

  const deleteExercise = () => {
    if (!workout) {
      return;
    }
    realm.write(() => {
      let indexToDelete = workout.exercises.indexOf(item);

      if (indexToDelete !== -1) {
        workout.exercises.remove(indexToDelete);
      }
    });
  };

  return (
    <View>
      <Link href={`search/${item.name}`} asChild className="mb-4">
        <Pressable>
          <Text className="text-white text-xl">{item.name}</Text>
        </Pressable>
      </Link>
      <View className="w-full flex flex-row mb-4 items-center justify-center gap-5">
        <Pressable
          className={`w-[45%] items-center justify-center p-1 bg-secondary-200 rounded-xl border border-accent `}
          onPress={deleteExercise}
          disabled={false}
        >
          <AntDesign name="plussquare" size={35} color="black" />
        </Pressable>

        <Pressable
          className={`w-[45%]  items-center justify-center p-1 bg-secondary-200  border border-accent rounded-xl `}
          onPress={deleteExercise}
          disabled={false}
        >
          <AntDesign
            className="w-full"
            name="minussquare"
            size={35}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default WorkoutListItem;
