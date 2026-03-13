import { Body, Controller, Get, Options, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { CreateExerciseSetDto } from "./dto/create-exercise-set.dto";
import { ExerciseSetService } from "./exercise-set.service";
import { UpdateExerciseSetDto } from "./dto/update-exercise-set.dto";

@UseGuards(JwtAuthGuard)
@Controller('me/workout-type/:workoutTypeId/workout-plan/:workoutPlanId/exercise/:workoutPlanExerciseId/set')
export class ExerciseSetController {
    constructor(private readonly service: ExerciseSetService) { }

    @Post()
    create(
        @Param('workoutPlanExerciseId') workoutPlanExerciseId: string,
        @Body() dto: CreateExerciseSetDto,
        @GetUser('id') userId: string,
    ) {
        return this.service.create(workoutPlanExerciseId, dto);
    }

    @Get()
    findAll(
        @Param('workoutPlanExerciseId') workoutPlanExerciseId: string
    ) {
        return this.service.findAll(workoutPlanExerciseId);
    }

    @Get(':workoutPlanExerciseId')
    findById(
        @Param('workoutPlanExerciseId') workoutPlanExerciseId: string) {
        return this.service.findById(workoutPlanExerciseId);
    }

    @Put(':id')
    update(
        @GetUser('id') userId: string,
        @Param('id') id: string,
        @Body() dto: UpdateExerciseSetDto,
    ) {
        return this.service.update(id, dto);
    }
}