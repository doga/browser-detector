# browser-detector

JavaScript library for browser type detection. Works both in-browser or server-side (Deno etc).

Produces marginally better results in the browser, because it then has access to other means than only the browser's User-Agent identifier string for detection.

If the browser being identified supports extensions, then `detectBrowser` will return an instance of a subclass of `Browser`.

Otherwise `detectBrowser` will return an instance of `Browser`.

## Usage example

_Tip: Run the examples below by typing this in your terminal (requires Deno):_

```shell
deno run \
  --allow-net --allow-run --allow-env --allow-read \
  https://deno.land/x/mdrb@2.0.0/mod.ts \
  --dax=false --mode=isolated \
  https://raw.githubusercontent.com/doga/browser-detector/master/README.md
```

<details data-mdrb>
<summary>Example: Infer the browser type from a User-Agent string.</summary>

<pre>
description = '''
Running this example is safe, it will not read or write anything to your filesystem.
'''
</pre>
</details>

```javascript
import {
  detectBrowser,
  Browser, 
  ChromeDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  VivaldiDesktop, WaveboxDesktop, ArcDesktop, BraveDesktop,
  FirefoxAndroid, KiwiAndroid,
  SafariMobile
} from 'https://esm.sh/gh/doga/browser-detector@0.3.0/mod.mjs';

const
userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
browsers  = detectBrowser(userAgent),
browser   = browsers.find(browser => browser instanceof FirefoxDesktop);

console.info(`Number of matched browsers:     ${browsers.length}`);
console.info(`Browser matches FirefoxDesktop: ${!!browser}\n`);
if(browser){
  console.info(`User agent string: ${browser}`);
  console.info(`Device type:       ${browser.deviceType}`);
  console.info(`System info:       ${browser.systemInfo}`);
  console.info(`Platform name:     ${browser.platformName}`);
  console.info(`Platform version:  ${browser.platformVersion}`);
  console.info(`Platform details:  ${browser.platformDetails}`);
  console.info(`Extensions:        ${JSON.stringify(browser.extensions)}`);
}
```

Sample output for the code above:

```text
Number of matched browsers:     1
Browser matches FirefoxDesktop: true

User agent string: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Device type:       Macintosh
System info:       Macintosh,Intel Mac OS X 10.15,rv:121.0
Platform name:     Gecko
Platform version:  20100101
Platform details:  undefined
Extensions:        [{"name":"Firefox","version":"121.0"}]
```

∎
