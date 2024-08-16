import { Controller, Post, Body, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ColumnEntity } from '../columns/entities/column.entity';
import { ColumnsService } from '../columns/columns.service';

@ApiTags('cards')
@Controller('users/:userId/columns/:columnId/cards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CardsController {
    constructor(
        private readonly cardsService: CardsService,
        private readonly columnsService: ColumnsService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create card' })
    async create(
        @Param('columnId') columnId: string,
        @Body() createCardDto: CreateCardDto,
    ) {
        const column = await this.columnsService.findOneByUser(+columnId, +columnId);
        return this.cardsService.create(createCardDto, column);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cards for a column' })
    findAll(@Param('columnId') columnId: string) {
        return this.cardsService.findAllByColumn(+columnId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific card for a column' })
    findOne(@Param('columnId') columnId: string, @Param('id') id: string) {
        return this.cardsService.findOneByColumn(+columnId, +id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific card for a column' })
    remove(@Param('columnId') columnId: string, @Param('id') id: string) {
        return this.cardsService.remove(+columnId, +id);
    }
}
