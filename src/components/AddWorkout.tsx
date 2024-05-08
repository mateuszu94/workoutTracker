import { AntDesign } from "@expo/vector-icons";

import { Alert, Modal, Pressable, View } from "react-native";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { Workout } from "../models/Workout";
import { useRealm } from "@realm/react";
import { useState } from "react";
interface AddWorkoutProps {
  setModalVisible: any;
  modalVisible: any;
}

const AddWorkout: React.FC<AddWorkoutProps> = ({
  setModalVisible,
  modalVisible,
}) => {
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
    }
  };
  return (
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
          containerStyles="w-[80%] border border-accent mt-4"
          title={"Dodaj +"}
          hendlePress={addWorkout}
        />
      </View>
    </Modal>
  );
};
export default AddWorkout;
