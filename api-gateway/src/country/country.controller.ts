import { Controller, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  createCountry() {
    return this.countryService.getCountry();
  }
}
