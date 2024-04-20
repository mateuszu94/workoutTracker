import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Workout } from "../models/Workout";
import { useQuery } from "@realm/react";

interface DropDownSelectProps {
  onAddNew?: any;

  currentValue: { name: string; id: any };
  className?: string;
  setCurrentValue: any;
}
const DropDownSelect: React.FC<DropDownSelectProps> = ({
  onAddNew,

  currentValue,
  setCurrentValue,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const userWorkout = useQuery(Workout);
  const onItemPress = (name: string, id: any) => {
    setCurrentValue({ name: name, id: id });
    setOpen(false);
  };
  const addNew = () => {
    onAddNew();
    setOpen(false);
  };
  return (
    <View
      className={
        `w-full border border-accent rounded-2xl p-2 relative ` + { className }
      }
    >
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="flex flex-row items-center justify-center relative"
      >
        <View>
          <Text className="text-2xl text-gray-300">{currentValue.name}</Text>
        </View>
        <View className="absolute right-5">
          <AntDesign name="down" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <Modal
        className=" bg-white opacity-5 pointer-events-none"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View className="relative  1/2 h-1/2 top-[18%]">
          <View className="w-full border bg-primary border-accent rounded-2xl">
            <TouchableOpacity onPress={addNew}>
              <Text className="text-2xl text-gray-300 p-2 ">Dodaj Nowy + </Text>
            </TouchableOpacity>

            {userWorkout.map((item) => (
              <TouchableOpacity
                onPress={() => onItemPress(item.name, item._id)}
                key={item.name}
              >
                <View className="border-t border-accent"></View>
                <Text className="text-2xl text-gray-300 p-2 ">{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="text-2xl border-t p-2 border-accent pr-2 text-gray-300 "
            >
              <View className="ml-80">
                <AntDesign name="up" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownSelect;
