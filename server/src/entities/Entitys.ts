import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export default abstract class Entity extends BaseEntity {
    // Entity의 기본 키 열 설정
    @PrimaryGeneratedColumn()
    // TODO id! 일단 이렇게 처리했는데 이렇게 처리되도 되는지 확인해야할 것
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}