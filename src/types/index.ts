import { FastifyRequest } from 'fastify';

export type PermissionsType = 'SESSION';

export interface CustomRequest<T> extends FastifyRequest<T> {}
