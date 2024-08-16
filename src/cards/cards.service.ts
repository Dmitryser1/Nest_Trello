import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { ColumnEntity } from '../columns/entities/column.entity';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(CardEntity)
        private cardsRepository: Repository<CardEntity>,
    ) {}

    async create(createCardDto: CreateCardDto, column: ColumnEntity): Promise<CardEntity> {
        const card = this.cardsRepository.create({
            ...createCardDto,
            column,
        });

        return this.cardsRepository.save(card);
    }

    async findAllByColumn(columnId: number): Promise<CardEntity[]> {
        return this.cardsRepository.find({
            where: { column: { id: columnId } },
            relations: ['comments'],
        });
    }

    async findOneByColumn(columnId: number, cardId: number): Promise<CardEntity> {
        const card = await this.cardsRepository.findOne({
            where: { id: cardId, column: { id: columnId } },
            relations: ['comments'],
        });

        if (!card) {
            throw new NotFoundException(`Card with ID ${cardId} not found for column ${columnId}`);
        }

        return card;
    }

    async remove(columnId: number, cardId: number): Promise<void> {
        const card = await this.findOneByColumn(columnId, cardId);

        await this.cardsRepository.remove(card);
    }
}
