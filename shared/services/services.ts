import { Service } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const getAll = async (): Promise<Service[]> => {
  return (await axiosInstance.get<Service[]>(ApiRoutes.SERVICES)).data;
};
