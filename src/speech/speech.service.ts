import { Injectable } from "@nestjs/common";
import {
  PronunciationAssessmentGradingSystem,
  PronunciationAssessmentGranularity,
} from "microsoft-cognitiveservices-speech-sdk";
const sdk = require("microsoft-cognitiveservices-speech-sdk");

@Injectable()
export class SpeechService {
  speechConfig = sdk.SpeechConfig.fromSubscription(
    "81ff936ec8ae411c9925d0b8c0619745",
    "francecentral"
  );
  pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
    "reference text",
    PronunciationAssessmentGradingSystem.HundredMark,
    PronunciationAssessmentGranularity.Word,
    true
  );
  recognizer: any;

  constructor() {}
  /**
Method to retieve prononciation assessment from audio
@param speechInput ArrayBuffer from audio
@return Prononciation assessment
*/
  fromArrayBuffer(speechInput: ArrayBuffer) {
    let pushStream = sdk.AudioInputStream.createPushStream();
    pushStream.write(speechInput);
    pushStream.close();
    let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
    this.recognizer.recognizeOnceAsync((result) => {
      const pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(
        result
      );
      const pronunciationScore =
        pronunciationAssessmentResult.pronunciationScore;
      const wordLevelResult = pronunciationAssessmentResult.detailResult.Words;
      console.log(
        "Prononciation assessment results are :",
        pronunciationAssessmentResult
      );
    }, {});
    this.recognizer.recognizeOnceAsync((result) => {
      console.log(`RECOGNIZED: Text=${result.text}`);
      this.recognizer.close();
    });
  }
  toArrayBuffer(text: string) {
    // Implement function text to speech
  }
}
