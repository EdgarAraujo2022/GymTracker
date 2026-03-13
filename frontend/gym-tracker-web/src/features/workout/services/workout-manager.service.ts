// services/workoutType.service.ts
import apiClient from '@/shared/services/apiGymTracker';
import type { WorkoutManagerDtoRequest } from '../dto/workout-manager/workout-manager-request.dto';
import type { WorkoutManagerResponseDto } from '../dto/workout-manager/workout-manager-response.dto';
import type { WorkoutTypeDtoResponse } from '../dto/workout-type/workout-type-response.dto';

export const workoutManagerService = {
  // GET - Buscar todos
  getAll: async (): Promise<WorkoutManagerResponseDto[]> => {
    const response = await apiClient.get<WorkoutManagerResponseDto[]>(
      '/me/workout-manager' 
    );
    return response.data;
  },

  // // GET - Buscar por ID
  // getById: async (id: string): Promise<WorkoutTypeDtoResponse> => {
  //   const response = await apiClient.get<WorkoutTypeDtoResponse>(
  //     `/me/workouttype/${id}`
  //   );
  //   return response.data;
  // },

//   // POST - Criar novo
//   create: async (data: WorkoutTypeDtoRequest): Promise<WorkoutTypeDtoResponse> => {
//     const response = await http.post<WorkoutTypeDtoResponse>(
//       '/me/exercisetype',
//       data
//     );
//     return response.data;
//   },

//   // PUT - Atualizar
  update: async (id: number, data: WorkoutManagerDtoRequest): Promise<WorkoutTypeDtoResponse> => {
    const response = await apiClient.put<WorkoutTypeDtoResponse>(
      `/me/exercisetype/${id}`,
      data
    );
    return response.data;
  },

//   // DELETE - Remover
//   delete: async (id: number): Promise<void> => {
//     await http.delete(`/me/exercisetype/${id}`);
//   }
};