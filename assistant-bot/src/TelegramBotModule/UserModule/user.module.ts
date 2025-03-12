import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule as DatabaseUserModule } from 'src/DatabaseModule/UserModule/user.module';

@Module({
  imports: [DatabaseUserModule],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
