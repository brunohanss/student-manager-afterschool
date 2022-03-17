/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { SeedService } from "./core/seed.service";
import { Sequelize } from "sequelize-typescript";
import { User } from "./user/user.model";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seedService: SeedService,
    private sequelize: Sequelize
  ) {
    this.sequelize.authenticate();
    // User.sync({ force: true });
  }

  @Get()
  healthCheck(): string {
    return this.appService.getApiStatus();
  }
}
