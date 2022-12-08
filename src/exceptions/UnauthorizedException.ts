import {  UnauthorizedException } from '@nestjs/common';

export class UnauthorizedUserException extends UnauthorizedException {
  constructor() {
    super('Accés non autorisés');
  }
}
