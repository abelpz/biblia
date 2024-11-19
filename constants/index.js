// Change this to the bible you want to use from Door43 and then run `npm run build` in the terminal
const BIBLE_DATA = {
  owner: "idiomaspuentes",
  languageCode: "xsu",
  bibleId: "tji"
};

// Door43 API
const SERVER_URL = "https://git.door43.org";
const API_VERSION = "v1";
const API_BASE_URL = `${SERVER_URL}/api/${API_VERSION}`;

module.exports = {
  BIBLE_DATA,
  SERVER_URL,
  API_VERSION,
  API_BASE_URL
};