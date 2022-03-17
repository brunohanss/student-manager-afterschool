/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.dto";
import { UserDto } from "../user/user.schema";
import { CryptoService } from "./crypto.service";
import { SignUp } from "./interfaces/signUp.dto";
import { ResetPassword } from "./interfaces/reset-password.dto";
import { EmailService } from "../core/email.service";
import { TokensDto } from "./interfaces/tokens.dto";

import config from "../config";
import jwt = require("jsonwebtoken");
import { User } from "src/user/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly emailService: EmailService
  ) {}

  private getTokenPayload(user: User | UserDto): JwtPayload {
    return {
      email: user.email,
      role: user.role,
      id: user.id,
    };
  }

  public async signUp(userDto: SignUp): Promise<any> {
    try {
      return await this.userService
        .findByEmail(userDto.email)
        .then((existingUser) => {
          if (existingUser && existingUser.id) {
            return {
              error: "error",
              message: "User with this email already exists",
            } as any;
          }
          const password = this.cryptoService.hashPassword(userDto.password);
          const user = {
            email: userDto.email,
            login: userDto.fullName,
            password: password.hash,
            salt: password.salt,
            role: "user",
          };
          return this.userService.create(user).then((newUser) => {
            const token: TokensDto = this.cryptoService.generateResponseTokens(
              newUser
            );
            return { token };
          });
        });
    } catch (error) {
      return error;
    }
  }

  public async signIn(user): Promise<any> {
    const token: TokensDto = this.cryptoService.generateResponseTokens(
      await this.logIn(user.email, user.password)
    );
    console.log(token);
    return { token };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  // used in local auth strategy
  public async logIn(email, password) {
    return await this.userService
      .findByEmail(email)
      .then((user) => {
        console.log("User is: ", user);
        if (user && user.id) {
          return this.cryptoService.checkPassword(
            user.password,
            user.salt,
            password
          )
            ? Promise.resolve(user)
            : Promise.reject(
                new UnauthorizedException("Invalid username or password")
              );
        } else {
          return Promise.reject(
            new UnauthorizedException("Invalid username or password")
          );
        }
      })
      .catch((err) => Promise.reject(err));
  }

  public async resetPassword(resetPassword: ResetPassword, userId: string) {
    let currentUserId = userId;

    if (resetPassword.password.length < 4) {
      throw new Error("Password should be longer than 6 characters");
    }

    if (resetPassword.password !== resetPassword.confirmPassword) {
      throw new Error("Password and its confirmation do not match.");
    }

    if (resetPassword.resetPasswordToken) {
      const tokenContent = this.cryptoService.decipherResetPasswordToken(
        resetPassword.resetPasswordToken
      );
      currentUserId = tokenContent.userId;

      if (new Date().getTime() > tokenContent.valid) {
        throw new Error("Reset password token has expired.");
      }
    }

    const password = this.cryptoService.hashPassword(resetPassword.password);
    // return this.userService.changePassword(currentUserId, password.salt, password.hash);
  }

  public async requestPassword(email: string) {
    // return await this.userService.findByEmail(email)
    //   .then(user => {
    //     if (user && user.id) {
    //       const resetPasswordToken = this.cryptoService.generateResetPasswordToken(user.id);
    //       return this.emailService.sendResetPasswordEmail(
    //         email, `${user.firstName} ${user.lastName}`, resetPasswordToken);
    //     }
    //     throw new Error('There is no such email in the system');
    //   });
  }

  public async refreshToken(tokens: any) {
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error("Invalid token format");
    }

    let tokenContent;

    try {
      tokenContent = jwt.verify(
        tokens.refresh_token,
        config.auth.jwt.refreshTokenSecret
      );
    } catch (err) {
      throw new Error("Invalid refresh token");
    }

    // return this.userService.findById(tokenContent.id).then(user => {
    //     return this.cryptoService.generateResponseTokens(user);
    // });
  }
}
