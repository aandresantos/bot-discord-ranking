import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { CommandRegistry } from './command-registry.service';

@Injectable()
export class MessagesService implements OnModuleInit {
  constructor(
    @Inject('DISCORD_CLIENT') private readonly client: Client,
    private readonly commandRegistry: CommandRegistry,
  ) {}

  onModuleInit() {
    this.client.on('messageCreate', async (message: Message) => {
      if (message.author.bot) return;
      if (!message.content.startsWith('!')) return;

      const args = message.content.slice(1).trim().split(/ +/);
      const commandName = args.shift()?.toLowerCase();
      if (!commandName) return;

      const command = this.commandRegistry.getCommand(commandName);
      if (!command) {
        await message.reply(`Comando não encontrado: ${commandName}`);
        return;
      }

      try {
        await command.execute(message, args);
      } catch (error) {
        console.error(`Erro ao executar o comando ${commandName}:`, error);
        await message.reply('Ocorreu um erro ao executar o comando.');
      }
    });
  }
}
