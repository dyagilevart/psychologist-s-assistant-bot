import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

@Injectable()
export class TelegrambotService {
  _bot: Telegraf;
  public get bot() {
    return this._bot;
  }

  constructor(config: ConfigService) {
    const token: string | undefined = config.get('token');

    if (token) {
      this._bot = new Telegraf(token);
    } else {
      throw new Error('Не указан токен телеграм бота');
    }
  }

  init() {
    this._bot.start((ctx) => ctx.reply('Welcome'));
    this._bot.help((ctx) => ctx.reply('Send me a sticker'));
    this._bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    this._bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    this._bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => this._bot.stop('SIGINT'));
    process.once('SIGTERM', () => this._bot.stop('SIGTERM'));
  }
}
