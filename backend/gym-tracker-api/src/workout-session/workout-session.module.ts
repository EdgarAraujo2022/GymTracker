import { Module } from '@nestjs/common';
import { WorkoutSessionController } from './workout-session.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkoutSessionService } from './workout-session.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionModule {}
