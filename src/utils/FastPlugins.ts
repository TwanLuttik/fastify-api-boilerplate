import Cors from '@fastify/cors';
import { fast } from '../index';
import { env } from '@internal/server';

export const registerPlugins = async () => {
	await fast.register(Cors, {
		credentials: true,
		origin: env.IS_PRODUCTION ? ['http://some.web'] : true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	});
};
