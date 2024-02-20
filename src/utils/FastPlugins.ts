import Cors from '@fastify/cors';
import { fast } from '../index';
import { env } from '@internal/server';
import ServerStatic from '@fastify/static';
import path from 'node:path';

export const registerPlugins = async () => {
	await fast.register(Cors, {
		credentials: true,
		origin: env.IS_PRODUCTION ? ['http://some.web'] : true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	});

	// An easy way to mimic a CDN hosting like aws S3 bucket
	env.IS_PRODUCTION === false &&
		(await fast.register(ServerStatic, {
			root: path.resolve('.cache'),
			prefix: '/.cache',
		}));
};
