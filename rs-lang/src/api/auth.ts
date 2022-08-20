import { AxiosResponse } from "axios";
import { DataForRegistration, LoginResponseType, RegistrationResponseType } from "../types/type";
import instance from "./api";


export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<LoginResponseType>> {
    return instance.post<LoginResponseType>('signin', { email, password });
  }

  static async registration(name: string, email: string, password: string): Promise<AxiosResponse<RegistrationResponseType>> {
    return instance.post<RegistrationResponseType>('users', { email, password, name });
  }

  static async getUser(id: string): Promise<AxiosResponse<DataForRegistration>> {
    return instance.get<DataForRegistration>(`users/${id}`);
  }

  static async updateToken(id: string): Promise<AxiosResponse<LoginResponseType>> {
    return instance.get<LoginResponseType>(`users/${id}/tokens`);
  }

}