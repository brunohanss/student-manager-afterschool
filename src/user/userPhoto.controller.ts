import { ApiUseTags } from "@nestjs/swagger";
import { Controller, Get, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";

import path = require("path");

@ApiUseTags("api/users")
@Controller("api/users")
export class UserPhotoController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId/photo")
  async getCurrent(@Req() req, @Res() res) {
    // return await this.userService
    //     .getPhoto(req.query.token)
    //     .then(photo => {
    //         const filePath = path.join(__dirname, `../../assets/${photo}`);
    //         res.sendFile(filePath);
    //     }).catch((error) => {
    //     res.status(400).send({ error: error.message });
    // });
  }
}
