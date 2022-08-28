import { UserWordType } from "../types/type";

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
  const res: UserWordType = {
    "optional": {
      "isNew": "false",
      "countRightAnswers": type === 'right' ? "1" : "0",
    "game": {
      [game]: type === 'right' ? {"right": "1"} : {"wrong": "1"}
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
      data.optional!.countRightAnswers = String(Number(countRightAnswers) - 1);
    }
  }
  data.optional!.game![game]![type] ? data.optional!.game![game]![type] = String(Number(data.optional!.game![game]![type]) + 1) : data.optional!.game![game]![type] = '1';
  return data;
}
const ExempleStat = {
  learnedWords: '0',
  optional: {
    wordStatistics: {
      countNewWords: {
        '2022.8.21': '2',
        '2022.8.22': '7',
        '2022.8.23': '6',
        '2022.8.24': '9',
        '2022.8.25': '12',
      },
      countLearnedWords: {
        '2022.8.21': '2',
        '2022.8.22': '3',
        '2022.8.23': '4',
        '2022.8.24': '3',
        '2022.8.25': '5',
      }
    },
    gamesStatistics: {
      audioChallenge: {
        lastChanged: '2022.8.26',
        countNewWords: '12',
        right: '4',
        wrong: '3',
        longestSeries: '5',
      },
      sprint: {
        lastChanged: '2022.8.26',
        countNewWords: '5',
        right: '6',
        wrong: '2',
        longestSeries: '10',
      }
    }
  }
}

export const initialStatistics = {
  "learnedWords": 0,
  "optional": {
      "wordStatistics": {
          "countNewWords": null,
          "countLearnedWords": null
      },
      "gamesStatistics": {
          "audioChallenge": {
              "lastChanged": null,
              "countNewWords": null,
              "right": null,
              "wrong": null,
              "longestSeries": null
          },
          "sprint": {
              "lastChanged": null,
              "countNewWords": null,
              "right": null,
              "wrong": null,
              "longestSeries": null
          }
      }
  }
}