import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CardEntity } from '../../cards/entities/card.entity';

@Entity('columns')
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => CardEntity, (card) => card.column)
    cards: CardEntity[];
}
