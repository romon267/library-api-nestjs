import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const books = await this.bookModel.find().skip(offset).limit(limit).exec();
    return books;
  }

  async findOne(id: string) {
    try {
      const book = await this.bookModel.findById(id).populate('client');
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      if (error instanceof Error.CastError) {
        throw new BadRequestException('Wrong id format');
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('Book not found');
      }
    }
  }

  async create(createBookDto: CreateBookDto) {
    const newBook: Book = new this.bookModel(createBookDto);
    return await newBook.save();
  }

  async updateById(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    const { title, author } = updateBookDto;
    book.title = title || book.title;
    book.author = author || book.author;
    await book.save();
    return book;
  }

  async removeById(id: string) {
    const book = await this.findOne(id);
    await book.remove();
    return {
      book: book,
      removed: true,
    };
  }
}
