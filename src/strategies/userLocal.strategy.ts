import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@services';
import { User } from '@core/entities';

// @Injectable()
// export class UserLocalStrategy extends PassportStrategy(Strategy, "userLocal") {
//   constructor(private authService: AuthService) {
//     super({
//       usernameField: 'email',
//     });
//   }
//   async validate(email: string, password: string): Promise<User> {
//     return await this.authService.getAuthenticatedUser(email, password);
//   }
// }
