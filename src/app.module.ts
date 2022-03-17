/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */
import { SequelizeModule } from "@nestjs/sequelize";
import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SettingsModule } from "./settings/settings.module";
import { WinstonModule } from "nest-winston";
import config from "./config";
import { SeedService } from "./core/seed.service";
import { WinstonLogger } from "./core/logger.service";
import { loggers } from "winston";
import { User } from "./user/user.model";
import { SpeechModule } from './speech/speech.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SettingsModule,
    SequelizeModule.forRoot({
      dialect: process.env.SEQ_DIALECT as any,
      host: process.env.SEQ_HOST,
      port: +process.env.SEQ_PORT,
      username: process.env.SEQ_USERNAME,
      password: process.env.SEQ_PASSWORD,
      database: process.env.SEQ_DATABASE,
      models: [User],
      logging: (msg) => Logger.log(msg, "DATABASE INTERACTION", false) as any,
    }),
    WinstonModule.forRoot({
      level: config.logger.file.level,
    }),
    SpeechModule,
    // MailerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, WinstonLogger],
})
export class AppModule {}
