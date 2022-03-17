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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const crypto_service_1 = require("./crypto.service");
const email_service_1 = require("../core/email.service");
const config_1 = require("../config");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userService, cryptoService, emailService) {
        this.userService = userService;
        this.cryptoService = cryptoService;
        this.emailService = emailService;
    }
    getTokenPayload(user) {
        return {
            email: user.email,
            role: user.role,
            id: user.id,
        };
    }
    signUp(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService
                    .findByEmail(userDto.email)
                    .then((existingUser) => {
                    if (existingUser && existingUser.id) {
                        return {
                            error: "error",
                            message: "User with this email already exists",
                        };
                    }
                    const password = this.cryptoService.hashPassword(userDto.password);
                    const user = {
                        email: userDto.email,
                        login: userDto.fullName,
                        password: password.hash,
                        salt: password.salt,
                        role: "user",
                    };
                    return this.userService.create(user).then((newUser) => {
                        const token = this.cryptoService.generateResponseTokens(newUser);
                        return { token };
                    });
                });
            }
            catch (error) {
                return error;
            }
        });
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.cryptoService.generateResponseTokens(yield this.logIn(user.email, user.password));
            console.log(token);
            return { token };
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findByEmail(payload.email);
        });
    }
    logIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService
                .findByEmail(email)
                .then((user) => {
                console.log("User is: ", user);
                if (user && user.id) {
                    return this.cryptoService.checkPassword(user.password, user.salt, password)
                        ? Promise.resolve(user)
                        : Promise.reject(new common_1.UnauthorizedException("Invalid username or password"));
                }
                else {
                    return Promise.reject(new common_1.UnauthorizedException("Invalid username or password"));
                }
            })
                .catch((err) => Promise.reject(err));
        });
    }
    resetPassword(resetPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUserId = userId;
            if (resetPassword.password.length < 4) {
                throw new Error("Password should be longer than 6 characters");
            }
            if (resetPassword.password !== resetPassword.confirmPassword) {
                throw new Error("Password and its confirmation do not match.");
            }
            if (resetPassword.resetPasswordToken) {
                const tokenContent = this.cryptoService.decipherResetPasswordToken(resetPassword.resetPasswordToken);
                currentUserId = tokenContent.userId;
                if (new Date().getTime() > tokenContent.valid) {
                    throw new Error("Reset password token has expired.");
                }
            }
            const password = this.cryptoService.hashPassword(resetPassword.password);
        });
    }
    requestPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    refreshToken(tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tokens.access_token || !tokens.refresh_token) {
                throw new Error("Invalid token format");
            }
            let tokenContent;
            try {
                tokenContent = jwt.verify(tokens.refresh_token, config_1.default.auth.jwt.refreshTokenSecret);
            }
            catch (err) {
                throw new Error("Invalid refresh token");
            }
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        crypto_service_1.CryptoService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map