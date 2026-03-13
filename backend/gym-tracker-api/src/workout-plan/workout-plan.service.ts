import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWorkoutPlanDto } from "./dto/create-workout-plan.dto";
import { UpdateWorkoutPlanDto } from "./dto/update-workout-plan.dto";

@Injectable()
export class WorkoutPlanService {
    constructor(private prisma: PrismaService) { }

    create(workoutTypeId: string, dto: CreateWorkoutPlanDto) {
        return this.prisma.workoutPlan.create({
            data: {
                name: dto.name,
                status: dto.status,
                workoutTypeId: workoutTypeId
            },
        });
    }

    findAll(workoutTypeId: string) {
        return this.prisma.workoutPlan.findMany({
            where: { workoutTypeId },
        });
    }

    findByIdAndWorkoutTypeId(workoutTypeId: string, id: string,) {
        return this.prisma.workoutPlan.findMany({
            where: { workoutTypeId, id },
        });
    }

    update(workoutTypeId: string, id: string, dto: UpdateWorkoutPlanDto) {
        return this.prisma.workoutPlan.updateMany({
            where: {
                workoutTypeId, id
            },
            data: dto,
        });
    }

    async delete(id: string) {
        return this.prisma.workoutPlan.delete({
            where: {
                id
            }
        });
    }
}