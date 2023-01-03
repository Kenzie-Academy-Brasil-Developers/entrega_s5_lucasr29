import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
export class schedulesUserProperties{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @ManyToOne(() => Properties,(properties) => properties.schedules)
    @JoinColumn()
    property: Properties

    @ManyToOne(() => User, (user) => user.schedules)
    @JoinColumn()
    user: User
}