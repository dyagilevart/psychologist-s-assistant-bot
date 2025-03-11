import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { RegistrationService } from './RegistrationModule/registration.service';

@Injectable()
export class TelegrambotService {
  _bot: Telegraf;
  public get bot() {
    return this._bot;
  }

  constructor(
    config: ConfigService,
    public registration: RegistrationService,
  ) {
    const token: string | undefined = config.get('token');

    if (token) {
      this._bot = new Telegraf(token);
    } else {
      throw new Error('Не указан токен телеграм бота');
    }
  }

  init() {
    this._bot.start(async (ctx) => {
      void ctx.reply('Привет!');
      if (await this.registration.isUserAlreadyRegistered(ctx.message.from)) {
        void ctx.reply('Я тебя знаю');
      } else {
        void ctx.reply('Please send your contact by pressing your contact', {
          reply_markup: {
            keyboard: [
              [
                {
                  text: '📲 Send phone number',
                  request_contact: true,
                },
              ],
            ],
            one_time_keyboard: true,
          },
        });
        this._bot.on('contact', (ctx) => {
          void this.registration.register({
            id: ctx.message.from.id,
            phone: ctx.message.contact.phone_number,
          });
        });
      }
    });
    void this._bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => this._bot.stop('SIGINT'));
    process.once('SIGTERM', () => this._bot.stop('SIGTERM'));
  }
}
