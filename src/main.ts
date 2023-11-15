/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { onRequest } from 'firebase-functions/v2/https';

async function bootstrap(expressInstance: express.Express) {
	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(expressInstance)
	);

	app.enableCors();

	await app.init();
	return app;
}

const server: express.Express = express();
bootstrap(server);

export const testApi = onRequest({ cors: true, cpu: 4, memory: '16GiB', timeoutSeconds: 3600 }, server);

