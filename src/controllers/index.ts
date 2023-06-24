import { IRoute } from '@internal/server';
import { pingRoutes } from './ping';

export const AllServerRoutes: IRoute[] = [...pingRoutes];
