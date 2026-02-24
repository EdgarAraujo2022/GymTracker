import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly appService;
    constructor(appService: AuthService);
    getHello(): string;
}
