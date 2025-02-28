import { PingCommand } from './ping.command';

export const COMMANDS_PROVIDER_NAME = 'COMMANDS_MANAGER';

export const commandProviders = [
  PingCommand,
  // Adicione novos comandos aqui
];
