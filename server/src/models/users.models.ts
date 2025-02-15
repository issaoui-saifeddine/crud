
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<user>;

@Schema()
export class user {
  @Prop()
  fullname: string;
  @Prop()
  email: string;

  @Prop()
  age: number;
  @Prop()
  country: string;

}

export const userSchema = SchemaFactory.createForClass(user);
