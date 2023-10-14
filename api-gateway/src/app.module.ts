import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './service/service.module';
import { CountryModule } from './country/country.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [AuthModule, ServiceModule, CountryModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
