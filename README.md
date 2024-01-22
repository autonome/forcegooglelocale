# forcegooglelocale

Firefox extension that forces the locale of Google sites through the URL

## Version 1.1

Thanks @jomo for this contribution:

- Dashed language codes are accepted, e.g. `["en-US", "fr"]` will use `en`
  - It also falls back to using the UI language if no usable `Accept-Language` is found
- Requests are limited to `http`/`https`
- Proper URL handling
  - Extension triggers if 2nd or 3rd domain label is `google` or `youtube` (e.g. `google.com`, `google.co.uk`). Other Google domains exist, including `*.google` and `*.goog`, but AFAIK `hl` is not used on any of those.
  - `hl` parameter insertion now works reliably (e.g. https://groups.google.com/forum/#!overview)
