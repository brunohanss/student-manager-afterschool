import { Address, AddressDto, AddressSchema } from "./address.schema";
import { SettingsDto } from "../settings/settings.schema";
export interface UserAttributes {
    id: number;
    password: string;
    salt: string;
    login: string;
    email: string;
    age: Number;
    firstName: string;
    lastName: string;
    address: AddressSchema;
    role: {
        type: string;
        enum: ["admin", "user"];
    };
}
export interface User {
    id?: string;
    password?: string;
    salt?: string;
    birthday: string;
    login: string;
    pictureLink: string;
    age?: number;
    firstName?: string;
    email?: string;
    lastName?: string;
    role: "superadmin" | "admin" | "user";
    address?: Address;
}
export declare class UserDto {
    id?: string;
    login: string;
    email: string;
    birthday?: string;
    pictureLink?: string;
    firstName?: string;
    lastName?: string;
    role: "superadmin" | "admin" | "user";
    address?: AddressDto;
    settings?: SettingsDto;
}
