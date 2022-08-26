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

export const ExempleStat = {
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