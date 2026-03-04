import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });

  const config = SwaggerModule.createDocument(app,new DocumentBuilder()
    .setTitle('Proximité')
    .build());

  SwaggerModule.setup('api/swagger', app, cleanupOpenApiDoc(config));

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 API en cours d'exécution sur : http://localhost:${port}`);
}
bootstrap();
