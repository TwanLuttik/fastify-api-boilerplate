import { FastifyRequest } from 'fastify';

export enum Permissions {}

export interface CustomRequest<T> extends FastifyRequest<T> {}
