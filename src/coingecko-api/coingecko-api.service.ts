import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Config } from 'src/config/config';
import { CoinGeckoApiResponse, CurrencyType } from 'src/utils';

@Injectable()
export class CoingeckoApiService {
  constructor(
    private readonly configService: ConfigService<Config, true>,
    private readonly httpService: HttpService,
  ) {}

  public async getEuroPriceForToken(
    tokenA: string,
  ): Promise<CoinGeckoApiResponse> {
    return await this.queryCoinGeckoApi(
      `/simple/token_price/ethereum?contract_addresses=${tokenA}&vs_currencies=${CurrencyType.EUR}`,
    );
  }

  public async get2TokenPrices(
    tokenA: string,
    tokenB: string,
    currency: CurrencyType,
  ): Promise<CoinGeckoApiResponse> {
    return await this.queryCoinGeckoApi(
      `/simple/token_price/ethereum?contract_addresses=${tokenA},${tokenB}&vs_currencies=${currency}`,
    );
  }

  private async queryCoinGeckoApi(
    urlPart: string,
  ): Promise<CoinGeckoApiResponse> {
    return (await new Promise((resolve, reject) => {
      this.httpService
        .request({
          method: 'GET',
          url: this.configService.get('coingecko_api_base_url') + urlPart,
        })
        .subscribe({
          next: (r) => resolve(r.data),
          error: (err) => reject(err),
        });
    })) as CoinGeckoApiResponse;
  }
}
