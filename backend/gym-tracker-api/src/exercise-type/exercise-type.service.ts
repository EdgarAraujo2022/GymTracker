import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExerciseTypeDto } from "./dto/create-exercise-type.dto";
import { UpdateExerciseTypeDto } from "./dto/update-exercise-type.dto";

@Injectable()
export class ExerciseTypeService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreateExerciseTypeDto) {
        return this.prisma.exerciseType.create({
            data: {
                name: dto.name
            },
        });
    }

    findAll() {
        return this.prisma.exerciseType.findMany();
    }

    findById(id: string) {
        return this.prisma.exerciseType.findFirst({
            where: { id },
        });
    }

    update(id: string, dto: UpdateExerciseTypeDto) {
        return this.prisma.exerciseType.updateMany({
            where: {
                id
            },
            data: dto,
        });
    }
}