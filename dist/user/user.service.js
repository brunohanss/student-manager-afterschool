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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../settings/settings.service");
const crypto_service_1 = require("../auth/crypto.service");
const user_model_1 = require("./user.model");
let UserService = UserService_1 = class UserService {
    constructor(cryptoService, settingsService) {
        this.cryptoService = cryptoService;
        this.settingsService = settingsService;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.create(user);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ where: { id: id } });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ where: { email: email } });
        });
    }
    updateCurrent(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.edit(id, user).then((editedUser) => {
                return this.cryptoService.generateResponseTokens(editedUser);
            });
        });
    }
    edit(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.User.findOne({ where: { id: id } });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }
            return UserService_1.mapUserToDto((yield user_model_1.User.update(user, { where: { id: id } }))[1][0]);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.destroy({ where: { id: id } });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.findAll();
            const usersReturn = [];
            users.forEach((user) => {
                usersReturn.push(UserService_1.mapUserToDto(user));
            });
            return usersReturn;
        });
    }
    changePassword(id, salt, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.update({ password: password }, { where: { id: id } });
        });
    }
    _isDuplicateEmail(users, userId) {
        if (users && users.length === 0) {
            return false;
        }
        if (users.length > 1) {
            return true;
        }
        return users.some((user) => user._id.toString() !== userId.toString());
    }
    static mapUser(user) {
        if (user) {
            user.id = user.id;
        }
        return user;
    }
    static mapUserToDto(user) {
        return user
            ? {
                id: user.id,
                login: user.login,
                email: user.email,
                birthday: user.birthday,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                address: UserService_1.mapAddressToDto(user.address),
            }
            : undefined;
    }
    static mapAddressToDto(address) {
        return address
            ? {
                city: address.city,
                street: address.street,
                zipCode: address.zipCode,
            }
            : {
                city: "",
                street: "",
                zipCode: "",
            };
    }
};
UserService = UserService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [crypto_service_1.CryptoService,
        settings_service_1.SettingsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map