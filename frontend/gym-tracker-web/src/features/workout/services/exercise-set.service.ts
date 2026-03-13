import apiClient from '@/shared/services/apiGymTracker';
import type { CreateExerciseSetRequestDto } from '../dto/exercise-set/create-exercise-set-request.dto';
import type { CreateExerciseSetResponseDto } from '../dto/exercise-set/create-exercise-set-response.dto';

export const exerciseSetService = {
    create: async (workoutTypeId: string, workoutPlanId: string, exerciseId: string, data: CreateExerciseSetRequestDto): Promise<CreateExerciseSetResponseDto> => {
        const response = await apiClient.post<CreateExerciseSetResponseDto>(
            `/me/workout-type/${workoutTypeId}/workout-plan/${workoutPlanId}/exercise/${exerciseId}/set`,
            data
        );
        return response.data;
    },

    update: async (workoutTypeId: string, workoutPlanId: string, exerciseId: string, exerciseSetId: string, data: CreateExerciseSetRequestDto): Promise<CreateExerciseSetResponseDto[]> => {
        const response = await apiClient.put<CreateExerciseSetResponseDto[]>(
            `/me/workout-type/${workoutTypeId}/workout-plan/${workoutPlanId}/exercise/${exerciseId}/set/${exerciseSetId}`,
            data
        );
        return response.data;
    },
};