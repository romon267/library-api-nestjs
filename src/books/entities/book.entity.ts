import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Book extends mongoose.Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: undefined,
  })
  client: User | undefined;
}

export const BookSchema = SchemaFactory.createForClass(Book);
