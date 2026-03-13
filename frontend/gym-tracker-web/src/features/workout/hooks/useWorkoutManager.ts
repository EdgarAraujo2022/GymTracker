import { useState, useEffect } from 'react';
import { workoutManagerService } from '../services/workout-manager.service';
import type { WorkoutManageDtoResponse } from '../dto/workout-manager/workout-manager-response.dto';

export const useWorkoutManager = () => {

  const [workoutmanager, setWorkoutManager] = useState<WorkoutManageDtoResponse[]>([]);
  
  // const [selectedType, setSelectedType] = useState<WorkoutTypeDtoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    // const getWorkoutTypeById = async (id: string) => {
    //     setLoading(true);
    //     try {
    //         const data = await workoutManagerService.getById(id);
    //         setSelectedType(data);
    //         return data;
    //     } catch (err: any) {
    //         setError(err.message);
    //         throw err;
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // Buscar todos
      const fetchWorkoutTypes = async () => {
        setLoading(true);
        try {
          const data = await workoutManagerService.getAll();
          setWorkoutManager(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    //   // Criar novo
    //   const createWorkoutType = async (data: WorkoutTypeDtoRequest) => {
    //     setLoading(true);
    //     try {
    //       const newType = await workoutTypeService.create(data);
    //       setWorkoutTypes(prev => [...prev, newType]);
    //       return newType;
    //     } catch (err: any) {
    //       setError(err.message);
    //       throw err;
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   // Deletar
    //   const deleteWorkoutType = async (id: number) => {
    //     setLoading(true);
    //     try {
    //       await workoutTypeService.delete(id);
    //       setWorkoutTypes(prev => prev.filter(item => item.id !== id));
    //     } catch (err: any) {
    //       setError(err.message);
    //       throw err;
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    useEffect(() => {
        fetchWorkoutTypes();
    }, []);

    return {
        workoutmanager,
        loading,
        error,
        // getWorkoutTypeById,
        fetchWorkoutTypes
        // createWorkoutType,
        // deleteWorkoutType
    };
};