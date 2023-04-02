import { customResponse } from '@internal/logic';
import { CustomRequest } from '@internal/server';
import { FastifyReply } from 'fastify';

export const ping = async (req: CustomRequest<any>, res: FastifyReply<any>): Promise<any> => {
	customResponse(res, { data: true, message: 'pong' });
};
