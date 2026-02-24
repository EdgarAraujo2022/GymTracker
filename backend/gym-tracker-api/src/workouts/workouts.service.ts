import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { UpdateWorkoutDto } from './dtos/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data: dto,
    });
  }

  update(id: number, dto: UpdateWorkoutDto) {
    return this.prisma.workout.update({
      where: { id },
      data: dto,
    });
  }

  findAll() {
    return this.prisma.workout.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.workout.findUnique({
      where: { id },
    });
  }
}
