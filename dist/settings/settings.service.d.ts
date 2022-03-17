import { Settings } from "./settings.schema";
export declare class SettingsService {
    constructor();
    create(item: any): Promise<void>;
    findById(id: string): Promise<void>;
    edit(id: string, item: Settings): Promise<void>;
    static mapSettingToDto(item: Settings): void;
}
