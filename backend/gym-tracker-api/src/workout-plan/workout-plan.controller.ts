import { Body, Controller, Delete, Get, Options, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { WorkoutPlanService } from "./workout-plan.service";
import { CreateWorkoutPlanDto } from "./dto/create-workout-plan.dto";
import { UpdateWorkoutPlanDto } from "./dto/update-workout-plan.dto";
import { OwnershipService } from "src/shared/services/ownership.service";

@UseGuards(JwtAuthGuard)
@Controller('me/workout-type/:workoutTypeId/workout-plan')
export class WorkoutPlanController {
    constructor(private readonly service: WorkoutPlanService,
        private readonly ownershipService: OwnershipService) { }

    @Post()
    async create(
        @GetUser('id') userId: string,
        @Param('workoutTypeId') workoutTypeId: string,
        @Body() dto: CreateWorkoutPlanDto,

    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.create(workoutTypeId, dto);
    }

    @Get()
    async findAll(
        @GetUser('id') userId: string,
        @Param('workoutTypeId') workoutTypeId: string) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.findAll(workoutTypeId);
    }

    @Get(':id')
    async findById(
        @GetUser('id') userId: string,
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('id') id: string,) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.findByIdAndWorkoutTypeId(workoutTypeId, id);
    }

    @Put(':id')
    async update(
        @GetUser('id') userId: string,
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('id') id: string,
        @Body() dto: UpdateWorkoutPlanDto,
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.update(workoutTypeId, id, dto);
    }

    @Delete(':id')
    async delete(
        @Param('workoutTypeId') workoutTypeId: string,
        @Param('id') id: string,
        @GetUser('id') userId: string
    ) {
        await this.ownershipService.validateWorkoutType(workoutTypeId, userId);
        return this.service.delete(id);
    }
}