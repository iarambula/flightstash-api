import bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Reservation } from "./Reservation";
import { UserOrganizationRole } from './UserOrganizationRole';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserOrganizationRole, role => role.user)
  roles: UserOrganizationRole[];

  @OneToMany(() => Reservation, reservation => reservation.owner)
  reservations: Reservation[];

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
