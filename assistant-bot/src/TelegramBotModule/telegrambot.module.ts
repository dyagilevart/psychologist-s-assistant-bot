import { TelegrambotService } from './telegrambot.service';
import { TelegrambotController } from './telegrambot.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TelegrambotController],
  providers: [TelegrambotService],
})
export class TelegramBotModule {}
