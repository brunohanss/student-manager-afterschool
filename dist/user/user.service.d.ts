import { User, UserDto } from "./user.schema";
import { SettingsService } from "../settings/settings.service";
import { CryptoService } from "../auth/crypto.service";
import { TokensDto } from "../auth/interfaces/tokens.dto";
export declare class UserService {
    private readonly cryptoService;
    private readonly settingsService;
    constructor(cryptoService: CryptoService, settingsService: SettingsService);
    create(user: any): Promise<UserDto>;
    findById(id: string): Promise<UserDto>;
    findByEmail(email: string): Promise<User | undefined>;
    updateCurrent(id: string, user: User): Promise<TokensDto>;
    edit(id: string, user: User): Promise<UserDto>;
    delete(id: string): Promise<void>;
    findAll(): Promise<UserDto[]>;
    changePassword(id: string, salt: string, password: string): Promise<void>;
    private _isDuplicateEmail;
    private static mapUser;
    private static mapUserToDto;
    private static mapAddressToDto;
}
