/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Schema, Document } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export const SettingsSchema = new Schema({
  themeName: String,
});

export interface Settings extends Document {
  id?: string;
  themeName: string;
}

// used as controller output or DTO class to make swagger documentation working
export class SettingsDto {
  @ApiModelProperty()
  themeName: string;
}
