
export interface ExerciseSetDto {
    id: string;
    sets: number;
    reps: number;
    rest: number;
    weight: number;
    muscle: string;
    order: number;
}

export interface ExerciseDto {
    id: string;
    name: string;
    exerciseTypeId: string;
    workoutPlanExerciseId: string;
    sets: ExerciseSetDto; 
}

export interface WorkoutDto {
    id: string;
    name: string;
    description?: string;
    exercises: ExerciseDto[];
}

export interface WorkoutManagerResponseDto {
    id: string;
    name: string;
    description: string;
    status: boolean;
    workouts: WorkoutDto[];
}

export interface WorkoutManageDtoResponse {
    id: string;
    name: string;
    description: string;
    status: boolean;
    workouts: Array<{
        id: string;
        name: string;
        description?: string;
        exercises: Array<{
            id: string;
            name: string;
            exerciseTypeId: string;
            workoutPlanExerciseId: string;
            sets: {
                id: string;
                sets: number;
                reps: number;
                rest: number;
                weight: number;
                muscle: string;
                order: number;
            };
        }>;
    }>;
}