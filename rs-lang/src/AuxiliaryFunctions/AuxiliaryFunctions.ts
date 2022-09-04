import { UserWordType } from '../types/type';

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
}

export const IncreaseStat = (data: Array<string>): Array<string> => {
  const result = data.reduce((acc, item) => {
    acc.res.push(String(Number(item) + acc.sum));
    acc.sum = acc.sum + Number(item);
    return acc;
  }, {
    res: [] as Array<string>,
    sum: 0
  })
  return result.res;
}

export const createUserWordData = (game: 'audioChallenge' | 'sprint', type: 'right' | 'wrong', data: UserWordType = {}) => {
  const secondGame = game === 'audioChallenge' ? 'sprint' : 'audioChallenge';
  const res: UserWordType = {
    'optional': {
      'isNew': 'false',
      'countRightAnswers': type === 'right' ? '1' : '0',
    'game': {
      [game]: type === 'right' ? {'right': '1'} : {'wrong': '1'},
      [secondGame]: {'right': null, 'wrong': null}
    }
    }}
    if (data.difficulty === 'learned' && type === 'wrong') {
      res.difficulty = 'none';
    }
    return res;
  }

export const calculateUserWordData = (game: 'audioChallenge' | 'sprint', type: 'right' | 'wrong', data: UserWordType) => {
  const countRightAnswers = data.optional?.countRightAnswers;
  const difficulty = data.difficulty;
  if (type === 'right') {
    if ((countRightAnswers === '2' && difficulty === 'none') 
    || (countRightAnswers === '2' && difficulty === undefined) 
    || (countRightAnswers === '4' && difficulty === 'difficult')) {
      data.difficulty = 'learned'; 
    }
  countRightAnswers ? data.optional!.countRightAnswers = String(Number(countRightAnswers) + 1) : data.optional!.countRightAnswers = '1';
  } else {
    if (difficulty === 'learned') {
      data.difficulty = 'none';
    }
    if (countRightAnswers) {
      if (Number(countRightAnswers) > 0) {
        data.optional!.countRightAnswers = String(Number(countRightAnswers) - 1);
      }
    }
  }
  data.optional?.game?.[game]?.[type] ? data.optional.game[game]![type] = String(Number(data.optional!.game![game]![type]) + 1) : data.optional!.game![game]![type] = '1';
  return data;
}

export const initialStatistics = {
  'learnedWords': 0,
  'optional': {
      'wordStatistics': {
          'countNewWords': null,
          'countLearnedWords': null
      },
      'gamesStatistics': {
          'audioChallenge': {
              'lastChanged': null,
              'countNewWords': null,
              'right': null,
              'wrong': null,
              'longestSeries': null
          },
          'sprint': {
              'lastChanged': null,
              'countNewWords': null,
              'right': null,
              'wrong': null,
              'longestSeries': null
          }
      }
  }
}

export const dataPayload: UserWordType = {
  'difficulty': 'difficult',
  'optional': {
    'countRightAnswers': '0'
  }
}