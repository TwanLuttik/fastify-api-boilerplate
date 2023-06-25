import { IRoute } from '@internal/server';
import { accountRoutes } from './account';

export const AllServerRoutes: IRoute[] = [...accountRoutes];
