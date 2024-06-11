import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  const config = new DocumentBuilder()
    .setTitle('Blog ')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addApiKey(
      {
        type: "apiKey",
        in: "header",
        name: "authorization"
      },
      "refresh-token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(5002);
}
bootstrap();
