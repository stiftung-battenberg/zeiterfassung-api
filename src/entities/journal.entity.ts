import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("journals")
export class JournalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  activities: string;

  @Column()
  dayOfWeek: string;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column()
  remarks: string;

}

