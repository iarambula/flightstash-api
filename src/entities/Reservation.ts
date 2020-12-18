import { Frequency } from "rrule";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Aircraft } from "./Aircraft";
import { User } from "./User";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aircraft, aircraft => aircraft.reservations, { onDelete: "CASCADE" })
  aircraft: Aircraft;

  @ManyToOne(() => User, user => user.reservations, { onDelete: "CASCADE" })
  owner: User;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column({ type: "enum", enum: Frequency })
  frequency: Frequency;

  @Column()
  until: Date;

  @Column()
  count: number;

  @Column()
  interval: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
