import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import exercises from "../../assets/data/exercises.json";
import { ExerciseListItem } from "../components/ExerciseListItem";
import { Stack } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Ćwiczenia` }} />
      <FlatList
        contentContainerStyle={{ gap: 5 }}
        data={exercises}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
  },
});
