import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
interface ExerciseListItemProps {
  item: {
    name: string;
    muscle: string;
    equipment: string;
  };
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ item }) => {
  return (
    <Link href={`${item.name}`} asChild>
      <Pressable style={styles.exerciseCointeiner}>
        <Text style={styles.exercisesName}>{item.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  exercisesName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    fontSize: 10,
    color: "slategray",
  },
  exerciseCointeiner: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9,
    backgroundColor: "navajowhite",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
});
