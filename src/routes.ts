import { catchResponseHandler } from './logic';
import { fast } from './index';
import { hasPermission } from './middleware/middleware';
import { CustomRequest, Permissions } from './types/index';
import { test } from './controllers/';
import { FastifyReply } from 'fastify';

interface IRoute {
	path: string;
	method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
	auth?: keyof typeof Permissions | 'SESSION';
	handler?: (req: CustomRequest<any>, res: FastifyReply<any>) => void;
	prefix?: string;
}

const Routes: IRoute[] = [{ method: 'GET', path: '/test', handler: test.test }];

// Register all routes from the list
export const registerRoutes = async () => {
	// Register custom decortion => example: fast.decorateRequest('<name>', null);

	// loop through the list and register the routes
	for (let item of Routes) {
		fast.route({
			// check if we have a prefix otherwise we use the default prefix
			url: `${item.prefix ?? ''}${item.path}`,
			method: item.method,
			handler: async (req: any, res: any) => {
				try {
					return await item.handler(req, res);
				} catch (error) {
					return catchResponseHandler(res, error);
				}
			},

			// check if the route need permission for auth
			// We can't use next since we use async for the prehandler
			preHandler: async (req, res) => {
				if (!item.auth) return;
				return await hasPermission(req, res, item.auth);
			},
		});
	}

	return true;
};
