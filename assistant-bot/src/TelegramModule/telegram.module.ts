import { TelegramUpdate } from './telegram.update';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { RandomNumberScene } from './scenes/random-number.scene';
import { sessionMiddleware } from './middleware/session.middleware';
import { BusinessModule } from 'src/BusinessModule/business.module';
import { AdminScene } from './scenes/AdminScene/admin.scene';
import { UserScene } from './scenes/user.scene';

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                token: configService.get<string>('token') || '',
                middlewares: [sessionMiddleware]
            }),
            inject: [ConfigService],
        }),
        BusinessModule
    ],
    providers: [TelegramUpdate, RandomNumberScene, AdminScene, UserScene],
})
export class TelegramModule { }
