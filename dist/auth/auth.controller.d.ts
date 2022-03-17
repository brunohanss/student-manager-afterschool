import { AuthService } from "./auth.service";
import { Login } from "./interfaces/login.dto";
import { Email } from "./interfaces/email.dto";
import { ResetPassword } from "./interfaces/reset-password.dto";
import { SignUp } from "./interfaces/signUp.dto";
import { TokensDto } from "./interfaces/tokens.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(login: Login, req: any): Promise<any>;
    signUp(userDto: SignUp): Promise<any>;
    resetPass(resetPass: ResetPassword, req: any, res: any): Promise<any>;
    requestPass(email: Email, res: any): Promise<any>;
    signOut(email: Email, res: any): Promise<void>;
    refreshToken(tokens: TokensDto, res: any): Promise<any>;
}
