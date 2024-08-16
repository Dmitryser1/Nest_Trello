import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return 'Welcome to the Trello Clone API!';
    }
}
