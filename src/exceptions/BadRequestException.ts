import { BadRequestException } from '@nestjs/common';

export class UniqueDistrictException extends BadRequestException {
  constructor() {
    super('Ce département existe déjà');
  }
}

export class UniqueEmailException extends BadRequestException {
  constructor() {
    super('Cet email est déjà utilisé');
  }
}
export class UniqueStoryException extends BadRequestException {
  constructor() {
    super('Cette histoire existe déjà');
  }
}

export class WrongCredentialsException extends BadRequestException {
  constructor() {
    super("Mauvaise combinaison entre l'email et le mot de passe");
  }
}
