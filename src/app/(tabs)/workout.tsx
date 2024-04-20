import { FlatList } from "react-native";
import React from "react";
import { useQuery } from "@realm/react";
import { UserExercise } from "@/src/models/userExercise";
import ExerciseRepContainer from "@/src/components/ExerciseRepContainer";
import { SafeAreaView } from "react-native-safe-area-context";

const Workout = () => {
  const userExercises = useQuery(UserExercise);
  return (
    <SafeAreaView className="w-full h-full bg-primary ">
      <FlatList
        data={userExercises}
        keyExtractor={(userExercises) => userExercises.name}
        renderItem={({ item }) => <ExerciseRepContainer item={item} />}
      />
    </SafeAreaView>
  );
};

export default Workout;
