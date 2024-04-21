import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useQuery, useRealm } from "@realm/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Workout } from "@/src/models/Workout";
import { UserExercise } from "@/src/models/userExercise";
import WorkoutListItem from "@/src/components/WorkoutListItem";
import { Dropdown } from "react-native-element-dropdown";

const Workouts = () => {
  const realm = useRealm();
  let userWorkout = useQuery(Workout);
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const userExercises = useQuery(UserExercise);
  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  let data = [{ label: "", value: "" }];
  if (userWorkout.length !== 0) {
    data = [];
    userWorkout.map((workout, index) => {
      data.push({ label: workout.name, value: String(index) });
    });
  }
  const handleWorkoutSelectedChange = (e: string) => {
    setValue(e);
  };
  const currentWorkout = userWorkout[Number(value)];
  const flatListdata = currentWorkout.exercises;

  return (
    <SafeAreaView className="w-full h-full bg-primary ">
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
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={flatListdata}
        keyExtractor={(userWorkout, index) => userWorkout.name + index}
        renderItem={({ item }) => (
          <WorkoutListItem item={item} workout={currentWorkout} />
        )}
      />
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
