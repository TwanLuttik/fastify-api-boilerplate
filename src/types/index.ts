import { FastifyReply, FastifyRequest } from 'fastify';

export type IRoutePermission = 'USER';

export interface RouteArgs {
	req: CustomRequest;
	res: FastifyReply<any>;
}

export interface CustomRequest extends FastifyRequest {
	[x: string]: any;
	body: any;
	params: any;
	query: any;
	// Add custom fields to the request to able to access
}

export interface IRoute {
	path: string;
	method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';
	auth?: IRoutePermission;
	handler?: (e: RouteArgs) => Promise<void>;
	prefix?: string;
}

export interface InitilizeConfig {
	port?: number;
	host?: string;
}
