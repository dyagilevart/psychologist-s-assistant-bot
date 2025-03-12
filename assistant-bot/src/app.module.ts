import { UserModule } from './TelegramBotModule/UserModule/user.module';
import { AdminModule } from './TelegramBotModule/AdminModule/admin.module';
import { UserModule as DatabaseUserModule } from './DatabaseModule/UserModule/user.module';
import { RegistrationModule } from './TelegramBotModule/RegistrationModule/registration.module';
import { TelegramBotModule } from './TelegramBotModule/telegrambot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import teleramConfig from './config/telegram.config';

import { DatabaseModule } from './DatabaseModule/database.module';

@Module({
  imports: [
    UserModule,
    AdminModule,
    UserModule,
    DatabaseUserModule,
    RegistrationModule,
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
