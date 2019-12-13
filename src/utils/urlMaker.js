export const makeUrlArray = () => {
  let urlArr = [];
  for (let i = 1; i <= 888; i++) {
    urlArr.push(
      `https://www.dhlottery.co.kr/gameResult.do?method=byWin&drwNo=${i}`
    );
  }
  return urlArr;
};
