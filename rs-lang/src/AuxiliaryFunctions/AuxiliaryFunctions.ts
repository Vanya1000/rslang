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