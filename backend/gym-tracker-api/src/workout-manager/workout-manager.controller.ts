// workout-manager.controller.ts
import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { WorkoutManagerService } from "./workout-manager.service";

@UseGuards(JwtAuthGuard)
@Controller('me/workout-manager') // Seguindo seu padrão /me/*
export class WorkoutManagerController {
    constructor(private readonly service: WorkoutManagerService) {}

    @Get()
    async getFullWorkoutData(@GetUser('id') userId: string) {
        return this.service.getFullWorkoutData(userId);
    }
}