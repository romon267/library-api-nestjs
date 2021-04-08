import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly booksService: BooksService,
  ) {}

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).populate('books');
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof Error.CastError) {
        throw new BadRequestException('Wrong id format');
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { name, abonnement } = updateUserDto;
    console.log('abonnement', typeof abonnement, abonnement);
    user.name = name || user.name;
    if (abonnement !== undefined) {
      user.abonnement = abonnement;
    }
    await user.save();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  async changeAbonnementStatus(id: string, status: boolean) {
    const user = await this.findOne(id);
    user.abonnement = status;
    await user.save();
    return user;
  }

  async addBook(userId: string, bookId: string) {
    const user = await this.findOne(userId);
    this.validateUser(user);
    const book = await this.booksService.findOne(bookId);
    this.validateBook(book);
    user.books.push(book._id);
    await book.updateOne({ client: user._id });
    await user.save();
    return user.populate('books').execPopulate();
  }

  async removeBook(userId: string, bookId: string) {
    const user = await this.findOne(userId);
    const book = await this.booksService.findOne(bookId);
    user.books = user.books.filter(
      (b) => b._id.toString() !== bookId.toString(),
    );
    await user.save();
    await book.updateOne({ client: undefined });
    return user;
  }

  validateUser(user: User) {
    if (!user.abonnement) {
      throw new BadRequestException('User has no abonnement');
    } else if (user.books.length >= 5) {
      throw new BadRequestException('User has too many books');
    }
  }

  validateBook(book: Book) {
    if (book.client) {
      throw new BadRequestException('Book was already taken');
    }
  }
}
