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
  let url = new URL(e.url);
  const labels = url.hostname.split(".").reverse().slice(1, 3);
  if (!url.searchParams.has('hl') &&
    (labels.includes('google') || labels.includes('youtube'))) {
    url.searchParams.append('hl', langTag);
    return {
      redirectUrl: url.toString()
    };
  }
}

browser.webRequest.onBeforeSendHeaders.addListener(
  modifyRequest,
  {
    urls: ['http://*/*', 'https://*/*'],
    types: ['main_frame']
  },
  [ 'blocking' ]
);
