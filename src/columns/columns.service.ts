import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnsRepository: Repository<ColumnEntity>,
    ) {}

    async create(createColumnDto: CreateColumnDto, user: User): Promise<ColumnEntity> {
        const column = this.columnsRepository.create({
            ...createColumnDto,
            user,
        });

        return this.columnsRepository.save(column);
    }

    async findAllByUser(userId: number): Promise<ColumnEntity[]> {
        return this.columnsRepository.find({
            where: { user: { id: userId } },
            relations: ['cards'],
        });
    }

    async findOneByUser(userId: number, columnId: number): Promise<ColumnEntity> {
        const column = await this.columnsRepository.findOne({
            where: { id: columnId, user: { id: userId } },
            relations: ['cards'],
        });

        if (!column) {
            throw new NotFoundException(`Column with ID ${columnId} not found for user ${userId}`);
        }

        return column;
    }

    async remove(userId: number, columnId: number): Promise<void> {
        const column = await this.findOneByUser(userId, columnId);

        await this.columnsRepository.remove(column);
    }
}
