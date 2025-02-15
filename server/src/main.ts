import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './util/filter.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 📌 Activer CORS pour autoriser le frontend React
  app.enableCors({
    origin: ['https://3005-issaouisaifeddin-crud-utetbb6fh5o.ws-eu117.gitpod.io'], // Remplace par ton domaine en prod
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permet les cookies et l'authentification
  });

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

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
}
bootstrap();
