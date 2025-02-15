import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot('mongodb://admin:password@mongodb:27017/'),UsersModule],

})
export class AppModule {}
