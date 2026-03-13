import { Module } from '@nestjs/common';
import { BodyMeasurementController } from './bodymeasurement.controller';
import { BodyMeasurementService } from './bodymeasurement.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BodyMeasurementController],
  providers: [BodyMeasurementService],
})
export class BodyMeasurementModule {}
