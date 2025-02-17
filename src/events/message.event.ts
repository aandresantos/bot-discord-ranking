import { Discord, On } from 'discordx';
import { Message } from 'discord.js';

@Discord()
export class MessageEvent {
  @On({ event: 'messageCreate' })
  async onMessage(message: Message): Promise<void> {
    if (message.content.toLowerCase() === 'oi bot') {
      await message.reply('Olá, como posso ajudar? 😊');
    }
  }
}
