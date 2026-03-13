import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExerciseSetController } from './exercise-set.controller';
import { ExerciseSetService } from './exercise-set.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseSetController],
  providers: [ExerciseSetService],
  exports: [ExerciseSetService]
})
export class ExerciseSetModule {}
