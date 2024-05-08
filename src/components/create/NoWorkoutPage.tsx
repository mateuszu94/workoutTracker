import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CustomButton from "../CustomButton";
interface NoWorkoutPageProps {
  setModalVisible: any;
}

const NoWorkoutPage: React.FC<NoWorkoutPageProps> = ({ setModalVisible }) => {
  return (
    <View className=" justify-center w-full h-full">
      <View className="flex flex-col items-center   ">
        <Text className="font-bold text-white text-2xl mb-6 ">
          {" "}
          Nie znaleźiono Treningów{" "}
        </Text>
        <MaterialCommunityIcons
          name="clipboard-off-outline"
          size={130}
          color="white"
        />
        <CustomButton
          containerStyles="w-[50%] border border-accent mt-4"
          title={"Dodaj "}
          hendlePress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Text className="text-gray-400 mt-2 text-center">
        Dodaj swój pierwszy trening i zacznij monitorować progres
      </Text>
    </View>
  );
};

export default NoWorkoutPage;
