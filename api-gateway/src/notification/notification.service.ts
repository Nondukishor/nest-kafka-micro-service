import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_MICROSERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  sendNotification() {
    this.authClient.emit(
      'send_notification',
      JSON.stringify({ name: 'bangladesh' }),
    );
  }
}
