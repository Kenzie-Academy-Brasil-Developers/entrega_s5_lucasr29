import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";

@Entity('categories')
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 30, nullable: false})
    name: string

    @OneToMany(() => Properties, (properties) => properties.category)
    properties: Properties[]
}