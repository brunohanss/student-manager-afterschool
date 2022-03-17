/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CryptoService } from "../auth/crypto.service";
import { WinstonLogger } from "./logger.service";

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly loggerService: WinstonLogger
  ) {}

  //  public checkAndSeed() {
  //     this.loggerService.log('Seed data');
  //     this.userService.getCount()
  //       .then(count => {
  //         if (!count) {
  //           this.seed().then();
  //         }
  //       });
  //   }

  //   // function to add stub data for testing
  //   private async seed() {
  //     try {
  //       this.loggerService.log('Seed Data');
  //       await this.addCustomUsers();
  //       await this.addRandomUsers(this.getNames());
  //       this.loggerService.log('Seed Users Done');
  //     } catch (err) {
  //       this.loggerService.error(err);
  //     }
  //   }

  //   private addCustomUsers() {
  //     // add 2 custom users
  //     const usersToAdd = [];
  //     let hashedPassword = this.cryptoService.hashPassword('!2e4S');
  //     const admin = {
  //       firstName: 'Admin',
  //       lastName: 'Admin',
  //       email: 'admin@admin.admin',
  //       login: '@Admin',
  //       role: 'admin',
  //       age: 18,
  //       salt: hashedPassword.salt,
  //       password: hashedPassword.hash,
  //     };
  //     usersToAdd.push(admin);

  //     hashedPassword = this.cryptoService.hashPassword('12345');
  //     const user = {
  //       firstName: 'User',
  //       lastName: 'User',
  //       email: 'user@user.user',
  //       login: '@User',
  //       role: 'user',
  //       age: 18,
  //       salt: hashedPassword.salt,
  //       password: hashedPassword.hash,
  //     };
  //     usersToAdd.push(user);
  //     return this.userService.addMany(usersToAdd);
  //   }

  //   private addRandomUsers(names) {
  //     const usersToAdd = [];
  //     for (let i = 0; i < 30; i++) {
  //       const hashedPassword = this.cryptoService.hashPassword(`pass_${i}`);
  //       const firstName = names[i].split(' ')[0];
  //       const lastName = names[i].split(' ')[1];
  //       const newUser = {
  //         email: `${firstName.toLowerCase()}_${lastName.toLowerCase()}@user.com`,
  //         login: `@User_${firstName}_${lastName}`,
  //         firstName,
  //         lastName,
  //         role: 'user',
  //         age: 18,
  //         salt: hashedPassword.salt,
  //         password: hashedPassword.hash,
  //       };
  //       usersToAdd.push(newUser);
  //     }

  //     return this.userService.addMany(usersToAdd);
  //   }

  //   private getNames() {
  //     /* tslint:disable */
  //     return ['Rostand Simon', 'Petulia Samuel', 'Bacon Mathghamhain', 'Adlei Michael', 'Damian IvorJohn', 'Fredenburg Neil', 'Strader O\'\'Neal', 'Meill Donnell', 'Crowell O\'\'Donnell',
  //       'Lenssen Rory', 'Jac Names', 'Budge Mahoney', 'Bondy Simon', 'Bilow Ahearn', 'Weintrob Farrell', 'Tristan Cathasach', 'Baxy Bradach', 'Utta Damhan', 'Brag Treasach',
  //       'Vallie Kelly', 'Trutko Aodha', 'Mellins Cennetig', 'Zurek Casey', 'Star O\'\'Neal', 'Hoffer Names', 'Sturges Macshuibhne', 'Lifton Sioda', 'Rochell Ahearn', 'Lynsey Mcmahon',
  //       'Delp Seaghdha', 'Sproul O\'\'Brien', 'Omar Ahearn', 'Keriann Bhrighde', 'Killoran Sullivan', 'Olette Riagain', 'Kohn Gorman', 'Shimberg Maurice', 'Nalda Aodh',
  //       'Livvie Casey', 'Zoie Treasach', 'Kletter Daly', 'Sandy Mckay', 'Ern O\'\'Neal', 'Loats Maciomhair', 'Marlena Mulryan', 'Hoshi Naoimhin', 'Schmitt Whalen',
  //       'Patterson Raghailligh', 'Ardeen Kelly', 'Rasla Simon', 'Douty Cennetig', 'Giguere Names', 'Dorina Clark', 'Rothmuller Simon', 'Shabbir Delaney', 'Placidia Bradach',
  //       'Savior Keefe', 'Concettina Maguire', 'Malynda Muirchertach', 'Vanzant Fearghal', 'Schroder Ruaidh', 'Ainslie Ciardha', 'Richter Colman', 'Gianni Macghabhann',
  //       'Norvan O\'\'Boyle', 'Polak Mcneil', 'Bridges Macghabhann', 'Eisenberg Samuel', 'Thenna Daly', 'Moina Mcmahon', 'Gasper Whelan', 'Hutt O\'\'Keefe', 'Quintin Names',
  //       'Towny Reynold', 'Viviane Ceallachan', 'Girovard Power', 'Fanchon Flann', 'Nickolai Meadhra', 'Polash Login', 'Cacilia Macghabhann', 'Chaffee Rory', 'Baseler Conchobhar',
  //       'Amathiste Cuidightheach', 'Ishii Riagain', 'Marieann Damhan', 'Rangel Dubhain', 'Alarick Fionn', 'Humfrey Rory', 'Mable O\'\'Mooney', 'Jemie Macdermott', 'Hogen Rhys',
  //       'Cazzie Mohan', 'Airlie Reynold', 'Safire O\'\'Hannigain', 'Strephonn Nuallan', 'Brion Eoghan', 'Banquer Seaghdha', 'Sedgewinn Mcguire', 'Alma Macghabhann', 'Durward Mcnab'];
  //     /* tslint:enable */
  //   }
}
