import { UserService } from "../user/user.service";
import { CryptoService } from "../auth/crypto.service";
import { WinstonLogger } from "./logger.service";
export declare class SeedService {
    private readonly userService;
    private readonly cryptoService;
    private readonly loggerService;
    constructor(userService: UserService, cryptoService: CryptoService, loggerService: WinstonLogger);
}
