import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../app.roles";


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: Roles, default: Roles.USER})
  roles?: Roles;

}

