import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useObject, useQuery, useRealm } from "@realm/react";
import { Workout } from "@/src/models/Workout";
interface CreateListHedderProps {
  setModalVisible: (visible: boolean) => void;
  setCurrentValue: any;
  currentValue: any;
}

const CreateListHedder: React.FC<CreateListHedderProps> = ({
  setModalVisible,
  setCurrentValue,
  currentValue,
}) => {
  const userWorkout = useQuery(Workout);
  let data = [{ label: "", value: "" }];
  data = [];
  userWorkout.map((workout) => {
    data.push({ label: workout.name, value: workout.name });
  });
  const currentWorkout = useObject(Workout, currentValue.id);
  const realm = useRealm();
  const deleteWorkout = () => {
    {
      realm.write(() => {
        realm.delete(currentWorkout);
      });
    }
  };

  const handleWorkoutSelectedChange = (e: string) => {
    const index = userWorkout.findIndex((obj) => obj.name.trim() === e);
    setCurrentValue({
      name: userWorkout[index].name,
      id: userWorkout[index]._id,
    });
  };
  return (
    <View className="mb-4">
      <View className="flex flex-row items-center p-6 gap-1 ">
        <Text className="w-1/2 font-pmedium text-2xl  text-gray-100">
          Trenning
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="w-1/4 bg-secondary-100 rounded-xl items-center justify-center p-2"
        >
          <AntDesign name="plussquareo" color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteWorkout}
          className="w-1/4 bg-secondary-100 rounded-xl items-center justify-center p-2"
        >
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mx-4">
        <Dropdown
          style={styles.dropdown}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={"Dodaj lub wybież Trenning"}
          searchPlaceholder="Search..."
          value={currentValue.name}
          onChange={(item) => {
            handleWorkoutSelectedChange(item.value);
          }}
        />
      </View>
    </View>
  );
};

export default CreateListHedder;
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
