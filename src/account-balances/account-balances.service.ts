import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import { CurrencyType, ERC20Abi, roundTo } from 'src/utils';
import { CoingeckoApiService } from 'src/coingecko-api/coingecko-api.service';
import { TokenAddressNotFoundError } from 'src/error';

@Injectable()
export class AccountBalancesService {
  constructor(private readonly coingeckoApiService: CoingeckoApiService) {}

  public async getAccountData(account: string, tokenA: string, tokenB: string) {
    try {
      const provider = ethers.getDefaultProvider();
      const erc20Contract = new ethers.Contract(tokenA, ERC20Abi, provider);

      const accountTokenA = (await erc20Contract.balanceOf(
        account,
      )) as BigNumber;

      const balance1 = roundTo(+accountTokenA.div(1000000).toString(), 2);

      const balance2 = await this.calculateTokenToTokenPrice(
        tokenA,
        tokenB,
        accountTokenA.toString(),
      );

      const balance3 = await this.calculateTokenToEuroPrice(
        tokenA,
        accountTokenA.toString(),
      );

      return {
        balance1,
        balance2,
        balance3,
      };
    } catch (error) {
      if (error.code === 'CALL_EXCEPTION') {
        throw new HttpException(
          'Possibly wrong token address',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  private async calculateTokenToEuroPrice(token: string, tokenAmount: string) {
    const tokenEuroPriceResponse =
      await this.coingeckoApiService.getEuroPriceForToken(token);

    if (!tokenEuroPriceResponse[token]) {
      throw new TokenAddressNotFoundError();
    }

    const euroTokenBalance =
      tokenEuroPriceResponse[token.toLowerCase()][CurrencyType.EUR];

    const tokenEuroPrice = roundTo(
      (+euroTokenBalance * +tokenAmount) / 1000000,
      2,
    );

    return tokenEuroPrice;
  }

  private async calculateTokenToTokenPrice(
    tokenA: string,
    tokenB: string,
    tokenA_Amount: string,
  ) {
    const response = await this.coingeckoApiService.get2TokenPrices(
      tokenA,
      tokenB,
      CurrencyType.USD,
    );

    if (!response[tokenA.toLowerCase()] || !response[tokenB.toLowerCase()]) {
      throw new TokenAddressNotFoundError();
    }

    const tokenAPrice = response[tokenA.toLowerCase()][CurrencyType.USD];
    const tokenBPrice = response[tokenB.toLowerCase()][CurrencyType.USD];

    const tokenB_Amount = roundTo(
      (+tokenA_Amount * +tokenBPrice) / +tokenAPrice / 1000000,
      2,
    );

    return tokenB_Amount;
  }
}
