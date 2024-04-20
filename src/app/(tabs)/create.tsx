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
import DropDownSelect from "@/src/components/DropDownSelect";

const Create = () => {
  const userWorkout = useQuery(Workout);

  const [currentValue, setCurrentValue] = useState(
    userWorkout.length !== 0
      ? {
          name: userWorkout[0].name,
          id: userWorkout[0]._id,
        }
      : {
          name: "",
          id: "",
        }
  );
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
      setWorkoutName("");
      const newWorkout = userWorkout.filter(
        (workout) => workout.name === workoutName
      );
      setCurrentValue({
        name: newWorkout[0].name,
        id: newWorkout[0]._id,
      });
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
            userWorkout={userWorkout}
            item={item}
            currentValue={currentValue}
          ></ExerciseListItem>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row ">
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
                    <Text className="font-pmedium text-2xl m-2 text-gray-100">
                      Trenning
                    </Text>
                    <DropDownSelect
                      currentValue={currentValue}
                      setCurrentValue={setCurrentValue}
                      onAddNew={() => {
                        setModalVisible(true);
                      }}
                    />
                  </View>
                )}
              </View>
            </View>

            <Text className="font-pmedium text-2xl text-gray-100">
              Dodaj ćwiczenia
            </Text>
            <SerchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Create;
