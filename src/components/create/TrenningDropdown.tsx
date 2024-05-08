import { Workout } from "@/src/models/Workout";

import { useObject, useQuery } from "@realm/react";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import exercises from "@/assets/data/exercises.json";
import { ExerciseListItem } from "../ExerciseListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateListHedder from "./CreateListHedder";
import WorkoutListItem from "../WorkoutListItem";
import AddExercise from "../AddExercise";
import CustomButton from "../CustomButton";

interface TrenningDropdownProps {
  setModalVisible: any;
}

const TrenningDropdown: React.FC<TrenningDropdownProps> = ({
  setModalVisible,
}) => {
  const userWorkout = useQuery(Workout);

  const [currentValue, setCurrentValue] = useState({
    name: userWorkout[0].name,
    id: userWorkout[0]._id,
  });
  const [addExerciseVisible, setAddExerciseVisible] = useState(false);
  const currentWorkout = useObject(Workout, currentValue.id);
  const flatListdata = currentWorkout?.exercises;
  const hendlleaddExerciseVisiblePress = () => {
    setAddExerciseVisible(true);
  };

  let data = [{ label: "", value: "" }];
  data = [];
  userWorkout.map((workout) => {
    data.push({ label: workout.name, value: workout.name });
  });
  return (
    <SafeAreaView>
      <View className="h-[30%]">
        <CreateListHedder
          setModalVisible={setModalVisible}
          setCurrentValue={setCurrentValue}
          currentValue={currentValue}
        />
      </View>
      <View className="w-full h-[20%]">
        <View className="flex flex-col items-center px-6 gap-1 ">
          <CustomButton
            containerStyles="w-[80%] m-4"
            title=" Dodaj Ćwiczenia +"
            hendlePress={hendlleaddExerciseVisiblePress}
          />
          <AddExercise
            currentValue={currentValue}
            setModalVisible={setAddExerciseVisible}
            modalVisible={addExerciseVisible}
          />
        </View>
      </View>
      {flatListdata?.length === 0 ? (
        <View className="w-full h-[50%] justify-center items-center">
          <Text className="text-white text-2xl text-center">
            Ten trenning nie pośiada żadnych ćwiczeń{" "}
          </Text>
        </View>
      ) : (
        <FlatList
          className="w-full h-[50%]"
          data={flatListdata}
          renderItem={({ item }) => (
            <WorkoutListItem workout={currentWorkout} item={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default TrenningDropdown;
