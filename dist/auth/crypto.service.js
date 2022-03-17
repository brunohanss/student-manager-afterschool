"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const jwt = require("jsonwebtoken");
let CryptoService = class CryptoService {
    constructor() {
        this.cipherAlgorythm = "aes256";
        this.hashAlgorythm = "sha512";
        this.inputEncoding = "utf8";
        this.outputEncoding = "hex";
        this.SPLITTER_IV = ":";
    }
    generateResponseTokens(user) {
        const normalizedUser = { id: user.id, role: user.role, email: user.email };
        const accessToken = jwt.sign(normalizedUser, config_1.default.auth.jwt.accessTokenSecret, { expiresIn: config_1.default.auth.jwt.accessTokenLife });
        const refreshToken = jwt.sign(normalizedUser, config_1.default.auth.jwt.refreshTokenSecret, { expiresIn: config_1.default.auth.jwt.refreshTokenLife });
        return {
            expires_in: config_1.default.auth.jwt.accessTokenLife,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    getHash(password, salt) {
        return crypto_1.pbkdf2Sync(password, salt, 2048, 32, this.hashAlgorythm).toString(this.outputEncoding);
    }
    hashPassword(password) {
        const salt = crypto_1.randomBytes(32).toString(this.outputEncoding);
        const hash = this.getHash(password, salt);
        return { salt, hash };
    }
    checkPassword(originalHash, salt, candidatePassword) {
        const hash = this.getHash(candidatePassword, salt);
        return hash === originalHash;
    }
    generateResetPasswordToken(id) {
        const text = JSON.stringify({
            id,
            valid: new Date().getTime() + config_1.default.auth.resetPassword.ttl,
        });
        const iv = crypto_1.randomBytes(16);
        const cipher = crypto_1.createCipheriv(this.cipherAlgorythm, config_1.default.auth.resetPassword.secret.substring(0, 32), iv);
        let token = cipher.update(text);
        token = Buffer.concat([token, cipher.final()]);
        return `${iv.toString(this.outputEncoding)}${this.SPLITTER_IV}${token.toString(this.outputEncoding)}`;
    }
    decipherResetPasswordToken(token) {
        const parts = token.split(this.SPLITTER_IV);
        const iv = Buffer.from(parts.shift(), this.outputEncoding);
        const tokenBody = Buffer.from(parts.join(this.SPLITTER_IV), this.outputEncoding);
        const decipher = crypto_1.createDecipheriv(this.cipherAlgorythm, config_1.default.auth.resetPassword.secret.substring(0, 32), iv);
        let decrypted = decipher.update(tokenBody);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    }
};
CryptoService = __decorate([
    common_1.Injectable()
], CryptoService);
exports.CryptoService = CryptoService;
//# sourceMappingURL=crypto.service.js.map