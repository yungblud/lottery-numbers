import "@babel/polyfill";
import { getHtml, crawl } from "./utils/crawlUtils";
import { makeUrlArray } from "./utils/urlMaker";

const main = async () => {
  let wins = {};
  let bonuses = {};
  try {
    const urls = makeUrlArray();

    for (let i = 0; i < urls.length; i++) {
      console.log("loading.... the url = ", urls[i]);
      const url = urls[i];
      const result = await getHtml(url);

      if (result.data) {
        const html = result.data;
        const { winNumbers, bonusNumbers } = crawl(html);
        winNumbers.forEach(number => {
          if (wins.hasOwnProperty(`${number}`)) {
            wins[`${number}`] += 1;
          } else {
            wins[`${number}`] = 1;
          }
        });
        bonusNumbers.forEach(number => {
          if (bonuses.hasOwnProperty(`${number}`)) {
            bonuses[`${number}`] += 1;
          } else {
            bonuses[`${number}`] = 1;
          }
        });
      }
    }

    let sortableWins = [];
    for (let winNumber in wins) {
      sortableWins.push([`${winNumber}`, wins[`${winNumber}`]]);
    }
    sortableWins.sort((a, b) => {
      return a[1] - b[1];
    });
    sortableWins = sortableWins.reverse();
    console.log("wins---------------------");
    for (let i = 0; i < 6; i++) {
      console.log(sortableWins[i]);
    }

    let sortableBonuses = [];
    for (let bonusNumber in bonuses) {
      sortableBonuses.push([`${bonusNumber}`, bonuses[`${bonusNumber}`]]);
    }
    sortableBonuses.sort((a, b) => {
      return a[1] - b[1];
    });
    sortableBonuses = sortableBonuses.reverse();
    console.log("bonuses---------------------");
    for (let i = 0; i < 1; i++) {
      console.log(sortableBonuses[i]);
    }
  } catch (e) {
    console.log(e);
  }
};

main();
