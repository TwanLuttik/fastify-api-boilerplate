import 'module-alias/register';
import './config';

import chalk from 'chalk';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { env } from './server';
import { registerRoutes } from './routes';

// Plugins
import Cors from 'fastify-cors';

export const fast: FastifyInstance = fastify({ trustProxy: true });

(async function () {
	// Register the routes
	registerRoutes();

	// Customized logger
	fast.addHook('onSend', (req: FastifyRequest, res: FastifyReply, payload, next) => {
		next();
		if (req.method === 'OPTIONS') return;

		const date = chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`);
		const method = chalk.green(`[${req.method}]`);

		let message = `${date} ${method} ${req.url} ${chalk.gray(`> ${req.ip}`)}`;
		console.log(message);
	});

	fast.register(Cors, {
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		origin: true,
	});

	fast.listen(8080, '0.0.0.0', (err, address) => {
		if (err) throw err;
		else
			console.log(
				chalk.green`\n--------------------------\n${env.IS_PRODUCTION ? chalk.yellow('RUNNING IN PRODUCTION') : ''}\nServer running. ${address}`
			);
	});
})();
