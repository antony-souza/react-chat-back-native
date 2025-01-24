import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environmentDev } from './environment/environment.dev';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Application');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(environmentDev.port);

  logger.debug(`Application is running on: ${environmentDev.port}`);
}
bootstrap().catch(console.error);
