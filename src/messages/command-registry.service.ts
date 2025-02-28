import { Injectable, Inject } from '@nestjs/common';
import { ICommand } from './commands/ICommand.interface';
import { COMMANDS_PROVIDER_NAME } from './commands/manager.command';

@Injectable()
export class CommandRegistry {
  private commands = new Map<string, ICommand>();

  constructor(
    @Inject(COMMANDS_PROVIDER_NAME) private readonly commandList: ICommand[],
  ) {
    this.commandList.forEach((command) => this.register(command));
  }

  register(command: ICommand): void {
    this.commands.set(command.name, command);
  }

  getCommand(name: string): ICommand | undefined {
    return this.commands.get(name);
  }
}
