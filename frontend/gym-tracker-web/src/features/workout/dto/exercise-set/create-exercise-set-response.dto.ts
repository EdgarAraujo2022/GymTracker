export interface CreateExerciseSetResponseDto {
    id: string; 
    workoutPlanExerciseId: string;
    sets: number;
    weight: number;
    reps: number;
    order: number;
    createdAt: string;

}