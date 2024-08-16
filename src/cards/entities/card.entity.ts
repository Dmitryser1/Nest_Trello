import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../../columns/entities/column.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';

@Entity('cards')
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => ColumnEntity, (column) => column.cards, { onDelete: 'CASCADE' })
    column: ColumnEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.card)
    comments: CommentEntity[];
}
