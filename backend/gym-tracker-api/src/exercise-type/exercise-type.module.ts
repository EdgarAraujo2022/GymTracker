import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExerciseTypeController } from './exercise-type.controller';
import { ExerciseTypeService } from './exercise-type.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseTypeController],
  providers: [ExerciseTypeService],
  exports:[ExerciseTypeService]
})
export class ExerciseTypeModule {}
