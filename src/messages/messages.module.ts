import { Module } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { MessagesService } from './messages.service';
import {
  commandProviders,
  COMMANDS_PROVIDER_NAME,
} from './commands/manager.command';
import { CommandRegistry } from './command-registry.service';

@Module({
  providers: [
    {
      provide: 'DISCORD_CLIENT',
      useFactory: () => {
        const client = new Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
        });
        client.login(process.env.DISCORD_TOKEN);
        return client;
      },
    },
    {
      provide: COMMANDS_PROVIDER_NAME,
      useFactory: (...commands) => commands,
      inject: commandProviders,
    },
    ...commandProviders,
    CommandRegistry,
    MessagesService,
  ],
})
export class MessagesModule {}
