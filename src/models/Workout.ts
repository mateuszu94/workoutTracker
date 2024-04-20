import { BSON, Realm } from "realm";

import { UserExercise } from "./userExercise";

export class Workout extends Realm.Object<Workout> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  user: string = "";
  name!: string;
  createdAt: Date = new Date();
  exercises?: UserExercise[];
  static primaryKey = "_id";
}
