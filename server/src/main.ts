import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const OPTIONS = {
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(OPTIONS);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
