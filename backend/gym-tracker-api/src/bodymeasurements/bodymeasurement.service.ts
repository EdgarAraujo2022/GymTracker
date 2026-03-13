import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBodyMeasurementDto } from './dtos/create-bodymeasurement.dto';
import { UpdateBodyMeasurementDto } from './dtos/update-bodymeasurement.dto';

@Injectable()
export class BodyMeasurementService {
    constructor(private prisma: PrismaService) { }

    create(userId: string, dto: CreateBodyMeasurementDto) {
        return this.prisma.bodyMeasurement.create({
            data: {
                userId,
                chest: dto.chest,
                waist: dto.waist,
                hips: dto.hips,
                leftArm: dto.leftArm,
                rightArm: dto.rightArm,
                leftThigh: dto.leftThigh,
                rightThigh: dto.rightThigh,
                leftCalf: dto.leftCalf,
                rightCalf: dto.rightCalf,
            },
        });
    }

    findByUser(userId: string) {
        return this.prisma.bodyMeasurement.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findByUserAndId(userId: string, id: number) {
        return this.prisma.bodyMeasurement.findFirst({
            where: { id, userId },
        });
    }

    update(id: number, dto: UpdateBodyMeasurementDto & { userId: string }) {
        return this.prisma.bodyMeasurement.updateMany({
            where: {
                id,
                userId: dto.userId,
            },
            data: dto,
        });
    }
}
