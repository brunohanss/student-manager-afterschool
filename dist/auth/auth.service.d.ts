import { UserService } from "../user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.dto";
import { CryptoService } from "./crypto.service";
import { SignUp } from "./interfaces/signUp.dto";
import { ResetPassword } from "./interfaces/reset-password.dto";
import { EmailService } from "../core/email.service";
export declare class AuthService {
    private readonly userService;
    private readonly cryptoService;
    private readonly emailService;
    constructor(userService: UserService, cryptoService: CryptoService, emailService: EmailService);
    private getTokenPayload;
    signUp(userDto: SignUp): Promise<any>;
    signIn(user: any): Promise<any>;
    validateUser(payload: JwtPayload): Promise<any>;
    logIn(email: any, password: any): Promise<import("../user/user.schema").User>;
    resetPassword(resetPassword: ResetPassword, userId: string): Promise<void>;
    requestPassword(email: string): Promise<void>;
    refreshToken(tokens: any): Promise<void>;
}
