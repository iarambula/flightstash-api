import { Aircraft } from './Aircraft';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { UserOrganizationRole } from "./UserOrganizationRole";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserOrganizationRole, role => role.organization)
  roles: UserOrganizationRole[];

  @OneToMany(() => Aircraft, aircraft => aircraft.organization)
  aircraft: Aircraft[];

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
