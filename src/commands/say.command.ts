import { Discord, Slash, SlashOption } from 'discordx';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { MessageService } from '../services/message.service';
import { Inject } from '@nestjs/common';

@Discord()
export class SayCommand {
  constructor(
    @Inject(MessageService) private readonly messageService: MessageService,
  ) {}

  @Slash({ name: 'falar', description: 'Faz o bot enviar uma mensagem' })
  async say(
    @SlashOption({
      name: 'mensagem',
      description: 'Texto para enviar',
      type: ApplicationCommandOptionType.Attachment,
    })
    mensagem: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    const channelId = interaction.channelId;
    await this.messageService.sendMessage(channelId, mensagem);
    await interaction.reply('✅ Mensagem enviada!');
  }
}
