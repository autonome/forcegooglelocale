let langTag = getLang(browser.i18n.getUILanguage()) || 'en';
setLang();

async function setLang() {
  let al = await browser.i18n.getAcceptLanguages();
  al.some(l => {
    if (lang = getLang(l)) {
      return langTag = lang;
    }
  });
}

function getLang(languageCode) {
  if (languageCode) {
    const lang = languageCode.split('-')[0];
    if (lang.length === 2) {
      return lang;
    }
  }
}

function modifyRequest(e) {
  if (e.url.indexOf('google.') != -1 &&
      e.url.indexOf('hl=' + langTag) == -1) {
    e.url += (e.url.indexOf('?') != -1 ? '&' : '?') + 'hl=' + langTag;

    return {
      redirectUrl: e.url
    };
  }
}

browser.webRequest.onBeforeSendHeaders.addListener(
  modifyRequest,
  {
    urls: ['<all_urls>'],
    types: ['main_frame']
  },
  [ 'blocking' ]
);
