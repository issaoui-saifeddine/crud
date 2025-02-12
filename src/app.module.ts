import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot('mongodb+srv://crud:crud@cluster0.n7sqp.mongodb.net/'),UsersModule],

})
export class AppModule {}
