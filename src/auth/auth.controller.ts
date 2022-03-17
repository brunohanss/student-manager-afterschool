/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Login } from "./interfaces/login.dto";
import { Email } from "./interfaces/email.dto";
import { ResetPassword } from "./interfaces/reset-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { SignUp } from "./interfaces/signUp.dto";
import { TokensDto } from "./interfaces/tokens.dto";
import { error } from "winston";

@ApiUseTags("api/auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  // @UseGuards(AuthGuard("local"))
  public async login(@Body() login: Login, @Req() req) {
    console.log(login);
    return await this.authService.signIn(login);
  }

  @Post("sign-up")
  async signUp(@Body() userDto: SignUp) {
    try {
      const result = await this.authService.signUp(userDto);
      console.log("result", result);
      return result;
    } catch (error) {
      console.log("Error", error);
      return error;
    }
  }

  @Post("reset-pass")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async resetPass(@Body() resetPass: ResetPassword, @Req() req, @Res() res) {
    const { id } = req.user;
    return await this.authService
      .resetPassword(resetPass, id)
      .then(() => res.status(200).send({ message: "ok" }))
      .catch((err) => {
        res.status(400).send({ error: err.message });
      });
  }

  @Post("request-pass")
  async requestPass(@Body() email: Email, @Res() res) {
    return await this.authService.requestPassword(email.email).then(() =>
      res.status(200).send({
        message: `Email with reset password instructions was sent to email ${email.email}.`,
      })
    );
  }

  @Post("sign-out")
  @ApiBearerAuth()
  async signOut(@Body() email: Email, @Res() res) {
    res.status(200).send({ message: "ok" });
  }

  @Post("refresh-token")
  async refreshToken(@Body() tokens: TokensDto, @Res() res) {
    return await this.authService
      .refreshToken(tokens)
      .then((returnTokens) => res.send(returnTokens))
      .catch((err) => res.status(400).send({ error: err.message }));
  }
}
