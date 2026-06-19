import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutSessionDto } from './dtos/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dtos/update-workout-session.dto';

@Injectable()
export class WorkoutSessionService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateWorkoutSessionDto & { userId: string }) {
    return this.prisma.workoutSession.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateWorkoutSessionDto & { userId: string }) {
    return this.prisma.workoutSession.update({
      where: { id },
      data: dto,
    });
  }

  findAll() {
    return this.prisma.workoutSession.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.workoutSession.findUnique({
      where: { id },
    });
  }
}
