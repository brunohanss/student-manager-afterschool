/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import {
  pbkdf2Sync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from "crypto";
import { Injectable } from "@nestjs/common";
import { User, UserDto } from "../user/user.schema";
import config from "../config";

import jwt = require("jsonwebtoken");

@Injectable()
export class CryptoService {
  private readonly cipherAlgorythm: string = "aes256";
  private readonly hashAlgorythm: string = "sha512";
  private readonly inputEncoding: string = "utf8";
  private readonly outputEncoding: BufferEncoding = "hex";
  private readonly SPLITTER_IV: string = ":";

  public generateResponseTokens(user: User | UserDto) {
    const normalizedUser = { id: user.id, role: user.role, email: user.email };

    const accessToken: string = jwt.sign(
      normalizedUser,
      config.auth.jwt.accessTokenSecret,
      { expiresIn: config.auth.jwt.accessTokenLife }
    );
    const refreshToken: string = jwt.sign(
      normalizedUser,
      config.auth.jwt.refreshTokenSecret,
      { expiresIn: config.auth.jwt.refreshTokenLife }
    );
    return {
      expires_in: config.auth.jwt.accessTokenLife,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private getHash(password: string, salt: string) {
    // Generate Hash using Password based key derivative function (PBKDF2)
    return pbkdf2Sync(password, salt, 2048, 32, this.hashAlgorythm).toString(
      this.outputEncoding
    );
  }

  public hashPassword(password: string) {
    // Salt is a pseudo-random data buffer contains raw bytes represented in hex
    const salt = randomBytes(32).toString(this.outputEncoding);
    const hash = this.getHash(password, salt);
    // Return the salt + hash of the password
    return { salt, hash };
  }

  public checkPassword(
    originalHash: string,
    salt: string,
    candidatePassword: string
  ) {
    const hash = this.getHash(candidatePassword, salt);
    return hash === originalHash;
  }

  public generateResetPasswordToken(id: string): string {
    const text = JSON.stringify({
      id,
      valid: new Date().getTime() + config.auth.resetPassword.ttl,
    });

    const iv = randomBytes(16);

    const cipher = createCipheriv(
      this.cipherAlgorythm,
      config.auth.resetPassword.secret.substring(0, 32),
      iv
    );
    let token = cipher.update(
      text
      // this.inputEncoding as Utf8AsciiBinaryEncoding
    );
    token = Buffer.concat([token, cipher.final()]);

    return `${iv.toString(this.outputEncoding)}${
      this.SPLITTER_IV
    }${token.toString(this.outputEncoding)}`;
  }

  public decipherResetPasswordToken(token: string) {
    const parts = token.split(this.SPLITTER_IV);
    const iv = Buffer.from(parts.shift(), this.outputEncoding);
    const tokenBody = Buffer.from(
      parts.join(this.SPLITTER_IV),
      this.outputEncoding
    );

    const decipher = createDecipheriv(
      this.cipherAlgorythm,
      config.auth.resetPassword.secret.substring(0, 32),
      iv
    );
    let decrypted = decipher.update(tokenBody);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }
}
