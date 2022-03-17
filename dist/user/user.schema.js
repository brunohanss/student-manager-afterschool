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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const address_schema_1 = require("./address.schema");
const settings_schema_1 = require("../settings/settings.schema");
class UserDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "pictureLink", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", address_schema_1.AddressDto)
], UserDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", settings_schema_1.SettingsDto)
], UserDto.prototype, "settings", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.schema.js.map