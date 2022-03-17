"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechService = void 0;
const common_1 = require("@nestjs/common");
const microsoft_cognitiveservices_speech_sdk_1 = require("microsoft-cognitiveservices-speech-sdk");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
let SpeechService = class SpeechService {
    constructor() {
        this.speechConfig = sdk.SpeechConfig.fromSubscription("81ff936ec8ae411c9925d0b8c0619745", "francecentral");
        this.pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig("reference text", microsoft_cognitiveservices_speech_sdk_1.PronunciationAssessmentGradingSystem.HundredMark, microsoft_cognitiveservices_speech_sdk_1.PronunciationAssessmentGranularity.Word, true);
    }
    fromArrayBuffer(speechInput) {
        let pushStream = sdk.AudioInputStream.createPushStream();
        pushStream.write(speechInput);
        pushStream.close();
        let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
        this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
        this.recognizer.recognizeOnceAsync((result) => {
            const pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(result);
            const pronunciationScore = pronunciationAssessmentResult.pronunciationScore;
            const wordLevelResult = pronunciationAssessmentResult.detailResult.Words;
            console.log("Prononciation assessment results are :", pronunciationAssessmentResult);
        }, {});
        this.recognizer.recognizeOnceAsync((result) => {
            console.log(`RECOGNIZED: Text=${result.text}`);
            this.recognizer.close();
        });
    }
    toArrayBuffer(text) {
    }
};
SpeechService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SpeechService);
exports.SpeechService = SpeechService;
//# sourceMappingURL=speech.service.js.map