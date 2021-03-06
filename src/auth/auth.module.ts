/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import config from '../config';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { CryptoService } from './crypto.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './passport/local.strategy';
import { EmailService } from '../core/email.service';
import { SettingsService } from '../settings/settings.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: config.auth.jwt.accessTokenSecret,
      signOptions: {
        expiresIn: config.auth.jwt.accessTokenLife,
      },
    }),
    UserModule,
    SettingsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    SettingsService,
    CryptoService,
    EmailService,
    Logger,
  ],
  exports: [PassportModule, AuthService, CryptoService],
})
export class AuthModule {}
