import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Organization } from "./Organization";
import { Reservation } from "./Reservation";

@Entity()
export class Aircraft {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, organization => organization.aircraft, { onDelete: "CASCADE" })
  organization: Organization;

  @OneToMany(() => Reservation, reservation => reservation.aircraft)
  reservations: Reservation[];

  @Column()
  registration: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
