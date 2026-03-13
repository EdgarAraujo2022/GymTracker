// services/workoutType.service.ts
import apiClient from '@/shared/services/apiGymTracker';
import type { ExerciseResponseDto } from '../dto/exercise/exercise-response.dto';
import type { CreateExerciseResponseDto } from '../dto/exercise/create-exercise-response.dto';
import type { CreateExerciseRequestDto } from '../dto/exercise/create-exercise-request.dto';


export const exerciseService = {
    getAll: async (exerciseTypeId: string): Promise<ExerciseResponseDto[]> => {
        const response = await apiClient.get<ExerciseResponseDto[]>(
            `/exercise-type/${exerciseTypeId}/exercise`,
        );
        return response.data;
    },

    create: async (exerciseTypeId: string, dataExercise: CreateExerciseRequestDto): Promise<CreateExerciseResponseDto[]> => {
        const response = await apiClient.post<CreateExerciseResponseDto[]>(
            `/exercise-type/${exerciseTypeId}/exercise`,
            dataExercise
        );
        return response.data;
    },

    delete: async (workoutTypeId: string, workoutPlanId: string,exerciseId: string): Promise<void> => {
        await apiClient.delete(
            `/me/workout-type/${workoutTypeId}/workout-plan/${workoutPlanId}/exercise/${exerciseId}`,
        );
    }
};