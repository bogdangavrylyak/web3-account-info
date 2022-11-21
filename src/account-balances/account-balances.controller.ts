import { Controller, Get, Query } from '@nestjs/common';
import { AccountBalancesService } from './account-balances.service';

@Controller('account-balances')
export class AccountBalancesController {
  constructor(
    private readonly accountBalancesService: AccountBalancesService,
  ) {}

  @Get('')
  getAccountData(
    @Query('account') account: string,
    @Query('tokenA') tokenA: string,
    @Query('tokenB') tokenB: string,
  ) {
    return this.accountBalancesService.getAccountData(account, tokenA, tokenB);
  }
}
