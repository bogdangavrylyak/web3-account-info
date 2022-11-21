import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenAddressNotFoundError extends HttpException {
  constructor(message = 'Token Address Was Not Found In CoinGecko') {
    super(
      {
        statusCode: 400,
        message: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
