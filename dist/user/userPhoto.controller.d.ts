import { UserService } from "./user.service";
export declare class UserPhotoController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrent(req: any, res: any): Promise<void>;
}
