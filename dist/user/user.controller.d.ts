import { UserService } from "./user.service";
import { User } from "./user.schema";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrent(req: any): Promise<import("./user.schema").UserDto>;
    editCurrent(req: any, user: User): Promise<import("../auth/interfaces/tokens.dto").TokensDto>;
    getById(id: string): Promise<import("./user.schema").UserDto>;
    deleteById(id: string): Promise<void>;
    edit(id: string, user: User): Promise<import("./user.schema").UserDto>;
}
