import { TelegrambotService } from './telegrambot.service';
import { TelegrambotController } from './telegrambot.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './RegistrationModule/registration.module';

@Module({
  imports: [ConfigModule, RegistrationModule],
  controllers: [TelegrambotController],
  providers: [TelegrambotService],
})
export class TelegramBotModule {}
