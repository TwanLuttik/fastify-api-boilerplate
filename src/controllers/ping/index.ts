import { IRoute } from '@internal/server';
import * as ping from './ping.controller';

export const pingRoutes: IRoute[] = [{ method: 'POST', path: '/me', handler: ping.ping, auth: 'USER' }];
