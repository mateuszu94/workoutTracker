import { View, Text } from "react-native";

interface ExerciseRepContainerProps {
  item: {
    name: string;
    muscle: string;
  };
}
const ExerciseRepContainer: React.FC<ExerciseRepContainerProps> = ({
  item,
}) => {
  return (
    <View className=" w-full m-4">
      <Text className="text-2xl text-white ">{item.name}</Text>
    </View>
  );
};

export default ExerciseRepContainer;
