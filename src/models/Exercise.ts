import { BSON, Realm } from "realm";

export class Exercise extends Realm.Object<Exercise> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  createdAt: Date = new Date();
  weight!: number;
  repetitions!: number;
  userExercise: string = "";
  static primaryKey = "_id";
}
