/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { ApiModelProperty } from "@nestjs/swagger";
import { Address, AddressDto, AddressSchema } from "./address.schema";
import { Settings, SettingsDto } from "../settings/settings.schema";

export interface UserAttributes {
  id: number;
  password: string;
  salt: string;
  login: string;
  email: string;
  age: Number;
  firstName: string;
  lastName: string;
  address: AddressSchema;
  role: {
    type: string;
    enum: ["admin", "user"];
  };
}

export interface User {
  id?: string;
  password?: string;
  salt?: string;
  birthday: string;
  login: string;
  pictureLink: string;
  age?: number;
  firstName?: string;
  email?: string;
  lastName?: string;
  role: "superadmin" | "admin" | "user";
  address?: Address;
}

// used as controller output or DTO class to make swagger documentation working
export class UserDto {
  id?: string;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  birthday?: string;

  @ApiModelProperty()
  pictureLink?: string;

  @ApiModelProperty()
  firstName?: string;

  @ApiModelProperty()
  lastName?: string;

  @ApiModelProperty()
  role: "superadmin" | "admin" | "user";

  @ApiModelProperty()
  address?: AddressDto;

  @ApiModelProperty()
  settings?: SettingsDto;
}
