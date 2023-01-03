import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address} from "./addresses.entity";
import { Categories } from "./categories.entity";
import { schedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity('properties')
export class Properties{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: false})
    sold: boolean;

    @Column()
    value: number

    @Column()
    size: number

    @BeforeInsert()
    @CreateDateColumn()
    createdAt: Date

    @BeforeUpdate()
    @CreateDateColumn()
    updatedAt: Date

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Categories, (categories) => categories.properties, {nullable: false})
    @JoinColumn()
    category: Categories

    @OneToMany(() => schedulesUserProperties, (schedulesUsersProperties) => schedulesUsersProperties.property)
    schedules: schedulesUserProperties[];
}