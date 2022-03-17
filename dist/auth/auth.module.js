"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const config_1 = require("../config");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const crypto_service_1 = require("./crypto.service");
const auth_controller_1 = require("./auth.controller");
const local_strategy_1 = require("./passport/local.strategy");
const email_service_1 = require("../core/email.service");
const settings_service_1 = require("../settings/settings.service");
const settings_module_1 = require("../settings/settings.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: config_1.default.auth.jwt.accessTokenSecret,
                signOptions: {
                    expiresIn: config_1.default.auth.jwt.accessTokenLife,
                },
            }),
            user_module_1.UserModule,
            settings_module_1.SettingsModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            user_service_1.UserService,
            settings_service_1.SettingsService,
            crypto_service_1.CryptoService,
            email_service_1.EmailService,
            common_1.Logger,
        ],
        exports: [passport_1.PassportModule, auth_service_1.AuthService, crypto_service_1.CryptoService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map