import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import exercises from "./assets/data/exercises.json";

export default function App() {
  const exersise = exercises[0];

  return (
    <View style={styles.container}>
      <View style={styles.exerciseCointeiner}>
        <Text style={styles.exercisesName}>{exersise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          {exersise.muscle.toUpperCase()} | {exersise.equipment.toUpperCase()}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  exercisesName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {},
  exerciseCointeiner: {
    backgroundColor: "gainsboro",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
});
