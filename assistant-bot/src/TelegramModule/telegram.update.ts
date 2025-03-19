import { Command, Ctx, Hears, Start, Update, Sender, On, Message } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';

import { UpdateType } from '../common/decorators/update-type.decorator';
import { TelegrafContext } from 'src/common/interfaces/telegraf-context.interface';
import { RegistrationService } from 'src/BusinessModule/RegistrationModule/registration.service';
import { SceneEnum } from './types/scene.enum';
import { AdminService } from 'src/BusinessModule/AdminModule/admin.service';

@Update()
export class TelegramUpdate {
    constructor(private registrationService: RegistrationService, private adminService: AdminService) { }

    @Start()
    async onStart(
        @Sender('id') id: number,
        @Ctx() ctx: TelegrafContext
    ) {
        if (await this.registrationService.isUserAlreadyRegistered(id)) {
            if (await this.adminService.isAdmin(id)) {
                ctx.scene.enter(SceneEnum.ADMIN_CONSOLE);
            } else {
                ctx.scene.enter(SceneEnum.USER_CONSOLE);
            }

        } else {
            ctx.reply('Подтвердите регистрацию', {
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
        }
    }

    // @Hears(['hi', 'hello', 'hey', 'qq1'])
    // onGreetings(
    //     @UpdateType() updateType: TelegrafUpdateType,
    //     @Sender('first_name') firstName: string,
    // ): string {
    //     return `Hey ${firstName}`;
    // }

    // @Command('scene')
    // async onSceneCommand(@Ctx() ctx: TelegrafContext): Promise<void> {
    //     await ctx.scene.enter('HELLO_SCENE_ID');
    // }
    @On('contact')
    async onContact(@Message() message): Promise<void> {
        void this.registrationService.register({
            id: message.from.id,
            phone: message.contact.phone_number,
        });
    }
}