import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const allowedOrigins = configService
    .get<string>('ALLOWED_ORIGINS')
    .split(',');
  app.enableCors({
    origin: allowedOrigins,
  });

  const config = new DocumentBuilder()
    .setTitle('OCCU Test Assessment')
    .setDescription('The OCCU Assessment API description')
    .setVersion('1.0')
    .addTag('OCCU')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
