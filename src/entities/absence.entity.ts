import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('absences')
export class AbsenceEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  firstName: string;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column()
  reason: string;

  @Column()
  remarks?: string;

}

