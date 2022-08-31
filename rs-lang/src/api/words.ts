import { AxiosResponse } from 'axios';
import { CreateUserWordType, ResponseOneAggregatedWord, ResponseWordTypeWithAuth, UserWordType, WordType } from '../types/type';
import instance from './api';



export default class wordsAPI {
  static async getWordsNoAuth(group: number, page: number): Promise<AxiosResponse<WordType[]>> {
    return instance.get<WordType[]>(`words?group=${group}&page=${page}&wordsPerPage=20`);
  }

  static async getWordsAuth(group: number, page: number, id: string): Promise<AxiosResponse<ResponseWordTypeWithAuth>> {
    return instance.get<ResponseWordTypeWithAuth>(`users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`);
  }

  static async getHardWords(id: string): Promise<AxiosResponse<ResponseWordTypeWithAuth>> {
    const hardWords = {'userWord.difficulty':'difficult'};
    return instance.get<ResponseWordTypeWithAuth>(`users/${id}/aggregatedWords?&wordsPerPage=999`, {
      params: {filter: hardWords},
    });
  }

  static async createUserWord(userId: string, wordId: string, payload: UserWordType): Promise<AxiosResponse<CreateUserWordType>> {
    return instance.post<CreateUserWordType>(`users/${userId}/words/${wordId}`, payload);
  }

  static async updateExistUserWord(userId: string, wordId: string, payload: UserWordType): Promise<AxiosResponse<CreateUserWordType>> {
    return instance.put<CreateUserWordType>(`users/${userId}/words/${wordId}`, payload);
  }

  static async getWordsByGroup(id: string): Promise<AxiosResponse<WordType>> {
    return instance.get<WordType>(`words/${id}`);
  }

  static async getUserWordById(userId: string, wordId: string): Promise<AxiosResponse<ResponseOneAggregatedWord>> {
    return instance.get<ResponseOneAggregatedWord>(`users/${userId}/aggregatedWords/${wordId}`);
  }
}