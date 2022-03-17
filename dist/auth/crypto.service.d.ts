import { User, UserDto } from "../user/user.schema";
export declare class CryptoService {
    private readonly cipherAlgorythm;
    private readonly hashAlgorythm;
    private readonly inputEncoding;
    private readonly outputEncoding;
    private readonly SPLITTER_IV;
    generateResponseTokens(user: User | UserDto): {
        expires_in: number;
        access_token: string;
        refresh_token: string;
    };
    private getHash;
    hashPassword(password: string): {
        salt: string;
        hash: string;
    };
    checkPassword(originalHash: string, salt: string, candidatePassword: string): boolean;
    generateResetPasswordToken(id: string): string;
    decipherResetPasswordToken(token: string): any;
}
