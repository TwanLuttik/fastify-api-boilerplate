import { IRoute } from '@internal/server';
import { ping } from './index';

export const GlobalServerRoutes = [
	// A non authenticated route
	{ method: 'GET', path: '/account', handler: ping.ping },

	// Authenticated route with the type USER, (in middleware.ts you can configure you auth logic)
	// { method: 'GET', path: '/account', handler: ping.ping, auth: 'USER },
] as IRoute[];
