var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createIsbot: () => createIsbot,
  createIsbotFromList: () => createIsbotFromList,
  isbot: () => isbot,
  isbotMatch: () => isbotMatch,
  isbotMatches: () => isbotMatches,
  isbotNaive: () => isbotNaive,
  isbotPattern: () => isbotPattern,
  isbotPatterns: () => isbotPatterns,
  list: () => list,
  pattern: () => pattern
});
module.exports = __toCommonJS(src_exports);

// src/pattern.ts
var fullPattern = " daum[ /]| deusu/| yadirectfetcher|(?:^| )site|(?:^|[^g])news|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bot(?:[^\\w]|_|$)|(?<! ya(?:yandex)?)search|(?<!(?:lib))http|(?<![hg]m)score|@[a-z]|\\(at\\)[a-z]|\\[at\\][a-z]|^12345|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(\\.\\d+)?(?:\\.\\d{1,10})?)?(?:,|$)|^[^ ]{50,}$|^active|^ad muncher|^amaya|^anglesharp/|^avsdevicesdk/|^bidtellect/|^biglotron|^bot|^btwebclient/|^clamav[ /]|^client/|^cobweb/|^coccoc|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^fdm[ /]\\d|^getright/|^gozilla/|^hatena|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^linkdex|^metauri|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^nuclei|^offline explorer|^php|^postman|^postrank|^python|^rank|^read|^reed|^rest|^serf|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^tumblr/|^user-agent:|^valid|^venus/fedoraplanet|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|adbeat\\.com|appinsights|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check|chrome-lighthouse|chromeframe|classifier|cloud|crawl|cryptoapi|dareboost|datanyze|dataprovider|dejaclick|dmbrowser|download|evc-batch/|feed|firephp|freesafeip|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|inspect|iplabel|ips-agent|java(?!;)|library|mail\\.ru/|manager|monitor|neustar wpm|nutch|offbyone|optimize|pageburst|parser|perl|phantom|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reader|reputation|resolver|retriever|rexx;|rigor|robot|rss|scan|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|stumbleupon\\.com|supercleaner|synapse|synthetic|torrent|trace|transcoder|twingly recon|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|wordpress|zgrab";
var regularExpression = / daum[ /]| deusu\/| yadirectfetcher|(?:^| )site|(?:^|[^g])news|(?<! (?:channel\/|google\/))google(?!(app|\/google| pixel))|(?<! cu)bot(?:[^\w]|_|$)|(?<! ya(?:yandex)?)search|(?<!(?:lib))http|(?<![hg]m)score|@[a-z]|\(at\)[a-z]|\[at\][a-z]|^12345|^<|^[\w \.\-\(?:\):]+(?:\/v?\d+(\.\d+)?(?:\.\d{1,10})?)?(?:,|$)|^[^ ]{50,}$|^active|^ad muncher|^amaya|^anglesharp\/|^avsdevicesdk\/|^bidtellect\/|^biglotron|^bot|^btwebclient\/|^clamav[ /]|^client\/|^cobweb\/|^coccoc|^custom|^ddg[_-]android|^discourse|^dispatch\/\d|^downcast\/|^duckduckgo|^facebook|^fdm[ /]\d|^getright\/|^gozilla\/|^hatena|^hobbit|^hotzonu|^hwcdn\/|^jeode\/|^jetty\/|^jigsaw|^linkdex|^metauri|^microsoft bits|^movabletype|^mozilla\/\d\.\d \(compatible;?\)$|^mozilla\/\d\.\d \w*$|^navermailapp|^netsurf|^nuclei|^offline explorer|^php|^postman|^postrank|^python|^rank|^read|^reed|^rest|^serf|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor\/|^tumblr\/|^user-agent:|^valid|^venus\/fedoraplanet|^w3c|^webbandit\/|^webcopier|^wget|^whatsapp|^xenu link sleuth|^yahoo|^yandex|^zdm\/\d|^zoom marketplace\/|^{{.*}}$|adbeat\.com|appinsights|archive|ask jeeves\/teoma|bit\.ly\/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check|chrome-lighthouse|chromeframe|classifier|cloud|crawl|cryptoapi|dareboost|datanyze|dataprovider|dejaclick|dmbrowser|download|evc-batch\/|feed|firephp|freesafeip|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|inspect|iplabel|ips-agent|java(?!;)|library|mail\.ru\/|manager|monitor|neustar wpm|nutch|offbyone|optimize|pageburst|parser|perl|phantom|pingdom|powermarks|preview|proxy|ptst[ /]\d|reader|reputation|resolver|retriever|rexx;|rigor|robot|rss|scan|scrape|server|sogou|sparkler\/|speedcurve|spider|splash|statuscake|stumbleupon\.com|supercleaner|synapse|synthetic|torrent|trace|transcoder|twingly recon|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms\/|wordpress|zgrab/i;

// src/patterns.json
var patterns_default = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "(?<! (?:channel/|google/))google(?!(app|/google| pixel))",
  "(?<! cu)bot(?:[^\\w]|_|$)",
  "(?<! ya(?:yandex)?)search",
  "(?<!(?:lib))http",
  "(?<![hg]m)score",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(\\.\\d+)?(?:\\.\\d{1,10})?)?(?:,|$)",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^avsdevicesdk/",
  "^bidtellect/",
  "^biglotron",
  "^bot",
  "^btwebclient/",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^nuclei",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^rank",
  "^read",
  "^reed",
  "^rest",
  "^serf",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "classifier",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "gomezagent",
  "headless",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "inspect",
  "iplabel",
  "ips-agent",
  "java(?!;)",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "parser",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "reputation",
  "resolver",
  "retriever",
  "rexx;",
  "rigor",
  "robot",
  "rss",
  "scan",
  "scrape",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "splash",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "torrent",
  "trace",
  "transcoder",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "whatcms/",
  "wordpress",
  "zgrab"
];

// src/index.ts
var naivePattern = /bot|spider|crawl|http|lighthouse/i;
var pattern = regularExpression;
var list = patterns_default;
var isbotNaive = (userAgent) => Boolean(userAgent) && naivePattern.test(userAgent);
var usedPattern;
function isbot(userAgent) {
  if (typeof usedPattern === "undefined") {
    try {
      usedPattern = new RegExp(fullPattern, "i");
    } catch (error) {
      usedPattern = naivePattern;
    }
  }
  return Boolean(userAgent) && usedPattern.test(userAgent);
}
var createIsbot = (customPattern) => (userAgent) => Boolean(userAgent) && customPattern.test(userAgent);
var createIsbotFromList = (list2) => {
  const pattern2 = new RegExp(list2.join("|"), "i");
  return (userAgent) => Boolean(userAgent) && pattern2.test(userAgent);
};
var isbotMatch = (userAgent) => userAgent?.match(pattern)?.[0] ?? null;
var isbotMatches = (userAgent) => list.map((part) => userAgent?.match(new RegExp(part, "i"))?.[0]).filter(Boolean);
var isbotPattern = (userAgent) => userAgent ? list.find((pattern2) => new RegExp(pattern2, "i").test(userAgent)) ?? null : null;
var isbotPatterns = (userAgent) => userAgent ? list.filter((pattern2) => new RegExp(pattern2, "i").test(userAgent)) : [];
