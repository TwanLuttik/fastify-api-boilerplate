import { customResponse } from '@internal/logic';
import { RouteArgs } from '@internal/server';

export const login = async ({ req, res }: RouteArgs): Promise<any> => {
	return customResponse(res, { message: 'ok' });
};
