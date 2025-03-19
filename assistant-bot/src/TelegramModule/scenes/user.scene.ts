

import { Scene, SceneEnter, SceneLeave, Command } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/common/interfaces/telegraf-context.interface';
import { SceneEnum } from '../types/scene.enum';


@Scene(SceneEnum.USER_CONSOLE)
export class UserScene {
    @SceneEnter()
    onSceneEnter(): string {
        return 'Привет пользователь';
    }

    @SceneLeave()
    onSceneLeave(): string {
        console.log('Leave from scene');
        return 'Bye Bye 👋';
    }

    @Command(['rng', 'random'])
    onRandomCommand(): number {
        console.log('Use "random" command');
        return Math.floor(Math.random() * 11);
    }

    @Command('leave')
    async onLeaveCommand(ctx: TelegrafContext): Promise<void> {
        await ctx.scene.leave();
    }
}