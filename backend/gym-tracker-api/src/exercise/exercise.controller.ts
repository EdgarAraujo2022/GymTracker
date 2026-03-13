import { Body, Controller, Get, Options, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { ExerciseService } from "./exercise.service";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";


@UseGuards(JwtAuthGuard)
@Controller('exercise-type/:exerciseTypeId/exercise')
export class ExerciseController {
    constructor(private readonly service: ExerciseService) { }

    @Post()
    create(
        @Param('exerciseTypeId') exerciseTypeId: string,
        @Body() dto: CreateExerciseDto,
        @GetUser('id') userId: string,
    ) {
        return this.service.create(exerciseTypeId, dto);
    }

    @Get()
    findByAll(
        @Param('exerciseTypeId') exerciseTypeId: string,
        @GetUser('id') userId: string) {
        return this.service.findByAll(exerciseTypeId);
    }


    @Get(':id')
    findById(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('id') id: string,
        @GetUser('id') userId: string,) {
        return this.service.findByUserAndId(workoutTypeId, id);
    }

    @Put(':id')
    update(
        @Param('exerciseTypeId') exerciseTypeId: string,
        @Param('id') id: string,
        @Body() dto: UpdateExerciseDto,
        @GetUser('id') userId: string,
    ) {
        return this.service.update(exerciseTypeId, id, dto);
    }
}