  import { IsString, IsBoolean, isInt, IsInt } from 'class-validator';
  
  export class CreateExerciseSetDto {
    @IsInt()
    sets: number;

    @IsInt()
    reps: number;

    @IsInt()
    rest: number;

    @IsInt()
    weight: number;
    
    @IsInt()
    order: number;
  }
  