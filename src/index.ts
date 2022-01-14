import 'module-alias/register';
import './config';

import chalk from 'chalk';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { env } from './server';
import { registerRoutes } from './routes';

export const fast: FastifyInstance = fastify({ trustProxy: true });

// Plugins
require('./utils/FastPlugins');

// Register the routes
registerRoutes();

(async function () {
	// Customized logger
	fast.addHook('onSend', (req: FastifyRequest<any>, res: FastifyReply<any>, payload, next) => {
		next();
		if (req.method === 'OPTIONS') return;

		const message = `${chalk.dim(`[${new Date().toTimeString().split(' ')[0]}]`)} ${chalk.green(`[${req.method}]`)} ${chalk.yellow(
			`[${res.statusCode}]`
		)} ${chalk.blueBright('[' + res.getResponseTime().toFixed(2) + 'ms]')} => ${chalk.redBright(req.url)} ${chalk.white(`> ${req.ip}`)}`;
		console.log(message);
	});



	fast.listen(8080, '0.0.0.0', (err, address) => {
		if (err) throw err;
		else
			console.log(
				chalk.green`\n--------------------------\nServer running. ${address}${env.IS_PRODUCTION ? chalk.green('\n\nPRODUCTION MODE ENABLED') : ''}`
			);
	});
})();
