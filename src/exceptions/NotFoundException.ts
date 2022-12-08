import { NotFoundException } from '@nestjs/common';

export class DistrictNotFoundException extends NotFoundException {
  constructor() {
    super("Ce département n'existe pas");
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("Cet utilisateur n'existe pas");
  }
}

export class StoryNotFoundException extends NotFoundException {
  constructor() {
    super("Cette histoire n'existe pas");
  }
}
