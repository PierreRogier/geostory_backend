import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { District } from './district.entity';
import { User } from './user.entity';

@Entity()
export class Story extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @ManyToOne(() => District, (district: District) => district.stories, {
    onDelete: 'CASCADE',
  })
  district: District;

  @OneToOne(() => User)
  @JoinColumn()
  author: User;
}
