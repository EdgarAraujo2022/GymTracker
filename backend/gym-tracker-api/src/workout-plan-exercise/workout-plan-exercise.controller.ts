import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { CreateWorkoutPlanExerciseDto } from "./dto/create-workout-plan-exercise.dto";
import { UpdateWorkoutPlanExerciseDto } from "./dto/update-workout-plan-exercise.dto";
import { WorkoutPlanExerciseService } from "./workout-plan-exercise.service";
import { OwnershipService } from "src/shared/services/ownership.service";

@UseGuards(JwtAuthGuard)
@Controller('me/workout-type/:workoutTypeId/workout-plan/:workoutPlanId/exercise')
export class WorkoutPlanExerciseController {
    constructor(private readonly service: WorkoutPlanExerciseService,
        private readonly ownershipService: OwnershipService) { }

    @Post()
    async create(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('workoutPlanId') workoutPlanId: string,
        @Body() dto: CreateWorkoutPlanExerciseDto,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.create(workoutPlanId, dto);
    }

    @Get()
    async findAll(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('workoutPlanId') workoutPlanId: string,
        @Param('id') id: string,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.findAll(workoutPlanId);
    }

    @Get(':id')
    async findAById(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('workoutPlanId') workoutPlanId: string,
        @Param('id') id: string,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.findById(workoutPlanId, id);
    }

    @Put(':id')
    async update(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('workoutPlanId') workoutPlanId: string,
        @Param('id') id: string,
        @Body() dto: UpdateWorkoutPlanExerciseDto,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.update(id, workoutPlanId, dto);
    }

    @Delete(':id')
    async delete(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('workoutPlanId') workoutPlanId: string,
        @Param('id') id: string,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.delete(id, workoutPlanId);
    }
}