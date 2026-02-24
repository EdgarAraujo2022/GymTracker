import { BodyMeasurementsService } from './bodymeasurements.service';
import { CreateBodyMeasurementsDto } from './dtos/create-bodymeasurements.dto';
import { UpdateBodyMeasurementsDto } from './dtos/update-bodymeasurements.dto';
import { Request } from 'express';
interface JwtRequest extends Request {
    user: {
        id: string;
    };
}
export declare class BodyMeasurementsController {
    private readonly service;
    constructor(service: BodyMeasurementsService);
    options(): void;
    create(dto: CreateBodyMeasurementsDto, req: JwtRequest): import("@prisma/client").Prisma.Prisma__BodyMeasurementsClient<{
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
    findAll(req: JwtRequest): import("@prisma/client").Prisma.PrismaPromise<{
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
    findById(req: JwtRequest, id: string): import("@prisma/client").Prisma.Prisma__BodyMeasurementsClient<{
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
    update(req: JwtRequest, id: string, dto: UpdateBodyMeasurementsDto): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
}
export {};
