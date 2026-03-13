"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const workout_module_1 = require("./workout/workout.module");
const bodymeasurement_module_1 = require("./bodymeasurements/bodymeasurement.module");
const auth_module_1 = require("./auth/auth.module");
const workout_type_module_1 = require("./workout-type/workout-type.module");
const exercise_module_1 = require("./exercise/exercise.module");
const workout_plan_module_1 = require("./workout-plan/workout-plan.module");
const exercise_type_module_1 = require("./exercise-type/exercise-type.module");
const workout_manager_module_1 = require("./workout-manager/workout-manager.module");
const exercise_set_module_1 = require("./exercise-set/exercise-set.module");
const workout_plan_exercise_module_1 = require("./workout-plan-exercise/workout-plan-exercise.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            workout_module_1.WorkoutModule,
            workout_type_module_1.WorkoutTypeModule,
            bodymeasurement_module_1.BodyMeasurementModule,
            auth_module_1.AuthModule,
            exercise_set_module_1.ExerciseSetModule,
            workout_plan_module_1.WorkoutPlanModule,
            exercise_module_1.ExerciseModule,
            exercise_type_module_1.ExerciseTypeModule,
            workout_manager_module_1.WorkoutManagerModule,
            workout_plan_exercise_module_1.WorkoutPlanExerciseModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map