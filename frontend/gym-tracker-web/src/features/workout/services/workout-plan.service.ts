import apiClient from '@/shared/services/apiGymTracker';
import type { CreateWorkoutPlanResponseDto } from '../dto/workout-plan/create-workout-plan.response.dto';
import type { WorkoutPlanRequestDto } from '../dto/workout-plan/create-workout-plan.request.dto';

export const workoutPlanService = {
    create: async (workoutTypeId: string, data: WorkoutPlanRequestDto): Promise<CreateWorkoutPlanResponseDto> => {
        const response = await apiClient.post<CreateWorkoutPlanResponseDto>(
            `/me/workout-type/${workoutTypeId}/workout-plan/`,
            data
        );
        return response.data;
    },

    delete: async (workoutTypeId: string, idWorkoutPlan: string): Promise<void> => {
        await apiClient.delete(
            `/me/workout-type/${workoutTypeId}/workout-plan/${idWorkoutPlan}`,
        );
    },

    update: async (workoutTypeId: string, workoutPlanId: string, data: WorkoutPlanRequestDto): Promise<CreateWorkoutPlanResponseDto[]> => {
        const response = await apiClient.put<CreateWorkoutPlanResponseDto[]>(
            `/me/workout-type/${workoutTypeId}/workout-plan/${workoutPlanId}`,
            data
        );
        return response.data;
    },
};