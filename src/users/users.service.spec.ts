import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUserModel = () => {
  findOne: jest.fn();
  create: jest.fn();
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        BooksService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Book.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findOne', () => {
  //   describe('when id is valid and user exists', () => {
  //     it('should return correct user object', async () => {
  //       service.moc
  //     });
  //   });

  //   describe('when id is valid but user not exists', () => {
  //     it('should return "not found exception"', () => {

  //     });
  //   });
  // });
});
