import { Controller } from '@nestjs/common';
import { TelegrambotService } from './telegrambot.service';

@Controller()
export class TelegrambotController {
  constructor(private readonly telegrambotService: TelegrambotService) {
    this.telegrambotService.init();
  }
}
