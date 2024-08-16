import { Controller, Post, Body, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CardsService } from '../cards/cards.service';

@ApiTags('comments')
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly cardsService: CardsService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create comment' })
    async create(
        @Param('cardId') cardId: string,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        const card = await this.cardsService.findOneByColumn(+cardId, +cardId);
        return this.commentsService.create(createCommentDto, card);
    }

    @Get()
    @ApiOperation({ summary: 'Get all comments for a card' })
    findAll(@Param('cardId') cardId: string) {
        return this.commentsService.findAllByCard(+cardId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific comment for a card' })
    remove(@Param('cardId') cardId: string, @Param('id') id: string) {
        return this.commentsService.remove(+cardId, +id);
    }
}
