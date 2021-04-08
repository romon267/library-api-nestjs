import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'You can use /users and /books routes, please refer to the docs on github.com/romon267';
  }
}
