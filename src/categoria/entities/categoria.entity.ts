import { IsNotEmpty, MaxLength } from "class-validator";
import { Tarefa } from "src/tarefa/entities/tarefa.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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