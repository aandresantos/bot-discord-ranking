import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'discordx';
import { GatewayIntentBits } from 'discord.js';
import { MessageService } from './services/message.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    simpleCommand: { prefix: '!' },
  });

  bot.once('ready', async () => {
    console.log(`✅ Bot está online!`);

    const messageService = new MessageService(bot);
    const channelId = '1340183642705625098'; // Definir no .env
    await messageService.sendMessage(
      channelId,
      '👋 Olá! Estou online e pronto para ajudar!',
    );

    await bot.initApplicationCommands();
  });

  bot.login(process.env.DISCORD_TOKEN);

  await app.listen(3000);
}
bootstrap();
