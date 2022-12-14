import { Entity, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { District } from './district.entity';
import { UserRoles } from '../enums';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.EDITOR })
  userRole: string;

  @ManyToOne(() => District, (district: District) => district.users, {
    onDelete: 'CASCADE',
  })
  district: District;
}
