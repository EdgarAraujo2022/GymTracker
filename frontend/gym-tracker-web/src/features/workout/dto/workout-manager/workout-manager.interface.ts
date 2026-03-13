export interface ExerciseSet {
  id: string;
  sets: number;
  reps: number;
  rest: number;
  muscle: string;
  weight: number;
  order?: number;
}

export interface Exercise {
  id: string;
  name: string;
  exerciseTypeId: string;
  workoutPlanExerciseId: string;
  sets: ExerciseSet;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  expanded: boolean;
}

export interface WorkoutType {
  id: string;
  name: string;
  description: string;
  status: boolean;
  workouts: Workout[];
  expanded: boolean;
}