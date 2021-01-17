require("module-alias/register");
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserType } from "@Types/user";

@Entity()
export class User implements UserType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ length: "100", unique: true })
  public name!: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
