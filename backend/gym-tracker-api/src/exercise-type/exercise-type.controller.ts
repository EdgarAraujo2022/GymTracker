import { Body, Controller, Get, Options, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { ExerciseTypeService } from "./exercise-type.service";
import { CreateExerciseTypeDto } from "./dto/create-exercise-type.dto";
import { UpdateExerciseTypeDto } from "./dto/update-exercise-type.dto";

@UseGuards(JwtAuthGuard)
@Controller('exercise-type')
export class ExerciseTypeController {
    constructor(private readonly service: ExerciseTypeService) { }

    @Post()
    create(
        @Body() dto: CreateExerciseTypeDto
    ) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findById(
        @Param('id') id: string) {
        return this.service.findById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateExerciseTypeDto,
    ) {
        return this.service.update(id, dto);
    }
}