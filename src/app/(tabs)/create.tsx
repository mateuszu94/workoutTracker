import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@realm/react";
import { Workout } from "@/src/models/Workout";
import { useState } from "react";
import AddWorkout from "@/src/components/AddWorkout";
import NoWorkoutPage from "@/src/components/create/NoWorkoutPage";
import TrenningDropdown from "@/src/components/create/TrenningDropdown";
import { View } from "react-native";

const Create = () => {
  const userWorkout = useQuery(Workout);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="w-full  bg-primary h-full  text-black-100">
      <AddWorkout
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      {userWorkout.length === 0 ? (
        <NoWorkoutPage setModalVisible={setModalVisible} />
      ) : (
        <View>
          <TrenningDropdown setModalVisible={setModalVisible} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Create;
