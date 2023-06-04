import { Exercise, Set } from "@prisma/client";

export type ExerciseAndSet = Exercise & { sets: Set[] }
