/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Module } from "@nestjs/common";
import { SettingsSchema } from "./settings.schema";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
