import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
export class schedulesUserProperties{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    date: Date

    @Column({type: 'time'})
    time: Date

    @ManyToOne(() => Properties, {nullable: false})
    @JoinColumn()
    property: string

    @ManyToOne(() => User, {nullable: false})
    @JoinColumn()
    user: string
}