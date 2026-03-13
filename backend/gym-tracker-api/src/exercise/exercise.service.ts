import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";


@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) { }

    create(exerciseTypeId: string, dto: CreateExerciseDto) {
        return this.prisma.exercise.create({
            data: {
                name: dto.name,
                status: dto.status,
                exerciseTypeId: exerciseTypeId
            },
        });
    }

    findByAll(exerciseTypeId: string,) {
        return this.prisma.exercise.findMany({
            where: { exerciseTypeId },
        });
    }

    findByUserAndId(exerciseTypeId: string, id: string) {
        return this.prisma.exercise.findMany({
            where: { exerciseTypeId, id },
        });
    }

    findById(id: string) {
        return this.prisma.exercise.findFirst({
            where: { id },
        });
    }

    update(exerciseTypeId: string, id: string, dto: UpdateExerciseDto) {
        return this.prisma.exercise.updateMany({
            where: {
                exerciseTypeId, id
            },
            data: dto,
        });
    }
}