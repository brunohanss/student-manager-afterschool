"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const crypto_service_1 = require("../auth/crypto.service");
const logger_service_1 = require("./logger.service");
let SeedService = class SeedService {
    constructor(userService, cryptoService, loggerService) {
        this.userService = userService;
        this.cryptoService = cryptoService;
        this.loggerService = loggerService;
    }
};
SeedService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        crypto_service_1.CryptoService,
        logger_service_1.WinstonLogger])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map