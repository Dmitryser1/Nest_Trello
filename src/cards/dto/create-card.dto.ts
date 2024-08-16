import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
