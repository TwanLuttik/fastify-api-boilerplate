import { customResponse } from '@internal/logic';
import { CustomRequest } from '@internal/server';
import { FastifyReply } from 'fastify';

export const test = async (req: CustomRequest<any>, res: FastifyReply<any>): Promise<any> => {
	customResponse(res, { message: 'test message'});
};
