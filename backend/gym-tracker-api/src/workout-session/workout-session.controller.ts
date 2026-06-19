import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { CreateWorkoutSessionDto } from './dtos/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dtos/update-workout-session.dto';

@Controller('workouts')
export class WorkoutSessionController {
  constructor(private service: WorkoutSessionService) {}

  @Post()
  create(@Body() dto: CreateWorkoutSessionDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkoutSessionDto,
  ) {
    return this.service.update(Number(id), dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }
}
