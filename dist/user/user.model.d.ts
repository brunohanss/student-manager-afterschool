import { Model } from "sequelize-typescript";
import { AddressSchema } from "./address.schema";
export declare class User extends Model {
    password: string;
    salt: string;
    login: string;
    email: string;
    birthday: string;
    firstName: string;
    lastName: string;
    pictureLink: string;
    address: AddressSchema;
    role: "superadmin" | "admin" | "user";
}
