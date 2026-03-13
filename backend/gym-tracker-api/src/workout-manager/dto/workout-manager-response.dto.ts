export class ExerciseSetDto {
    id: string;
    order: number;
    sets: number;
    reps: number;
    rest: number;
    weight: number;
    muscle: string;
}

export class ExerciseDto {
    id?: string;
    name: string;
    sets: ExerciseSetDto;
}

export class WorkoutPlanDto {
    id: string;
    name: string;
    description?: string;
    exercises: ExerciseDto[];
}

export class WorkoutManagerResponseDto {
    id: string;
    name: string;
    description?: string;
    workouts: WorkoutPlanDto[];
}

  