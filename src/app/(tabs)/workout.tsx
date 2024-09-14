import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useQuery, useRealm } from "@realm/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Workout } from "@/src/models/Workout";

import WorkoutListItem from "@/src/components/WorkoutListItem";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { UserExercise } from "@/src/models/userExercise";

const Workouts = () => {
  let userWorkout = useQuery(Workout);
  let useExercise = useQuery(UserExercise);
  console.log(useExercise[0]);

  const realm = useRealm();
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  let data = [{ label: "", value: "" }];
  if (userWorkout.length !== 0) {
    data = [];
    userWorkout.map((workout, index) => {
      data.push({ label: workout.name, value: String(index) });
    });
  }
  const currentWorkout = userWorkout[Number(value)];
  const flatListdata = currentWorkout.exercises;

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const deleteWorkout = () => {
    if (currentWorkout) {
      realm.write(() => {
        realm.delete(currentWorkout);
      });
    }
  };
  const handleWorkoutSelectedChange = (e: string) => {
    setValue(e);
  };

  return (
    <SafeAreaView className="w-full h-full bg-primary ">
      {userWorkout.length !== 0 ? (
        <>
          <View className="w-full flex flex-row  items-center">
            <Text className="text-3xl w-1/2 text-gray-200 p-2">Trenning</Text>
            <View className="w-1/2 items-end pr-3">
              <TouchableOpacity
                onPress={deleteWorkout}
                className="w-1/3 bg-secondary-100 rounded-xl items-center justify-center p-2"
              >
                <FontAwesome name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="my-2">
            <Dropdown
              style={styles.dropdown}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={data[0].label}
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                handleWorkoutSelectedChange(item.value);
              }}
            />
          </View>
          <FlatList
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={flatListdata}
            keyExtractor={(userWorkout, index) => userWorkout.name + index}
            renderItem={({ item }) => (
              <WorkoutListItem item={item} workout={currentWorkout} />
            )}
          />
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Workouts;
const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 24,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  dropdown: {
    backgroundColor: "#161622",
    marginTop: 10,
    height: 30,
    borderColor: "#5F5D9C",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    left: 0,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 24,
  },
});
