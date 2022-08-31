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

export type ResponseOneAggregatedWord = [
  {
  _id: string;
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
  wordId?: string;
  optional?: {
    countRightAnswers?: string;
    isNew?: string;
    game?: {
      audioChallenge?: {
        right?: string;
        wrong?: string;
      },
      sprint?: {
        right?: string;
        wrong?: string;
      }
    }
  }
}

export type CreateUserWordType = UserWordType & {
  id: string;
  wordId: string;
}

export type StatisticsType = {
  id?: string;
  learnedWords: number;
  optional: {
    wordStatistics: {
      countNewWords: {
        [key: string]: string;
      } | null,
      countLearnedWords: {
        [key: string]: string;
      } | null
    },
    gamesStatistics: {
      audioChallenge: {
        lastChanged: string | null;
        countNewWords: number | null;
        right: number | null;
        wrong: number | null;
        longestSeries: number | null;
      },
      sprint?: {
        lastChanged: string | null;
        countNewWords: number | null;
        right: number | null;
        wrong: number | null;
        longestSeries: number | null;
      },
    }
  }
}

export type AnswerStatusType = 'right' | 'wrong';

export type AnswerType = {
  wordId: string;
  status: AnswerStatusType;
}

export type GameType = 'sprint' | 'audioChallenge';
