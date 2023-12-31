import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,

      options: {
        client: {
          brokers: ['broker:29092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
