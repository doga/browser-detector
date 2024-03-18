class Browser {
  /** @type {{userAgentString:string, systemInfo:string[], platform:{name:string, version:string, details:(string|undefined)}, extensions:[{name:string, version:string}]}} */
  #info;

  /**
   * @param {{userAgentString:string, systemInfo:string[], platform:{name:string, version:string, details:(string|undefined)}, extensions:[{name:string, version:string}]}} arg 
   **/
  constructor(arg){
    this.#info = arg;
  }

  /** @returns {string} */
  get deviceType() {return this.#info.systemInfo[0];}

  /** @returns {string[]} */
  get systemInfo() {return this.#info.systemInfo;} 

  /** @returns {string} */
  get platformName() {return this.#info.platform.name;}

  /** @returns {string} */
  get platformVersion() {return this.#info.platform.version;}

  /** @returns {string} */
  get platformDetails() {return this.#info.platform.details;}

  /** @returns {([{name:string, version:string}])} */
  get extensions() {return this.#info.extensions;}
  
  /** @returns {string} */
  toString(){return this.#info.userAgentString;}
}


// Desktop browsers that have extension support /////////////////////////////////////////
class ChromiumDesktop extends Browser{
  constructor(arg){
    super(arg);
  }
}

class EdgeDesktop extends Browser{
  constructor(arg){
    super(arg);
  }
}

class OperaDesktop extends Browser{
  constructor(arg){
    super(arg);
  }
}

class FirefoxDesktop extends Browser{
  constructor(arg){
    super(arg);
  }
}

class SafariDesktop extends Browser{
  constructor(arg){
    super(arg);
  }
}


// Mobile browsers that have extension support /////////////////////////////////////////
class FirefoxAndroid extends Browser{
  constructor(arg){
    super(arg);
  }
}

class KiwiAndroid extends Browser{
  constructor(arg){
    super(arg);
  }
}

class SafariMobile extends Browser{
  constructor(arg){
    super(arg);
  }
}


// Detector /////////////////////////////////////////

/*
Some user agents on macOS:
- ⚠️ Brave: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
- ⚠️ Chrome: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
- ⚠️ Vivaldi: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
- Firefox: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
- Opera: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 OPR/91.0.4516.65
- Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15
- Microsoft Edge: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0
*/

/*
Some user agents on iPhone:
- Brave: Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1
- Chrome: Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1
- Firefox: Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/123.4  Mobile/15E148 Safari/605.1.15
- Opera: Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.8 Mobile/15E148 Safari/604.1 OPT/4.6.0
- Safari: Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.6 Mobile/15E148 Safari/604.1
- Microsoft Edge: Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/122.0.2365.86 Version/15.0 Mobile/15E148 Safari/604.1
*/

/*
Some user agents on iPad (iPadOS 16.2):
- Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 10 15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15
*/

const regex = {
  // User agent string. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
  // Debugged with https://regexr.com/
  userAgent  : /^\s*(?<mozilla5>\S+)\s+\((?<systemInfo>[^)]+)\)\s+(?<platformName>[^/]+)\/(?<platformVersion>\S+)(\s+\((?<platformDetails>[^)]+)\))?(?<extensions>.*)$/, 

  desktop    : /Windows|Mac|X11|Wayland/i, // X11|Wayland means Linux
  android    : /Android/i,
  appleMobile: /iPhone|iPad/i,
};

/**
 * Infers a web browser's type from its User-Agent header.
 * @param {string} userAgentString - The User-Agent header value in an HTTP(S) request.
 * @returns {(Browser | null)}
 */
function detectBrowser(userAgentString){
  if(!(typeof userAgentString === 'string'))return null;

  try {
    const match = userAgentString.match(regex.userAgent);
    if(!match)return null;

    const
    systemInfo = match.groups.systemInfo.trim().replaceAll(/\s+/g, ' ').split(';').map(item => item.trim()),
    deviceType = systemInfo[0],
    platform   = 
      {
        name   : match.groups.platformName,
        version: match.groups.platformVersion,
        details: match.groups.platformDetails
      },
    extensions = 
      match.groups.extensions.trim().replaceAll(/\s+/g, ' ').split(' ')
      .map(extension => extension.split('/'))
      .map(extension => ({name: extension[0], version: extension[1]})),
    hasExtension = name => extensions.find(ext => ext.name === name),
    arg = 
      {
        userAgentString,
        systemInfo,
        platform,
        extensions
      };

    // console.debug(`systemInfo: ${JSON.stringify(systemInfo)}`);
    // console.debug(`platform: ${JSON.stringify(platform)}`);
    // console.debug(`extensions: ${JSON.stringify(extensions)}`);

    if (deviceType.match(regex.desktop)) {
      if (hasExtension('Firefox')) return new FirefoxDesktop(arg);
      if (hasExtension('OPR')) return new OperaDesktop(arg);
      if (hasExtension('Edg')) return new EdgeDesktop(arg);
      if (hasExtension('Chrome')) return new ChromiumDesktop(arg);
      if (hasExtension('Safari')) return new SafariDesktop(arg);
    } else if(deviceType.match(regex.android) || hasExtension('Kiwi')) {
      if (hasExtension('Firefox')) return new FirefoxAndroid(arg);
      // Kiwi is Android-only but it has got systemInfo wrong.
      // 1st systemInfo item (deviceType) should be Android not Linux.
      // See: https://user-agents.net/browsers/kiwi (TODO verify these UA strings)
      if (hasExtension('Kiwi')) return new KiwiAndroid(arg); 
    } else if(deviceType.match(regex.appleMobile)) {
      if (
        hasExtension('Safari') && !['CriOS', 'FxiOS', 'EdgiOS', 'OPT'].find(ext => hasExtension(ext))
      ) return new SafariMobile(arg); // Warning: actual browser may be another browser such as Brave (which doesn't support extensions!!!)
    }
    return new Browser(arg);
  } catch (error) {
    console.error(error);
    return null;
  }
}


export {
  detectBrowser,
  Browser, 
  ChromiumDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  FirefoxAndroid, KiwiAndroid,
  SafariMobile
};
