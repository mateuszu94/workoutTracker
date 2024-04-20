import { View, Text, FlatList, Modal, Pressable, Alert } from "react-native";

import { ExerciseListItem } from "@/src/components/ExerciseListItem";
import exercises from "../../../assets/data/exercises.json";
import { SafeAreaView } from "react-native-safe-area-context";
import SerchInput from "@/src/components/SearchInput";
import { useQuery, useRealm } from "@realm/react";
import { Workout } from "@/src/models/Workout";
import CustomButton from "@/src/components/CustomButton";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import FormField from "@/src/components/FormField";

const Create = () => {
  const userWorkout = useQuery(Workout);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const realm = useRealm();

  const hendleWorkoutNameChange = (e: string) => {
    setWorkoutName(e);
  };
  const addWorkout = () => {
    if (workoutName === "") Alert.alert("Trenning musi mieć nawę !");
    else {
      realm.write(() => {
        realm.create(Workout, {
          name: workoutName,
        });
      });
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView className="w-full  bg-primary  h-full text-black-100">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="relative bg-primary w-full h-full  items-center justify-center">
          <Pressable
            className="absolute top-10 right-10"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="closecircle" size={40} color="white" />
          </Pressable>
          <FormField
            title="Nazwa Trenningu"
            value={workoutName}
            handleChangeText={hendleWorkoutNameChange}
          />
          <CustomButton
            containerStyles="w-[90%] border border-accent mt-4"
            title={"Dodaj "}
            hendlePress={addWorkout}
          />
        </View>
      </Modal>
      <FlatList
        data={exercises}
        keyExtractor={(exercises) => exercises.name}
        renderItem={({ item }) => (
          <ExerciseListItem
            item={item}
            userWorkout={userWorkout}
          ></ExerciseListItem>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View className="w-full">
                {userWorkout.length === 0 ? (
                  <View>
                    <CustomButton
                      containerStyles="w-[90%] border border-accent"
                      title={"Dodaj Trenning +"}
                      hendlePress={() => setModalVisible(true)}
                    />
                    <Text className="pt-2 text-gray-400">
                      Dodaj trening aby zacząć dodawać ćwiczenia
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="font-pmedium text-2xl text-gray-100">
                      Dodaj ćwiczenia
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <SerchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Create;
