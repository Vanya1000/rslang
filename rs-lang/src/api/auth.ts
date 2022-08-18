import { AxiosResponse } from "axios";
import { LoginResponseType, RegistrationResponseType } from "../types/type";
import instance from "./api";


export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<LoginResponseType>> {
    return instance.post<LoginResponseType>('signin', { email, password });
  }

  static async registration(name: string, email: string, password: string): Promise<AxiosResponse<RegistrationResponseType>> {
    return instance.post<RegistrationResponseType>('users', { email, password, name });
  }

}