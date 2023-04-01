import Cors from '@fastify/cors';
import { fast } from '../index';

fast.register(Cors, {
	credentials: true,
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	origin: true
});