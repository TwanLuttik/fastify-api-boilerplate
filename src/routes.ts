import { fast } from './index';
import { permissionsHandler } from './middleware/middleware';
import { catchResponseHandler } from './logic';
import { IRoutePermission, RouteArgs } from './types';
import { GlobalServerRoutes } from './controllers/routes';

export interface IRoute {
	path: string;
	method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';
	auth?: IRoutePermission;
	handler?: (e: RouteArgs) => Promise<void>;
	prefix?: string;
}

// Register all routes from the list
export const registerRoutes = async () => {
	// Register custom decoration => fast.decorateRequest('<key_name>', null);
	fast.decorateRequest('account', null);

	// loop through the list and register the routes
	for (let route of GlobalServerRoutes) {
		fast.route({
			// check if we have a prefix otherwise we use the default prefix
			url: `${route.prefix ?? ''}${route.path}`,
			method: route.method,
			handler: async (req: any, res: any) => {
				try {
					return await route.handler({ req, res });
				} catch (error) {
					return catchResponseHandler(res, error);
				}
			},

			// check if the route need permission for auth
			// We can't use next since we use async for the pre handler
			preHandler: async (req, res) => {
				// Rate Limiter
				if (!route.auth) return;
				return await permissionsHandler({ req, res }, route.auth);
			},
		});
	}

	return true;
};
