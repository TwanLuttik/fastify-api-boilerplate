import { catchResponseHandler } from '@internal/logic';
import { CustomRequest, IRoutePermission, RouteArgs } from '@internal/server';
import { FastifyReply } from 'fastify';

export const permissionsHandler = async ({ req, res }: RouteArgs, permission: IRoutePermission): Promise<any> => {
	try {
		// return if no perm needed for the route
		if (!permission) return;

		// session handler
		await authHandler({ req, res });
	} catch (error) {
		return catchResponseHandler(res, error);
	}
};

const authHandler = async ({ req, res }: RouteArgs): Promise<boolean> => {
	try {
		// handle auth logic

		return;
	} catch (error) {
		catchResponseHandler(res, error);
	}
};
