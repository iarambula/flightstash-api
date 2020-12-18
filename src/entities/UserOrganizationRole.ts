import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Organization } from "./Organization";
import { User } from "./User";

export enum RoleName {
  OWNER = "owner",
  MEMBER = "member"
}

@Entity()
export class UserOrganizationRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.roles, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Organization, organization => organization.roles, { cascade: true, onDelete: "CASCADE" })
  organization: Organization;

  @Column({ type: "enum", enum: RoleName })
  name: RoleName;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
