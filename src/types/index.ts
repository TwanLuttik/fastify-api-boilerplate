import { FastifyRequest } from 'fastify';

export enum Permissions {
	ADMIN,
}

export interface CustomRequest<T> extends FastifyRequest<T> {
	
}
