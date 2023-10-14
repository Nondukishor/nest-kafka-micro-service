import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CountryService {
  constructor(
    @Inject('COUNTRY_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  getCountry() {
    this.authClient.emit('create_user', JSON.stringify({ name: 'bangladesh' }));
  }
}
