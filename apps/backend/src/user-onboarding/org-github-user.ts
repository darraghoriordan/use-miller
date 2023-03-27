import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class OrgGithubUser {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @ApiProperty()
    @Column()
    orgUuid!: string;

    @ApiProperty()
    @Column()
    ghUsername!: string;

    @CreateDateColumn()
    @ApiProperty()
    createdDate!: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updateDate!: Date;
}
