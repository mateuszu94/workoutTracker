import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  Alert,
} from "react-native";
import { icons } from "@/constants";
import { useState } from "react";
import { router, usePathname } from "expo-router";

interface SerchInputProps {
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

const SerchInput: React.FC<SerchInputProps> = ({
  placeholder,
  keyboardType,
}) => {
  const pathname = usePathname();
  const [query, setquery] = useState("");
  return (
    <View
      className="w-full h-16 border-2 border-accent rounded-xl
         focus:border-secondary-100 bg-black-100 items-center flex-row space-x-4"
    >
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => setquery(e)}
        keyboardType={keyboardType}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Proszę podaj tekst, abyśmy mogli znaleźć odpowiednie ćwiczenie."
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SerchInput;
