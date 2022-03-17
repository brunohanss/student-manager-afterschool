import { Logger } from '@nestjs/common';
export declare class EmailService {
    private readonly logger;
    constructor(logger: Logger);
    sendEmail(email: string, text: string): Promise<boolean>;
    sendResetPasswordEmail(email: any, name: any, token: any): Promise<boolean>;
}
