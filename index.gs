const accounts = [
  {
    ltoken_v2: "xxxxx",
    ltuid_v2: "xxxxx",
  },
];

const { fetch } = UrlFetchApp;

/**
 * @typedef {{data:any,message:string,retcode:number}} iJsonRes
 * @typedef {{ltoken_v2:string, ltuid_v2:string}} iAccount
 */

//set to true if you have the game account, set false to skip
const genshinBool = true;
const hsrBool = true;
const honkaiImpactBool = true;

const giUrl =
  "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481";
const hsrUrl =
  "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311";
const hiUrl =
  "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111";

const games = [
  {
    names: "genshin",
    url: giUrl,
    active: genshinBool,
  },
  {
    names: "Honkai Star Rail",
    url: hsrUrl,
    active: hsrBool,
  },
  {
    names: "Honkai Impact",
    url: hiUrl,
    active: honkaiImpactBool,
  },
];

/**
 * @param {string} url
 * @param {iAccount} account
 */
const hoyolabAutoLogin = (url, account) => {
  try {
    const res = fetch(url, {
      headers: {
        Cookie: `ltoken_v2=${account?.ltoken_v2}; ltuid_v2=${account?.ltuid_v2};`,
      },
      method: "POST",
    });

    /**
     * @type {iJsonRes}
     */
    const JsonRes = JSON.parse(res);
    console.log({ result: JsonRes.message });
  } catch (error) {}
};

const mainFunction = () => {
  accounts.forEach((account) => {
    games.forEach((game) => {
      if (game?.active) {
        console.log({ game });
        hoyolabAutoLogin(game?.url, account);
      }
    });
  });
};
