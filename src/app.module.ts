import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AccountBalancesModule } from './account-balances/account-balances.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      expandVariables: true,
      cache: false,
      ignoreEnvFile: true,
      ignoreEnvVars: true,
    }),
    AccountBalancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
