"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const settings_module_1 = require("./settings/settings.module");
const nest_winston_1 = require("nest-winston");
const config_1 = require("./config");
const seed_service_1 = require("./core/seed.service");
const logger_service_1 = require("./core/logger.service");
const user_model_1 = require("./user/user.model");
const speech_module_1 = require("./speech/speech.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            settings_module_1.SettingsModule,
            sequelize_1.SequelizeModule.forRoot({
                dialect: process.env.SEQ_DIALECT,
                host: process.env.SEQ_HOST,
                port: +process.env.SEQ_PORT,
                username: process.env.SEQ_USERNAME,
                password: process.env.SEQ_PASSWORD,
                database: process.env.SEQ_DATABASE,
                models: [user_model_1.User],
                logging: (msg) => common_1.Logger.log(msg, "DATABASE INTERACTION", false),
            }),
            nest_winston_1.WinstonModule.forRoot({
                level: config_1.default.logger.file.level,
            }),
            speech_module_1.SpeechModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, seed_service_1.SeedService, logger_service_1.WinstonLogger],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map