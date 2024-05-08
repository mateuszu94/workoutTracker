import React, { useState } from "react";
import {
  Alert,
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
import CustomButton from "./CustomButton";
import FormField from "./FormField";
import { Exercise } from "../models/Exercise";

interface WorkoutListItemProps {
  item: UserExercise;
  workout: Workout | null;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ item, workout }) => {
  const realm = useRealm();
  const userExercises = useQuery(Exercise);
  const [open, setOpen] = useState(false);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      `Ćwiczenie Zostało dodane ${reps} powtórzeń 
       ${item.name}  o wadze ${weight}kg`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
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
  };
  const addCurrentExercis = () => {
    if (!item) {
      return;
    }
    if (reps === "") {
      return Alert.alert("Podaj Liczbę powtóżeń  !");
    }
    if (weight === "") {
      return Alert.alert("Podaj wagę ciężaru  !");
    }
    realm.write(() => {
      realm.create(Exercise, {
        name: item.name,
        weight: Number(weight),
        repetitions: Number(reps),
      });
      const userEsxercisetoAdd = userExercises.filter(
        (userExercise) => userExercise.name === item.name
      );
      item.exercise.push(userEsxercisetoAdd[userEsxercisetoAdd.length - 1]);
      setOpen(false);
      showToastWithGravity();
    });
  };
  const handleOpen = () => {
    setOpen(!open);
    setReps("");
    setWeight("");
  };
  const hendleRepsChange = (e: string) => {
    setReps(e);
  };
  const hendleWeightChange = (e: string) => {
    setWeight(e);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={handleOpen}
      >
        <View className="relative bg-primary w-full h-full  items-center justify-center">
          <Pressable className="absolute top-10 right-10" onPress={handleOpen}>
            <AntDesign name="closecircle" size={40} color="white" />
          </Pressable>
          <FormField
            title="Ilość powtórzeń"
            value={reps}
            handleChangeText={hendleRepsChange}
            keyboardType="numeric"
          />
          <FormField
            title="Waga"
            value={weight}
            handleChangeText={hendleWeightChange}
            keyboardType="numeric"
          />
          <CustomButton
            containerStyles="w-[90%] border border-accent mt-4"
            title={"Dodaj "}
            hendlePress={addCurrentExercis}
          />
        </View>
      </Modal>
      <Link href={`search/${item.name}`} asChild className="mb-4">
        <Pressable>
          <Text className="text-white text-xl p-2">{item.name}</Text>
        </Pressable>
      </Link>
      <View className="w-full flex flex-row mb-4 items-center justify-center gap-5">
        <TouchableOpacity
          className={`w-[45%] items-center justify-center p-1 bg-secondary-200 rounded-xl border border-accent `}
          onPress={handleOpen}
          disabled={false}
        >
          <AntDesign name="plussquare" size={35} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutListItem;
