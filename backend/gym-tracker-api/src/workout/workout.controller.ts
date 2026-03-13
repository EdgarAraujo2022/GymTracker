import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { UpdateWorkoutDto } from './dtos/update-workout.dto';

@Controller('workouts')
export class WorkoutController {
  constructor(private service: WorkoutService) {}

  @Post()
  create(@Body() dto: CreateWorkoutDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkoutDto,
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
