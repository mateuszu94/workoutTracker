import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { UserExercise } from "../models/userExercise";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Workout } from "../models/Workout";
import { useQuery, useRealm } from "@realm/react";
import { icons } from "@/constants";
import Swipeble from "react-native-gesture-handler/Swipeable";
import { Exercise } from "../models/Exercise";

interface WorkoutListItemProps {
  item: UserExercise;
  workout: Workout | null;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ item, workout }) => {
  const realm = useRealm();
  const swipeableRef = useRef<Swipeble>(null);
  const userExercises = useQuery(Exercise);
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
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
    closeSwipeable();
  };
  const renderRightView = () => {
    return (
      <View className=" h-full justify-center items-center flex">
        <TouchableOpacity
          onPress={deleteExercise}
          className="flex items-center justify-center bg-red-600 w-14 h-14 rounded-2xl m-4 "
        >
          <AntDesign name="delete" color="black" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeble renderRightActions={() => renderRightView()} ref={swipeableRef}>
      <View>
        <Link href={`search/${item.name}`} asChild className="mb-4">
          <Pressable>
            <View className="flex flex-row p-3">
              <Image
                source={icons.biceps}
                className="w-12 h-12 bg-slate-400  rounded-full translate-x-5 translate-y-[-10px] z-30 "
              ></Image>
              <View className="bg-accent rounded-2xl w-[80%] p-2 ">
                <Text className="text-white text-xl text-center">
                  {item.name}
                </Text>
                <Text className="text-slate-400 text-xl px-2">
                  {item.equipment} / {item.muscle}
                </Text>
              </View>
            </View>
          </Pressable>
        </Link>
      </View>
    </Swipeble>
  );
};

export default WorkoutListItem;
