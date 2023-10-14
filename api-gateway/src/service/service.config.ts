import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

export const service: ClientsModuleOptions = [
  {
    name: 'AUTH_MICROSERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-service',
        brokers: ['broker:29092'],
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'auth-consumer',
      },
      producer: {
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      run: {
        autoCommit: true,
        autoCommitInterval: 5000,
        autoCommitThreshold: 1000,
        // eachBatchAutoResolve: true,
        partitionsConsumedConcurrently: 5,
      },
    },
  },

  {
    name: 'COUNTRY_MICROSERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'country-microservice',
        brokers: ['broker:29092'],
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'country-consumer',
      },
    },
  },

  {
    name: 'NOTIFICATION_MICROSERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['broker:29092'],
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  },
];
