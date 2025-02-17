import { Discord, Slash } from 'discordx';
import { CommandInteraction } from 'discord.js';

@Discord()
export class PingCommand {
  @Slash({ name: 'ping', description: 'Verifica se o bot está ativo' })
  async ping(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('🏓 Pong!');
  }
}
