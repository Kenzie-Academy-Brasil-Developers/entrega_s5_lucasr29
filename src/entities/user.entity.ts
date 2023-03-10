import { hashSync } from 'bcryptjs'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, OneToMany } from "typeorm";
import { schedulesUserProperties } from './schedulesUserProperties.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column({unique:true, length: 70})
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column()
  isAdm: boolean

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => schedulesUserProperties, (schedulesUserProperties) => schedulesUserProperties.user)
  schedules: schedulesUserProperties[]

  @BeforeInsert()
  hashPassword(){
    this.password = hashSync(this.password, 10)
  }
}