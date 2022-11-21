import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CoingeckoApiService } from './coingecko-api.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CoingeckoApiService],
  exports: [CoingeckoApiService],
})
export class CoingeckoApiModule {}
