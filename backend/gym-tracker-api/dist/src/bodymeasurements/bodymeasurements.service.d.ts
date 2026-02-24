import { PrismaService } from '../prisma/prisma.service';
import { CreateBodyMeasurementsDto } from './dtos/create-bodymeasurements.dto';
import { UpdateBodyMeasurementsDto } from './dtos/update-bodymeasurements.dto';
export declare class BodyMeasurementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBodyMeasurementsDto): import("@prisma/client").Prisma.Prisma__BodyMeasurementsClient<{
        createdAt: Date;
        id: number;
        chest: number | null;
        waist: number | null;
        hips: number | null;
        leftArm: number | null;
        rightArm: number | null;
        leftThigh: number | null;
        rightThigh: number | null;
        leftCalf: number | null;
        rightCalf: number | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByUser(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        id: number;
        chest: number | null;
        waist: number | null;
        hips: number | null;
        leftArm: number | null;
        rightArm: number | null;
        leftThigh: number | null;
        rightThigh: number | null;
        leftCalf: number | null;
        rightCalf: number | null;
        userId: string;
    }[]>;
    findByUserAndId(userId: string, id: number): import("@prisma/client").Prisma.Prisma__BodyMeasurementsClient<{
        createdAt: Date;
        id: number;
        chest: number | null;
        waist: number | null;
        hips: number | null;
        leftArm: number | null;
        rightArm: number | null;
        leftThigh: number | null;
        rightThigh: number | null;
        leftCalf: number | null;
        rightCalf: number | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateBodyMeasurementsDto & {
        userId: string;
    }): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
}
