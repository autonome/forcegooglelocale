let langTag = 'en';

(async () => {
  let al = await browser.i18n.getAcceptLanguages();
  al.some(l => {
    if (l.length == 2) {
      langTag = l;
    }
  });
})();

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
