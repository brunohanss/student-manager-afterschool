/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.dto";
import config from "../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passReqToCallback: false,
      secretOrKey: config.auth.jwt.accessTokenSecret,
    });
    console.log("validate");
  }

  async validate(payload: JwtPayload) {
    console.log("validate");
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
