import { Body, Controller, Get, Post, Put, Param, Req, UseGuards, Options } from '@nestjs/common';
import { BodyMeasurementsService } from './bodymeasurements.service';
import { CreateBodyMeasurementsDto } from './dtos/create-bodymeasurements.dto';
import { UpdateBodyMeasurementsDto } from './dtos/update-bodymeasurements.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface JwtRequest extends Request {
    user: {
        id: string;
    };
}


@UseGuards(JwtAuthGuard)
@Controller('me/bodymeasurements')
export class BodyMeasurementsController {
    constructor(private readonly service: BodyMeasurementsService) { }
    
    @Options()
    options() {
        return;
    }

    @Post()
    create(@Body() dto: CreateBodyMeasurementsDto, @Req() req: JwtRequest) {
        return this.service.create(req.user.id, dto);
    }

    @Get()
    findAll(@Req() req: JwtRequest) {
        return this.service.findByUser(req.user.id);
    }

    @Get(':id')
    findById(@Req() req: JwtRequest, @Param('id') id: string) {
        return this.service.findByUserAndId(req.user.id, Number(id));
    }

    @Put(':id')
    update(
        @Req() req: JwtRequest,
        @Param('id') id: string,
        @Body() dto: UpdateBodyMeasurementsDto,
    ) {
        return this.service.update(Number(id), { ...dto, userId: req.user.id });
    }
}
