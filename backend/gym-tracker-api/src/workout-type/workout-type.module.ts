import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkoutTypeController } from './workout-type.controller';
import { WorkoutTypeService } from './workout-type.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutTypeController],
  providers: [WorkoutTypeService],
  exports: [WorkoutTypeService ]
})
export class WorkoutTypeModule {}
