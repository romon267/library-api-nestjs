import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('abonnement/:id')
  addAbonnementToUser(@Param('id') id: string) {
    return this.userService.changeAbonnementStatus(id, true);
  }

  @Delete('abonnement/:id')
  removeAbonnementFromUser(@Param('id') id: string) {
    return this.userService.changeAbonnementStatus(id, false);
  }

  @Post(':userId/:bookId')
  addBookToUser(@Param() params: { userId: string; bookId: string }) {
    const { userId, bookId } = params;
    return this.userService.addBook(userId, bookId);
  }

  @Delete(':userId/:bookId')
  removeBookFromUser(@Param() params: { userId: string; bookId: string }) {
    const { userId, bookId } = params;
    return this.userService.removeBook(userId, bookId);
  }

  @Patch(':id')
  editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
