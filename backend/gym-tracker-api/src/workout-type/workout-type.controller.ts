import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateWorkoutTypeDto } from "./dto/create-workouttype.dto";
import { WorkoutTypeService } from "./workout-type.service";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { UpdateWorkoutTypeDto } from "./dto/update-workouttype.dto";

@UseGuards(JwtAuthGuard)
@Controller('me/workout-type')
export class WorkoutTypeController {
    constructor(private readonly service: WorkoutTypeService) { }

    @Post()
    create(
        @Body() dto: CreateWorkoutTypeDto,
        @GetUser('id') userId: string,
    ) {
        return this.service.create(userId, dto);
    }

    @Get()
    findAll(@GetUser('id') userId: string) {
        return this.service.findByUser(userId);
    }

    @Get(':id')
    findById(
        @GetUser('id') userId: string,
        @Param('id') id: string) {
        return this.service.findByUserAndId(userId, id);
    }

    @Put(':id')
    update(
        @GetUser('id') userId: string,
        @Param('id') id: string,
        @Body() dto: UpdateWorkoutTypeDto,
    ) {
        return this.service.update(id, { ...dto, userId: userId });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @GetUser('id') userId: string
    ) {
        return this.service.delete(id, userId);
    }
}