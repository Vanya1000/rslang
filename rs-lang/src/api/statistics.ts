import { AxiosResponse } from 'axios';

import { StatisticsType } from '../types/type';

import instance from './api';

export default class StatisticsAPI {
  static async getStatistics(userId: string): Promise<AxiosResponse<StatisticsType>> {
    return instance.get<StatisticsType>(`users/${userId}/statistics`);
  }
  static async upsertStatistics(userId: string, payload: StatisticsType): Promise<AxiosResponse<StatisticsType>> {
    return instance.put<StatisticsType>(`users/${userId}/statistics`, payload);
  }
}