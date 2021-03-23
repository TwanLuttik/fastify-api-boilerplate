import { catchResponseHandler } from '@internal/logic';
import { CustomRequest, Permissions } from '@internal/server';
import { FastifyReply } from 'fastify';

export const hasPermission = async (
	req: CustomRequest<any>,
	res: FastifyReply<any>,
	permission: keyof typeof Permissions | 'SESSION'
): Promise<any> => {
	try {
		// PERMISSION LOGIC
	} catch (error) {
		return catchResponseHandler(res, error);
	}
};

interface ISession {
	account_id: bigint;
	permission: any;
}

const sessionCheck = async (req: CustomRequest<any>, res: FastifyReply<any>): Promise<ISession | (ISession & boolean)> => {
	try {
		// session logic
		return;
	} catch (error) {
		return catchResponseHandler(res, error);
	}
};
