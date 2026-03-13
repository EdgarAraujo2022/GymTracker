import { Body, Controller, Get, Post, Put, Param, Req, UseGuards, Options } from '@nestjs/common';
import { BodyMeasurementService } from './bodymeasurement.service';
import { CreateBodyMeasurementDto } from './dtos/create-bodymeasurement.dto';
import { UpdateBodyMeasurementDto } from './dtos/update-bodymeasurement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from "src/auth/decorators/get-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller('me/bodymeasurement')
export class BodyMeasurementController {
    constructor(private readonly service: BodyMeasurementService) { }

    @Options()
    options() {
        return;
    }

    @Post()
    create(
        @Body() dto: CreateBodyMeasurementDto,
        @GetUser('id') userId: string) {
        return this.service.create(userId, dto);
    }

    @Get()
    findAll(
        @GetUser('id') userId: string) {
        return this.service.findByUser(userId);
    }

    @Get(':id')
    findById(
        @GetUser('id') userId: string, 
        @Param('id') id: string) {
        return this.service.findByUserAndId(userId, Number(id));
    }

    @Put(':id')
    update(
        @GetUser('id') userId: string,
        @Param('id') id: string,
        @Body() dto: UpdateBodyMeasurementDto,
    ) {
        return this.service.update(Number(id), { ...dto, userId: userId});
    }
}
