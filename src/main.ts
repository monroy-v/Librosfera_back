import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  console.log("Cargando Swagger...");
const options = new DocumentBuilder()
    .setTitle('Back de e-commerce Javier Plata')
    .setDescription('Esta es la api para el e-commerce de javier plata')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.development || 3000;
  await app.listen(3000);
  console.log(`Listening on http://localhost:3000`);
}
bootstrap();
