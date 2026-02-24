"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BodyMeasurementsService = class BodyMeasurementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, dto) {
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
    findByUser(userId) {
        return this.prisma.bodyMeasurements.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    findByUserAndId(userId, id) {
        return this.prisma.bodyMeasurements.findFirst({
            where: { id, userId },
        });
    }
    update(id, dto) {
        return this.prisma.bodyMeasurements.updateMany({
            where: {
                id,
                userId: dto.userId,
            },
            data: dto,
        });
    }
};
exports.BodyMeasurementsService = BodyMeasurementsService;
exports.BodyMeasurementsService = BodyMeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BodyMeasurementsService);
//# sourceMappingURL=bodymeasurements.service.js.map