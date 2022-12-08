import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Story } from './story.entity';

@Entity()
export class District extends BaseEntity {
  @Column({ unique: true })
  districtName: string;

  @Column({ unique: true })
  zip_code: string;

  @OneToMany(() => Story, (story: Story) => story.district, {
    cascade: true,
  })
  stories: Story[];

  @OneToMany(() => User, (user: User) => user.district, {
    cascade: true,
  })
  users: User[];
}
