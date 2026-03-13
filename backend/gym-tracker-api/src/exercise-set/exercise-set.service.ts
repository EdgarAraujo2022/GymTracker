import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExerciseSetDto } from "./dto/create-exercise-set.dto";
import { UpdateExerciseSetDto } from "./dto/update-exercise-set.dto";

@Injectable()
export class ExerciseSetService {
    constructor(private prisma: PrismaService) { }

    create(workoutPlanExerciseId: string, dto: CreateExerciseSetDto) {
        return this.prisma.exerciseSet.create({
            data: {
                workoutPlanExerciseId: workoutPlanExerciseId,
                sets: dto.sets,
                reps: dto.reps,
                rest: dto.rest,
                muscle: '', // Remover depois
                order: dto.order,
                weight: dto.weight
            },
        });
    }

    findAll(workoutPlanExerciseId) {
        return this.prisma.exerciseSet.findMany({
            where: { workoutPlanExerciseId },
        });
    }

    findById(workoutPlanExerciseId: string) {
        return this.prisma.exerciseSet.findMany({
            where: { workoutPlanExerciseId },
        });
    }

    update(id: string, dto: UpdateExerciseSetDto) {
        return this.prisma.exerciseSet.updateMany({
            where: {
                id
            },
            data: dto,
        });
    }
}