import { TelegramBotModule } from './TelegramBotModule/telegrambot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import teleramConfig from './config/telegram.config';

import { DatabaseModule } from './DatabaseModule/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, teleramConfig],
    }),
    DatabaseModule,
    TelegramBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
