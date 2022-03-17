import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Optional } from "sequelize";
import { UserAttributes } from "./user.schema";
import { AddressSchema } from "./address.schema";
interface PersonCreationAttributes extends Optional<UserAttributes, "id"> {}
@Table({ paranoid: true })
export class User extends Model {
  @Column
  password: string;

  @Column
  salt: string;

  @Column
  login: string;

  @Column
  email: string;

  @Column
  birthday: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  pictureLink: string;

  @Column(DataType.JSON)
  address: AddressSchema;

  @Column
  role: "superadmin" | "admin" | "user";
}
