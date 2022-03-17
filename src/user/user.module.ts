/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SettingsModule } from "../settings/settings.module";
import { AuthModule } from "../auth/auth.module";
import { UserPhotoController } from "./userPhoto.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SettingsModule,
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController, UserPhotoController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
