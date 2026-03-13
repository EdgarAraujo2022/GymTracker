// src/shared/services/ownership.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnershipService {
    constructor(private prisma: PrismaService) {}

    async validateWorkoutType(workoutTypeId: string, userId: string) {
        const workoutType = await this.prisma.workoutType.findFirst({
            where: { id: workoutTypeId, userId }
        });

        if (!workoutType) {
            throw new NotFoundException('Workout type not found or does not belong to user');
        }

        return workoutType;
    }

    async validateWorkoutPlan(workoutPlanId: string, workoutTypeId: string, userId: string) {
        // Primeiro valida o workoutType
        await this.validateWorkoutType(workoutTypeId, userId);
        
        // Depois valida se o plano pertence ao tipo
        const workoutPlan = await this.prisma.workoutPlan.findMany({
            where: { 
                id: workoutPlanId,
                workoutTypeId 
            }
        });

        if (!workoutPlan) {
            throw new NotFoundException('Workout plan not found');
        }

        return workoutPlan;
    }

    // Adicione mais métodos conforme necessário
}