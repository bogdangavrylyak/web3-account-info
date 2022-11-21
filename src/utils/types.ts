export enum CurrencyType {
  USD = 'usd',
  EUR = 'eur',
}

export type CoinGeckoApiResponse = Partial<
  Record<string, Record<CurrencyType, string>>
>;
