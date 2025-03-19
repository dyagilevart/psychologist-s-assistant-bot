import { Command, Ctx, Hears, Start, Update, Sender } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';

import { UpdateType } from '../common/decorators/update-type.decorator';
import { TelegrafContext } from 'src/common/interfaces/telegraf-context.interface';

@Update()
export class TelegramUpdate {
  @Start()
  onStart(): string {
    return 'Say hello to me';
  }

  @Hears(['hi', 'hello', 'hey', 'qq1'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    return `Hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: TelegrafContext): Promise<void> {
    await ctx.scene.enter('HELLO_SCENE_ID');
  }

  @Command('wizard')
  async onWizardCommand(@Ctx() ctx: TelegrafContext): Promise<void> {
    await ctx.scene.enter('WIZARD_SCENE_ID');
  }
}