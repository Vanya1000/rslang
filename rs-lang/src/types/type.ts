export type userType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type WordType = {
  id: string;
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
}

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