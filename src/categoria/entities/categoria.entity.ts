import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "../../tarefa/entities/tarefa.entity";

@Entity('tb_categoria')
export class Categoria{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(400)
    @Column({nullable: false, length: 400})
    desricao: string

    @ManyToOne (() => Categoria, (categoria) => categoria.tarefas, {
        onDelete: "CASCADE"
    })
    tarefas: Tarefa[]

}