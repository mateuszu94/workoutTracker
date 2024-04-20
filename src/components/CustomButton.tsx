import { TouchableOpacity, Text } from "react-native";

interface TabIconProps {
  hendlePress: any;
  title: string;
  isLoading?: boolean;
  containerStyles?: string;
  TextStyles?: string;
}

const CustomButton: React.FC<TabIconProps> = ({
  TextStyles,
  isLoading,
  title,
  hendlePress,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={hendlePress}
      activeOpacity={0.7}
      className={`bg-secondary p-3 justify-center items-center rounded-xl min-h-[62px] ${containerStyles}
      ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-primary  font-psemibold text-lg ${TextStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
