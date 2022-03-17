import { LoggerService } from "@nestjs/common";
export declare class WinstonLogger implements LoggerService {
    private readonly logDir;
    private readonly logFileUrl;
    private readonly logger;
    constructor();
    private getLogMessage;
    debug(message: any, context?: string): any;
    error(message: any, trace?: string, context?: string): any;
    log(message: any, context?: string): any;
    verbose(message: any, context?: string): any;
    warn(message: any, context?: string): any;
}
