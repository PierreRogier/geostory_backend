import { InternalServerErrorException } from '@nestjs/common';

export class ServerException extends InternalServerErrorException {
  constructor() {
    super('Oops, une erreur est survenue...');
  }
}
