import { AppService } from "./app.service";
import { SeedService } from "./core/seed.service";
import { Sequelize } from "sequelize-typescript";
export declare class AppController {
    private readonly appService;
    private readonly seedService;
    private sequelize;
    constructor(appService: AppService, seedService: SeedService, sequelize: Sequelize);
    healthCheck(): string;
}
