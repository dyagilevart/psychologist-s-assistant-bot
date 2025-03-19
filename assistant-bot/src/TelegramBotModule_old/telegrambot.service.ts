import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Scenes, session, Telegraf } from 'telegraf';
import { RegistrationService } from './RegistrationModule/registration.service';
import { Scene } from './types/scene.enum';
import { AdminService } from './AdminModule/admin.service';
import { TelegramContext } from './types/context';
import { UserService } from './UserModule/user.service';

@Injectable()
export class TelegrambotService {
  private currentScene = new Scenes.BaseScene<TelegramContext>(Scene.INIT);

  _bot: Telegraf<TelegramContext>;
  public get bot() {
    return this._bot;
  }

  constructor(
    config: ConfigService,
    public registration: RegistrationService,
    public adminService: AdminService,
  ) {
    const token: string | undefined = config.get('token');

    if (token) {
      this._bot = new Telegraf<TelegramContext>(token);
    } else {
      throw new Error('Не указан токен телеграм бота');
    }
  }

  initScene() {
    this.currentScene.enter((ctx) => {
      console.log('FIRST SCENE', ctx);
    });
  }

  startBot() {
    this.initScene();

    const stages = new Scenes.Stage<TelegramContext>([this.currentScene]);
    this.bot.use(session());
    this.bot.use(stages.middleware());

    this.bot.start((ctx) => ctx.scene.enter(Scene.INIT));

    void this._bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => this._bot.stop('SIGINT'));
    process.once('SIGTERM', () => this._bot.stop('SIGTERM'));
  }

  init() {
    this._bot.start(async (ctx) => {
      if (await this.registration.isUserAlreadyRegistered(ctx.message.from.id)) {
        if (await this.adminService.isAdmin(ctx.message.from.id)) {
          const stage = new Scenes.Stage<TelegramContext>([
            AdminService.currentScene,
          ]);
          this._bot.use(session());
          this._bot.use(stage.middleware());
          ctx.scene.enter(Scene.ADMIN_CONSOLE);
        } else {
          const stage = new Scenes.Stage<TelegramContext>([
            UserService.currentScene,
          ]);
          this._bot.use(session());
          this._bot.use(stage.middleware());
          ctx.scene.enter(Scene.USER_CONSOLE);
        }
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
  }

  // test() {
  //   startScene.enter((ctx) => {
  //     console.log('FIRST SCENE', ctx);
  //   });

  //   const stages = new Scenes.Stage<TelegramContext>([startScene]);
  //   this.bot.use(session());
  //   this.bot.use(stages.middleware());

  //   this.bot.start((ctx) => ctx.scene.enter('SceneInitial'));
  //   this.bot.launch();
  // }
}
