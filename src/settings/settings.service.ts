/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Settings, SettingsDto } from "./settings.schema";

@Injectable()
export class SettingsService {
  constructor() // @InjectModel('Settings') private readonly settingsModel: Model<Settings>
  {}

  public async create(
    item: any // : Promise<SettingsDto>
  ) {
    // const newItem = new this.settingsModel(item);
    // return await newItem.save()
    //   .then(result => SettingsService.mapSettingToDto(result));
  }

  public async findById(
    id: string // : Promise<SettingsDto>
  ) {
    // return await this.settingsModel.findById(id).exec()
    //   .then(item => SettingsService.mapSettingToDto(item));
  }

  public async edit(
    id: string,
    item: Settings // : Promise<SettingsDto>
  ) {
    // return await this.settingsModel.updateOne(
    //   { _id: id }, item, { upsert: true  }).exec()
    //   .then(() => SettingsService.mapSettingToDto(item)); // mongoose will not return updated object
  }

  public static mapSettingToDto(
    item: Settings // : SettingsDto | undefined
  ) {
    // return item ? {
    //   themeName: item.themeName,
    // } : undefined;
  }
}
