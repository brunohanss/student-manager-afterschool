import { UnprocessableEntityException } from "@nestjs/common";
import { SpeechService } from "./speech.service";
import { AudioInput } from "./speech.types";
export declare class SpeechController {
    private readonly speechService;
    constructor(speechService: SpeechService);
    getCurrent(audioInput: AudioInput): Promise<void | UnprocessableEntityException>;
}
