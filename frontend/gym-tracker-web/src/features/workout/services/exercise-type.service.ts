// services/workoutType.service.ts
import apiClient from '@/shared/services/apiGymTracker';
import type { ExerciseTypeResponseDto } from '../dto/exercise-type/exercise-type-response.dto';

export const exerciseTypeService = {
    getAll: async (): Promise<ExerciseTypeResponseDto[]> => {
        const response = await apiClient.get<ExerciseTypeResponseDto[]>(
            '/exercise-type'
        );
        return response.data;
    },

};