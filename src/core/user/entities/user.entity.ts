import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Timestamp } from "typeorm";
import { Role } from "../../../shared/enums/role.enum";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id_user?: number;

    @Column()
    name_user: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @Column({
        default: Role.User
    })
    role: number;
}