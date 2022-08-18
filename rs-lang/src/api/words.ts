import { AxiosResponse } from 'axios';
import { WordType } from "../types/type";
import instance from "./api";



export default class wordsAPI {
  static async getWords(group: number, page: number): Promise<AxiosResponse<WordType[]>> {
    return instance.get<WordType[]>(`words?group=${group}&page=${page}&wordsPerPage=20`);
  }

  static async getWordsByGroup(id: string): Promise<AxiosResponse<WordType>> {
    return instance.get<WordType>(`words/${id}`);
  }
}