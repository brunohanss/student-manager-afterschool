import { SettingsService } from './settings.service';
import { Settings } from './settings.schema';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getCurrent(req: any): Promise<void>;
    editCurrent(req: any, item: Settings): Promise<void>;
    create(item: Settings): Promise<void>;
}
