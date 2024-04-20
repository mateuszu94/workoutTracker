import { PropsWithChildren } from "react";
import { RealmProvider } from "@realm/react";
import { Exercise } from "../models/Exercise";
import { UserExercise } from "../models/userExercise";
import { Workout } from "../models/Workout";

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return (
    <RealmProvider schema={[Exercise, UserExercise, Workout]}>
      {children}
    </RealmProvider>
  );
}
