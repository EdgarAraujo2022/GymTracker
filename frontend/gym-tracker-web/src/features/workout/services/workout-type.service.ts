// services/workoutType.service.ts
import apiClient from '@/shared/services/apiGymTracker';
import type { WorkoutManagerDtoRequest } from '../dto/workout-manager/workout-manager-request.dto';
import type { WorkoutTypeDtoResponse } from '../dto/workout-type/workout-type-response.dto';
import type { ExerciseTypeRequestDto } from '../dto/exercise-type/create-exercise-type-request.dto';
import type { ExerciseTypeResponseDto } from '../dto/exercise-type/exercise-type-response.dto';
import type { CreateWorkoutTypeResponseDto } from '../dto/workout-type/create-workout-type-response.dto';

export const workoutTypeService = {
  create: async (data: ExerciseTypeRequestDto): Promise<CreateWorkoutTypeResponseDto> => {
    const response = await apiClient.post<CreateWorkoutTypeResponseDto>(
      `/me/workout-type`,
      data
    );
    return response.data;
  },

  update: async (workoutTypeId: string, data: ExerciseTypeRequestDto): Promise<ExerciseTypeResponseDto[]> => {
    const response = await apiClient.put<ExerciseTypeResponseDto[]>(
      `/me/workout-type/${workoutTypeId}`,
      data
    );
    return response.data;
  },

  delete: async (workoutTypeId: string): Promise<void> => {
    await apiClient.delete(
      `/me/workout-type/${workoutTypeId}`,
    );
  },
};