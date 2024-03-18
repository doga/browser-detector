# browser-detector

JavaScript library for browser type detection. Works both in-browser or server-side (Deno etc).

Produces marginally better results in the browser, because it then has access to other means than only the browser's User-Agent identifier string for detection.

If the browser being identified supports extensions, then `detectBrowser` will return an instance of a subclass of `Browser`.

Otherwise `detectBrowser` will return an instance of `Browser`.

## Usage example

```shell
$ deno
Deno 1.41.3
exit using ctrl+d, ctrl+c, or close()
REPL is running with all permissions allowed.
To specify permissions, run `deno repl` with allow flags.
> import {
  detectBrowser,
  Browser,
  ChromiumDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  FirefoxAndroid, SafariMobile
} from 'https://esm.sh/gh/doga/browser-detector@0.2.2/mod.mjs';
undefined
> const
  ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
  browser = detectBrowser(ua);
undefined
> browser instanceof FirefoxDesktop
true
> browser.deviceType
"Macintosh"
> browser.systemInfo
[ "Macintosh", "Intel Mac OS X 10.15", "rv:121.0" ]
> browser.platformName
"Gecko"
> browser.platformVersion
"20100101"
> browser.platformDetails
undefined
> browser.extensions
[ { name: "Firefox", version: "121.0" } ]
> browser.toString()
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0"
>
```

∎
