import { ICommand } from './ICommand.interface';
import { Message } from 'discord.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PingCommand implements ICommand {
  name = 'ping';
  description = 'Responde com Pong!';

  async execute(message: Message, args: string[]): Promise<void> {
    console.log(args);
    await message.reply('Pong!');
  }
}
