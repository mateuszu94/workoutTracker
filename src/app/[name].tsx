import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";

export default function ExerciseDetailsScrean() {
  const params = useLocalSearchParams();
  const exercise = exercises.find((i) => i.name === params.name);
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

  if (!exercise) {
    return <Text>Nie znaleziono Ćwiczenia</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: `${params.name}` }} />
      <View style={styles.dispaly}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          <Text>{exercise.muscle}</Text> | <Text>{exercise.equipment}</Text>
        </Text>
      </View>
      <View style={styles.dispaly}>
        <Text numberOfLines={isInstructionExpanded ? 0 : 3}>
          {exercise.instructions}
        </Text>
        <Text
          onPress={() => {
            setIsInstructionExpanded(!isInstructionExpanded);
          }}
          style={{ padding: 10, alignSelf: "center", fontWeight: "500" }}
        >
          {isInstructionExpanded === false ? "Zobacz Więcej " : "Zobacz Mniej"}
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  dispaly: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  container: {
    padding: 10,
    gap: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
    gap: 5,
  },
});
