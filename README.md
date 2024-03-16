# browser-detector

JavaScript library for server-side browser type detection.

## Usage example

```shell
$ deno
Deno 1.41.3
exit using ctrl+d, ctrl+c, or close()
REPL is running with all permissions allowed.
To specify permissions, run `deno repl` with allow flags.
> import { detectBrowser, Browser, ChromeDesktop, FirefoxAndroid, SafariMobile } from "https://esm.sh/gh/doga/browser-detector@0.1.0/mod.mjs";
undefined
> detectBrowser('Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1')
u {}
> let b = detectBrowser('Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1')
undefined
> b.browserName
"Safari"
> b instanceof SafariMobile
true
>
```

∎
