import { Module } from '@nestjs/common';
import { AccountBalancesService } from './account-balances.service';
import { AccountBalancesController } from './account-balances.controller';
import { CoingeckoApiModule } from 'src/coingecko-api/coingecko-api.module';

@Module({
  imports: [CoingeckoApiModule],
  controllers: [AccountBalancesController],
  providers: [AccountBalancesService],
})
export class AccountBalancesModule {}
