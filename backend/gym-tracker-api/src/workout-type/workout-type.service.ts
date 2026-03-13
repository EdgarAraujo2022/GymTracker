import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWorkoutTypeDto } from "./dto/create-workouttype.dto";
import { UpdateWorkoutTypeDto } from "./dto/update-workouttype.dto";

@Injectable()
export class WorkoutTypeService {
    constructor(private prisma: PrismaService) { }

    create(userId: string, dto: CreateWorkoutTypeDto) {
        return this.prisma.workoutType.create({
            data: {
                userId,
                description: dto.description,
                name: dto.name,
                status: dto.status
            },
        });
    }

    findByUser(userId: string) {
        return this.prisma.workoutType.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findByUserAndId(userId: string, id: string) {
        return this.prisma.workoutType.findFirst({
            where: { id, userId },
        });
    }

    update(id: string, dto: UpdateWorkoutTypeDto & { userId: string }) {
        return this.prisma.workoutType.updateMany({
            where: {
                id,
                userId: dto.userId,
            },
            data: dto,
        });
    }

    async delete(id: string, userId: string) {
        return this.prisma.workoutType.delete({
            where: {
                id,
                userId
            }
        });
    }
}