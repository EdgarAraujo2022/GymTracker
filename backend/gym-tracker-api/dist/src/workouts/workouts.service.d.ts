import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { UpdateWorkoutDto } from './dtos/update-workout.dto';
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorkoutDto): import("@prisma/client").Prisma.Prisma__WorkoutClient<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateWorkoutDto): import("@prisma/client").Prisma.Prisma__WorkoutClient<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
    }[]>;
    findById(id: number): import("@prisma/client").Prisma.Prisma__WorkoutClient<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
