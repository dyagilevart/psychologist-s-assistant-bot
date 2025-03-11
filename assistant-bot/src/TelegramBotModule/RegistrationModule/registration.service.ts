import { UserDto } from '@dto/user.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/DatabaseModule/UserModule/user.service';

@Injectable()
export class RegistrationService {
  constructor(private userService: UserService) {}

  async isUserAlreadyRegistered(user: UserDto) {
    if ((await this.userService.getUser(user.id)).length === 1) {
      return true;
    }
    return false;
  }

  async register(user: UserDto) {
    return this.userService.setUser({ userId: user.id, phone: user.phone });
  }
}
