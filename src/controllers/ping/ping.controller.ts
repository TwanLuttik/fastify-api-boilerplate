import { customResponse } from '@internal/logic';
import { RouteArgs } from '@internal/server';

export const ping = async ({ req, res }: RouteArgs): Promise<any> => {
	return customResponse(res, { success: 'pong' });
};
