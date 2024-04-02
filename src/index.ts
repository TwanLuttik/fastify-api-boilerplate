// Load the config first
import './config';

import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { InitilizeConfig, env } from './server';
import { registerRoutes } from './routes';
import { registerPlugins } from './utils/FastPlugins';

import colors from 'colors';

export const fast: FastifyInstance = fastify({ trustProxy: true, logger: true });

export const initializeServer = async (incomingConfig?: InitilizeConfig) => {
	// register plugins
	await registerPlugins();

	// Register the routes
	await registerRoutes();

	fast.listen({ port: incomingConfig?.port || 8080, host: incomingConfig?.host || '0.0.0.0' }, (err, address) => {
		if (err) {
			throw err;
		} else
			console.log(
				colors.green(
					`\n--------------------------\nServer running. ${address}${env.IS_PRODUCTION ? colors.green('\n\nPRODUCTION MODE ENABLED') : ''}`
				)
			);
	});

	return true;
};

(function () {
	// prevent the initialization if we passed this flag
	if (process.argv.includes('--skipIndexStart')) return;

	initializeServer();
})();
