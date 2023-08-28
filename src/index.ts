import 'module-alias/register';

// Load the config first
import './config';

import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { env } from './server';
import { registerRoutes } from './routes';
import { registerPlugins } from './utils/FastPlugins';

import colors from 'colors';

export const fast: FastifyInstance = fastify({ trustProxy: true });

(async function () {
	// register plugins
	await registerPlugins();

	// Register the routes
	await registerRoutes();

	// Customized logger
	fast.addHook('onSend', (req: FastifyRequest<any>, res: FastifyReply<any>, payload, next) => {
		next();
		if (req.method === 'OPTIONS') return;

		const message = `${colors.dim(`[${new Date().toTimeString().split(' ')[0]}]`)} ${colors.green(`[${req.method}]`)} ${colors.yellow(
			`[${res.statusCode}]`
		)} ${colors.blue('[' + res.getResponseTime().toFixed(2) + 'ms]')} => ${colors.red(req.url)} ${colors.white(`> ${req.ip}`)}`;

		console.log(message);
	});

	fast.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
		if (err) throw err;
		else
			console.log(
				colors.green(
					`\n--------------------------\nServer running. ${address}${env.IS_PRODUCTION ? colors.green('\n\nPRODUCTION MODE ENABLED') : ''}`
				)
			);
	});
})();
