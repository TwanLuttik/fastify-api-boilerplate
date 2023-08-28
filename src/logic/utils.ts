import { env } from '@internal/server';
import { FastifyReply } from 'fastify';

interface TrowErrorType {
	code?: number;
	message?: string;
	error?: any;
	data?: any;
}

export const catchResponseHandler = (res: FastifyReply<any>, error: TrowErrorType) => {
	console.log('[CatchResponseHandler]', error);

	// @ts-ignore
	if (error?.response?.status === 400) return customResponse(res, { code: 400, error: !env.IS_PRODUCTION && error });

	return res.code(400).send({
		success: false,
		message: error?.message,
		data: error?.data,
		error: error?.error ?? error[0],
	});
};

interface CustomResponseConfigType {
	success?: string;
	code?: number;
	data?: any;
	message?: string;
	error?: string;
	_headers?: any;
}

export const customResponse = async (res: FastifyReply<any>, config: CustomResponseConfigType): Promise<any> => {
	if (config.success) {
		return res.code(200).send({
			success: true,
			data: config.data || true,
			message: config.success,
		});
	}

	const is_error = !!config?.error || false;

	return res.code(config.code || (config.error && 400) || 200).send({
		success: is_error ? false : config.code !== 400,
		data: config.data !== undefined ? config.data : false,
		message: is_error ? config.error : config?.message,
	});
};
