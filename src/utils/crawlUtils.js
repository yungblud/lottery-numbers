import axios from "axios";
import { load } from "cheerio";

export const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (e) {
    console.log(e);
  }
};

export const crawl = html => {
  try {
    const $ = load(html);
    const winNumbers = $("div.num.win")
      .children("p")
      .children("span.ball_645.lrg")
      .toArray()
      .map(value => {
        return value.firstChild.data;
      });

    const bonusNumbers = $("div.num.bonus")
      .children("p")
      .children("span.ball_645.lrg")
      .toArray()
      .map(value => {
        return value.firstChild.data;
      });
    return {
      winNumbers,
      bonusNumbers
    };
  } catch (e) {
    console.log(e);
  }
};
