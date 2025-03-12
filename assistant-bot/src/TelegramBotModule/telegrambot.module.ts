import { TelegrambotService } from './telegrambot.service';
import { TelegrambotController } from './telegrambot.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './RegistrationModule/registration.module';
import { AdminModule } from './AdminModule/admin.module';
import { UserModule } from './UserModule/user.module';

@Module({
  imports: [ConfigModule, RegistrationModule, AdminModule, UserModule],
  controllers: [TelegrambotController],
  providers: [TelegrambotService],
})
export class TelegramBotModule {}
