import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutsModule } from './workouts/workouts.module';
import { BodyMeasurementsModule } from './bodymeasurements/bodymeasurements.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WorkoutsModule,
    BodyMeasurementsModule,
    AuthModule
  ],
})
export class AppModule {}
