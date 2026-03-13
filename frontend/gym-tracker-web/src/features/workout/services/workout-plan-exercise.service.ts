// services/workoutType.service.ts
import apiClient from '@/shared/services/apiGymTracker';
import type { CreateWorkoutPlanExerciseResponseDto } from '../dto/workout-plan-exercise/create-workout-plan-exercise-response.dto';
import type { CreateWorkoutPlanExerciseRequestDto } from '../dto/workout-plan-exercise/create-workout-plan-exercise-request.dto';

export const workoutPlanExerciseService = {
    create: async (workoutTypeId: string, workoutPlanId: string, data: CreateWorkoutPlanExerciseRequestDto): Promise<CreateWorkoutPlanExerciseResponseDto> => {
        const response = await apiClient.post<CreateWorkoutPlanExerciseResponseDto>(
            `/me/workout-type/${workoutTypeId}/workout-plan/${workoutPlanId}/exercise`,
            data
        );
        return response.data;
    },
};