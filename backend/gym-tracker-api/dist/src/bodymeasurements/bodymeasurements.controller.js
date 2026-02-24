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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMeasurementsController = void 0;
const common_1 = require("@nestjs/common");
const bodymeasurements_service_1 = require("./bodymeasurements.service");
const create_bodymeasurements_dto_1 = require("./dtos/create-bodymeasurements.dto");
const update_bodymeasurements_dto_1 = require("./dtos/update-bodymeasurements.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BodyMeasurementsController = class BodyMeasurementsController {
    service;
    constructor(service) {
        this.service = service;
    }
    options() {
        return;
    }
    create(dto, req) {
        return this.service.create(req.user.id, dto);
    }
    findAll(req) {
        return this.service.findByUser(req.user.id);
    }
    findById(req, id) {
        return this.service.findByUserAndId(req.user.id, Number(id));
    }
    update(req, id, dto) {
        return this.service.update(Number(id), { ...dto, userId: req.user.id });
    }
};
exports.BodyMeasurementsController = BodyMeasurementsController;
__decorate([
    (0, common_1.Options)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "options", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bodymeasurements_dto_1.CreateBodyMeasurementsDto, Object]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_bodymeasurements_dto_1.UpdateBodyMeasurementsDto]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "update", null);
exports.BodyMeasurementsController = BodyMeasurementsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('me/bodymeasurements'),
    __metadata("design:paramtypes", [bodymeasurements_service_1.BodyMeasurementsService])
], BodyMeasurementsController);
//# sourceMappingURL=bodymeasurements.controller.js.map