import { BotCommand } from "telegraf/typings/core/types/typegram";
import { CommandEnum } from "./command.enum";

export const commands: BotCommand[] = [
    {command: CommandEnum.Sessions, description: 'Ближайшие сесиии'},
    {command: CommandEnum.Waiting, description: 'Ожидающие клиенты'},
]