export declare class SpeechService {
    speechConfig: any;
    pronunciationAssessmentConfig: any;
    recognizer: any;
    constructor();
    fromArrayBuffer(speechInput: ArrayBuffer): void;
    toArrayBuffer(text: string): void;
}
