import { customResponse } from '@internal/logic';
import { CustomRequest, RouteArgs } from '@internal/server';
import { FastifyReply } from 'fastify';

export const ping = async ({ req, res }: RouteArgs): Promise<any> => {
	return customResponse(res, { data: true, message: 'pong' });
};
