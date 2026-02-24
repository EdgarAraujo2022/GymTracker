import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBodyMeasurementsDto } from './dtos/create-bodymeasurements.dto';
import { UpdateBodyMeasurementsDto } from './dtos/update-bodymeasurements.dto';

@Injectable()
export class BodyMeasurementsService {
    constructor(private prisma: PrismaService) { }

    create(userId: string, dto: CreateBodyMeasurementsDto) {
        return this.prisma.bodyMeasurements.create({
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
        return this.prisma.bodyMeasurements.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findByUserAndId(userId: string, id: number) {
        return this.prisma.bodyMeasurements.findFirst({
            where: { id, userId },
        });
    }

    update(id: number, dto: UpdateBodyMeasurementsDto & { userId: string }) {
        return this.prisma.bodyMeasurements.updateMany({
            where: {
                id,
                userId: dto.userId,
            },
            data: dto,
        });
    }
}
