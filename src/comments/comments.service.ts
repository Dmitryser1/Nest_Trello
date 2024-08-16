import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CardEntity } from '../cards/entities/card.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentsRepository: Repository<CommentEntity>,
    ) {}

    async create(createCommentDto: CreateCommentDto, card: CardEntity): Promise<CommentEntity> {
        const comment = this.commentsRepository.create({
            ...createCommentDto,
            card,
        });

        return this.commentsRepository.save(comment);
    }

    async findAllByCard(cardId: number): Promise<CommentEntity[]> {
        return this.commentsRepository.find({
            where: { card: { id: cardId } },
        });
    }

    async remove(cardId: number, commentId: number): Promise<void> {
        const comment = await this.commentsRepository.findOne({
            where: { id: commentId, card: { id: cardId } },
        });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found for card ${cardId}`);
        }

        await this.commentsRepository.remove(comment);
    }
}
