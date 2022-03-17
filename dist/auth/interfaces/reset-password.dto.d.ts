import { Email } from './email.dto';
export declare class ResetPassword extends Email {
    password: string;
    confirmPassword: string;
    resetPasswordToken: string;
}
