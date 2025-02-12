import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import {
  ValidationException,
  ValidationFilter,
} from './util/filter.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ✅ Convertit automatiquement les types
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errMsg = {};
        errors.forEach((err) => {
          errMsg[err.property] = err.constraints ? Object.values(err.constraints) : [];
        });
        return new ValidationException(errMsg);
      },
    }),
  );
  
  

  const port = process.env.PORT;
  await app.listen(5000);
}
bootstrap();
