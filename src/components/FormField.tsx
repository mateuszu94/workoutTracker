import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  otherStyles?: string;
  handleChangeText: any;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
}) => {
  const [showEntry, setShowEntry] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-pmedium">{title}</Text>
      <View
        className="w-full h-16 border-2 border-accent rounded-xl
       focus:border-secondary-100 bg-black-100 items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Hasło" && !showEntry}
          keyboardType={keyboardType}
        />
        {title === "Hasło" && (
          <TouchableOpacity onPress={() => setShowEntry(!showEntry)}>
            <Image
              className="w-6 h-6 mr-3"
              resizeMode="contain"
              source={!showEntry ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
