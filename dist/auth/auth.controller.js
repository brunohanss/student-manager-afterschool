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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./interfaces/login.dto");
const email_dto_1 = require("./interfaces/email.dto");
const reset_password_dto_1 = require("./interfaces/reset-password.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const signUp_dto_1 = require("./interfaces/signUp.dto");
const tokens_dto_1 = require("./interfaces/tokens.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(login, req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(login);
            return yield this.authService.signIn(login);
        });
    }
    signUp(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.signUp(userDto);
                console.log("result", result);
                return result;
            }
            catch (error) {
                console.log("Error", error);
                return error;
            }
        });
    }
    resetPass(resetPass, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            return yield this.authService
                .resetPassword(resetPass, id)
                .then(() => res.status(200).send({ message: "ok" }))
                .catch((err) => {
                res.status(400).send({ error: err.message });
            });
        });
    }
    requestPass(email, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.requestPassword(email.email).then(() => res.status(200).send({
                message: `Email with reset password instructions was sent to email ${email.email}.`,
            }));
        });
    }
    signOut(email, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send({ message: "ok" });
        });
    }
    refreshToken(tokens, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService
                .refreshToken(tokens)
                .then((returnTokens) => res.send(returnTokens))
                .catch((err) => res.status(400).send({ error: err.message }));
        });
    }
};
__decorate([
    common_1.Post("login"),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.Login, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post("sign-up"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUp]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post("reset-pass"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPassword, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPass", null);
__decorate([
    common_1.Post("request-pass"),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.Email, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPass", null);
__decorate([
    common_1.Post("sign-out"),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.Email, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    common_1.Post("refresh-token"),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tokens_dto_1.TokensDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    swagger_1.ApiUseTags("api/auth"),
    common_1.Controller("api/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map