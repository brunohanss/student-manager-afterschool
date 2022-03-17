/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Controller, Get, Post, Put, Body, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('api/settings')
@Controller('api/settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('current')
  async getCurrent(@Req() req) {
    return await this.settingsService.findById(req.user.id);
  }

  @Put('current')
  async editCurrent(@Req() req, @Body() item: Settings) {
    return await this.settingsService.edit(req.user.id, item);
  }

  @Post('current')
  async create(@Body() item: Settings) {
    return await this.settingsService.create(item);
  }

}
