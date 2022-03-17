import { Schema, Document } from 'mongoose';
export declare const SettingsSchema: Schema<any, import("mongoose").Model<any, any, any, any>, any, any>;
export interface Settings extends Document {
    id?: string;
    themeName: string;
}
export declare class SettingsDto {
    themeName: string;
}
