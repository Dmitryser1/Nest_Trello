import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardEntity } from './entities/card.entity';
import { ColumnsModule } from '../columns/columns.module';

@Module({
    imports: [TypeOrmModule.forFeature([CardEntity]), ColumnsModule],
    controllers: [CardsController],
    providers: [CardsService],
    exports: [CardsService],
})
export class CardsModule {}
