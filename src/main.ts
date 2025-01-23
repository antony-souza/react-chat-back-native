import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environmentDev } from './environment/environment.dev';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Application');
  const app = await NestFactory.create(AppModule);
  await app.listen(environmentDev.port);
  logger.debug(`Application is running on: ${environmentDev.port}`);
}
bootstrap().catch(console.error);
