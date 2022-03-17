import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { SpeechService } from "./speech.service";
import { AudioInput } from "./speech.types";

@ApiUseTags("api/speech")
@Controller("api/speech")
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post("prononciation")
  async getCurrent(@Body() audioInput: AudioInput) {
    console.log(audioInput);
    if (
      !audioInput ||
      audioInput === undefined ||
      !audioInput.text ||
      !audioInput.audio
    ) {
      return new UnprocessableEntityException();
    }
    return await this.speechService.fromArrayBuffer(audioInput.audio);
  }
}
