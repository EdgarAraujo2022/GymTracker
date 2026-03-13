import { Injectable } from "@nestjs/common";
import { WorkoutTypeService } from "../workout-type/workout-type.service";
import { WorkoutPlanService } from "../workout-plan/workout-plan.service";
import { WorkoutPlanExerciseService } from "../workout-plan-exercise/workout-plan-exercise.service"; // 👈 NOVO
import { ExerciseService } from "../exercise/exercise.service";
import { ExerciseSetService } from "../exercise-set/exercise-set.service";
import {
    WorkoutManagerResponseDto,
    WorkoutPlanDto,
    ExerciseDto
} from "./dto/workout-manager-response.dto";
import { ExerciseTypeService } from "src/exercise-type/exercise-type.service";

@Injectable()
export class WorkoutManagerService {
    constructor(
        private readonly workoutTypeService: WorkoutTypeService,
        private readonly workoutPlanService: WorkoutPlanService,
        private readonly workoutPlanExerciseService: WorkoutPlanExerciseService, // 👈 NOVO
        private readonly exerciseService: ExerciseService,
        private readonly exerciseSetService: ExerciseSetService,
        private readonly exerciseTypeService: ExerciseTypeService
    ) { }

    async getFullWorkoutData(userId: string): Promise<WorkoutManagerResponseDto[]> {
        const workoutTypes = await this.workoutTypeService.findByUser(userId) || [];

        const fullData = await Promise.all(
            workoutTypes.map(async (type): Promise<WorkoutManagerResponseDto> => {
                try {
                    const workoutPlans = await this.workoutPlanService.findAll(type.id);

                    const plansWithExercises = await Promise.all(
                        workoutPlans.map(async (plan): Promise<WorkoutPlanDto> => {
                            try {
                                const workoutPlanExercises = await this.workoutPlanExerciseService.findAll(plan.id) || [];

                                const exercisesWithSets = await Promise.all(
                                    workoutPlanExercises.map(async (wpe) => {
                                        const exercise = await this.exerciseService.findById(wpe.exerciseId);
                                        const exerciseType = exercise ? await this.exerciseTypeService.findById(exercise.exerciseTypeId) : null;
                                        const exerciseSets = await this.exerciseSetService.findById(wpe.id) || [];

                                        const exerciseSet = Array.isArray(exerciseSets) ? exerciseSets[0] : exerciseSets;

                                        return {
                                            id: exercise?.id,
                                            name: exercise?.name || 'Exercício não encontrado',
                                            exerciseTypeId: exercise?.exerciseTypeId,
                                            workoutPlanExerciseId: wpe.id,
                                            sets: {
                                                id: exerciseSet?.id,
                                                order: exerciseSet?.order,
                                                sets: exerciseSet?.sets,
                                                reps: exerciseSet?.reps,
                                                rest: exerciseSet?.rest,
                                                weight: exerciseSet?.weight,
                                                muscle: exerciseType?.name || 'Não especificado'
                                            }
                                        };
                                    })
                                );

                                return {
                                    id: plan.id,
                                    name: plan.name,
                                    exercises: exercisesWithSets
                                };
                            } catch (error) {
                                return {
                                    id: plan.id,
                                    name: plan.name,
                                    exercises: []
                                };
                            }
                        })
                    );

                    return {
                        id: type.id,
                        name: type.name,
                        description: type.description,
                        workouts: plansWithExercises
                    };
                } catch (error) {
                    return {
                        id: type.id,
                        name: type.name,
                        description: type.description,
                        workouts: []
                    };
                }
            })
        );

        return fullData;
    }
}