import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [ConfigModule.forRoot(), RankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
