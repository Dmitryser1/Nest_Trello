import { Controller, Post, Body, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../common/decorators/user.decorator';

@ApiTags('columns')
@Controller('users/:userId/columns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post()
    @ApiOperation({ summary: 'Create column' })
    create(
        @Param('userId') userId: string,
        @Body() createColumnDto: CreateColumnDto,
        @GetUser() user: User,
    ) {
        return this.columnsService.create(createColumnDto, user);
    }

    @Get()
    @ApiOperation({ summary: 'Get all columns for a user' })
    findAll(@Param('userId') userId: string) {
        return this.columnsService.findAllByUser(+userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific column for a user' })
    findOne(@Param('userId') userId: string, @Param('id') id: string) {
        return this.columnsService.findOneByUser(+userId, +id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific column for a user' })
    remove(@Param('userId') userId: string, @Param('id') id: string) {
        return this.columnsService.remove(+userId, +id);
    }
}
