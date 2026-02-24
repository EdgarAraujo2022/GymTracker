import { Module } from '@nestjs/common';
import { BodyMeasurementsController } from './bodymeasurements.controller';
import { BodyMeasurementsService } from './bodymeasurements.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BodyMeasurementsController],
  providers: [BodyMeasurementsService],
})
export class BodyMeasurementsModule {}
