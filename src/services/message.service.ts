import { Injectable } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js';

@Injectable()
export class MessageService {
  constructor(private readonly client: Client) {}

  async sendMessage(channelId: string, message: string): Promise<void> {
    const channel = this.client.channels.cache.get(channelId) as TextChannel;
    if (!channel) {
      console.error(`❌ Canal não encontrado: ${channelId}`);
      return;
    }
    await channel.send(message);
  }
}
