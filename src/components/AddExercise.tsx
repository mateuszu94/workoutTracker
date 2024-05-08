import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import exercises from "@/assets/data/exercises.json";
import { ExerciseListItem } from "./ExerciseListItem";
import { useState } from "react";
import FormField from "./FormField";

interface AddExerciseProps {
  setModalVisible: any;
  modalVisible: any;
  currentValue: { name: string; id: any };
}

const AddExercise: React.FC<AddExerciseProps> = ({
  setModalVisible,
  modalVisible,
  currentValue,
}) => {
  const data = exercises;
  const [text, setText] = useState("");

  const hendleWorkoutNameChange = (e: string) => {
    setText(e);
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
        <Text className="text-white">Dodaj Ćwiczenie</Text>

        <FormField
          value={text}
          handleChangeText={hendleWorkoutNameChange}
          title="Znajdz"
        />
        <ScrollView className="w-full h-[70%]">
          {data
            .filter((item) => {
              const serchText = text.toLocaleLowerCase();
              return (
                serchText === "" ||
                item.name
                  .toLocaleLowerCase()
                  .includes(text.toLocaleLowerCase()) ||
                item.muscle
                  .toLocaleLowerCase()
                  .includes(text.toLocaleLowerCase()) ||
                item.equipment
                  .toLocaleLowerCase()
                  .includes(text.toLocaleLowerCase())
              );
            })
            .map((item) => (
              <ExerciseListItem currentValue={currentValue} item={item} />
            ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
export default AddExercise;
