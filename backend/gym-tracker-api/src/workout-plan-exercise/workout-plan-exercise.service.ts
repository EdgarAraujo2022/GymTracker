import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWorkoutPlanExerciseDto } from "./dto/create-workout-plan-exercise.dto";
import { UpdateWorkoutPlanExerciseDto } from "./dto/update-workout-plan-exercise.dto";


@Injectable()
export class WorkoutPlanExerciseService {
    constructor(private prisma: PrismaService) { }

    create(workoutPlanId: string, dto: CreateWorkoutPlanExerciseDto) {
        return this.prisma.workoutPlanExercise.create({
            data: {
                workoutPlanId: workoutPlanId,
                exerciseId: dto.exerciseId
            },
        });
    }

    findAll(workoutPlanId: string) {
        return this.prisma.workoutPlanExercise.findMany({
            where: { workoutPlanId }
        });
    }
    Í
    findById(workoutPlanId: string, id: string) {
        return this.prisma.workoutPlanExercise.findFirst({
            where: { workoutPlanId, id }
        });
    }

    findByUserAndId(userId: string, id: string) {
        return this.prisma.workoutPlanExercise.findFirst({
            where: { id },
        });
    }

    update(id: string, workoutPlanId: string, dto: UpdateWorkoutPlanExerciseDto) {
        return this.prisma.workoutPlanExercise.update({
            where: {
                id,
                workoutPlanId
            },
            data: dto,
        });
    }

    async delete(id: string, workoutPlanId: string) {
        return this.prisma.workoutPlanExercise.delete({
            where: {
                id,
                workoutPlanId
            }
        });
    }
}