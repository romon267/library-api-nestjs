import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/books/entities/book.entity';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop()
  name: string;

  @Prop({ default: false })
  abonnement: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books: Book[];
}

export const UserSchema = SchemaFactory.createForClass(User);
