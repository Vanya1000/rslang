export type userType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type WordType = {
  _id?: string;
  id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWordType;
}

export type ResponseWordTypeWithAuth = [
  {
    paginatedResults: WordType[];
    totalCount: [number];
  }
]

export type LoginResponseType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type RegistrationResponseType = {
  id: string;
  name: string;
  email: string;
}

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type DataForRegistration = {
  name: string;
  email: string;
  password: string;
}

export type SignInFormType = {
  email: string;
  password: string;
}

export type UpdateTokenType = {
  token: string;
  refreshToken: string;
}

export type UserWordType ={
  difficulty?: 'learned' | 'difficult' | 'none';
  id?: string;
  wordId?: string
  optional?: {
    game?: {
      audioCall?: {
        right?: number;
        wrong?: number;
      },
      sprint?: {
        right?: number;
        wrong?: number;
      }
    }
  }
}

export type CreateUserWordType = UserWordType & {
  id: string;
  wordId: string;
}