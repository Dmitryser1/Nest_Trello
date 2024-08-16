import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from '../../cards/entities/card.entity';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
    card: CardEntity;
}
