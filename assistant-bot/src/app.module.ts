import { UserModule as DatabaseUserModule } from './DatabaseModule/UserModule/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import teleramConfig from './config/telegram.config';

import { DatabaseModule } from './DatabaseModule/database.module';
import { TelegramModule } from './TelegramModule/telegram.module';

@Module({
  imports: [

    DatabaseUserModule,

    ConfigModule.forRoot({
      load: [dbConfig, teleramConfig],
    }),
    DatabaseModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
