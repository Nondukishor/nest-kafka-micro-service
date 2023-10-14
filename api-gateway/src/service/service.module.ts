import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { service } from './service.config';
@Module({
  imports: [ClientsModule.register(service)],
  exports: [ClientsModule],
})
export class ServiceModule {}
