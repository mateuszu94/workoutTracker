import { BSON, Realm } from "realm";
import { Exercise } from "./Exercise";

export class UserExercise extends Realm.Object<UserExercise> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  createdAt: Date = new Date();
  muscle!: string;
  instructions!: string;
  url: string = "";
  exercises: Exercise[] = [];
  equipment!: string;

  static primaryKey = "_id";
}
