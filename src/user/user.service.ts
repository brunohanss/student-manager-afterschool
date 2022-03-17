/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Injectable } from "@nestjs/common";
import { User, UserDto } from "./user.schema";
import { Address, AddressDto } from "./address.schema";
import { SettingsService } from "../settings/settings.service";
import { CryptoService } from "../auth/crypto.service";
import { TokensDto } from "../auth/interfaces/tokens.dto";
import { User as UserModel } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    // @InjectModel('User') private readonly userModel: Model<User>,
    private readonly cryptoService: CryptoService,
    private readonly settingsService: SettingsService
  ) {}

  public async create(user: any): Promise<UserDto> {
    return UserModel.create(user);
  }

  public async findById(id: string): Promise<UserDto> {
    return await UserModel.findOne({ where: { id: id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await UserModel.findOne({ where: { email: email } });
  }

  public async updateCurrent(id: string, user: User): Promise<TokensDto> {
    return await this.edit(id, user).then((editedUser) => {
      return this.cryptoService.generateResponseTokens(editedUser);
    });
  }

  public async edit(id: string, user: User): Promise<UserDto> {
    const existingUser = await UserModel.findOne({ where: { id: id } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    return UserService.mapUserToDto(
      (await UserModel.update(user, { where: { id: id } }))[1][0]
    ); // mongoose will not return updated object
  }

  public async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id: id } });
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await UserModel.findAll();
    const usersReturn: UserDto[] = [];
    users.forEach((user: UserModel) => {
      usersReturn.push(UserService.mapUserToDto(user));
    });
    return usersReturn;
  }

  public async changePassword(
    id: string,
    salt: string,
    password: string
  ): Promise<void> {
    await UserModel.update({ password: password }, { where: { id: id } });
  }

  private _isDuplicateEmail(users, userId) {
    if (users && users.length === 0) {
      return false;
    }

    if (users.length > 1) {
      return true;
    }

    return users.some((user) => user._id.toString() !== userId.toString());
  }

  // for internal usage only
  private static mapUser(user: User): User | undefined {
    if (user) {
      user.id = user.id;
    }
    return user;
  }

  private static mapUserToDto(user: User): UserDto | undefined {
    return user
      ? {
          id: user.id,
          login: user.login,
          email: user.email,
          birthday: user.birthday,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          address: UserService.mapAddressToDto(user.address),
        }
      : undefined;
  }

  private static mapAddressToDto(address: Address): AddressDto {
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
}
