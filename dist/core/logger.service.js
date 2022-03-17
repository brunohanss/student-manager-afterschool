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
exports.WinstonLogger = void 0;
const common_1 = require("@nestjs/common");
const appRoot = require("app-root-path");
const fs = require("fs");
const winston = require("winston");
const config_1 = require("../config");
let WinstonLogger = class WinstonLogger {
    constructor() {
        this.logDir = `${appRoot}/${config_1.default.logger.file.logDir}`;
        this.logFileUrl = `${this.logDir}/${config_1.default.logger.file.logFile}`;
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.File({
                    level: config_1.default.logger.file.level,
                    filename: this.logFileUrl,
                    handleExceptions: true,
                    maxsize: config_1.default.logger.file.maxsize,
                    maxFiles: config_1.default.logger.file.maxFiles,
                }),
                new winston.transports.Console({
                    level: config_1.default.logger.console.level,
                    handleExceptions: true,
                }),
            ],
            exitOnError: false,
        });
        winston.addColors(winston.config.npm.colors);
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }
    getLogMessage(message, context) {
        return context ? `[${context}]: ${message}` : message;
    }
    debug(message, context) {
        this.logger.debug(this.getLogMessage(message, context));
    }
    error(message, trace, context) {
        this.logger.error(this.getLogMessage(message, context));
    }
    log(message, context) {
        this.logger.log(config_1.default.logger.file.level, this.getLogMessage(message, context));
    }
    verbose(message, context) {
        this.logger.verbose(this.getLogMessage(message, context));
    }
    warn(message, context) {
        this.logger.warn(this.getLogMessage(message, context));
    }
};
WinstonLogger = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WinstonLogger);
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=logger.service.js.map