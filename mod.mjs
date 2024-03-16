class Browser {
  #info;
  constructor(userAgentString, browserName, browserVersion, operatingSystem){
    this.#info = {
      userAgentString,
      browserName,
      browserVersion,
      operatingSystem,
      // isMobile
    };
  }
  get userAgentString() {return this.#info.userAgentString;}
  get browserName() {return this.#info.browserName;}
  get browserVersion() {return this.#info.browserVersion;}
  get operatingSystem() {return this.#info.operatingSystem;}
  // get isMobile() {return this.#info.isMobile;}
}

class ChromeDesktop extends Browser{
  constructor(userAgentString, browserName, browserVersion, operatingSystem){
    super(userAgentString, browserName, browserVersion, operatingSystem);
  }
}

class FirefoxAndroid extends Browser{
  constructor(userAgentString, browserName, browserVersion, operatingSystem){
    super(userAgentString, browserName, browserVersion, operatingSystem);
  }
}

class SafariMobile extends Browser{
  constructor(userAgentString, browserName, browserVersion, operatingSystem){
    super(userAgentString, browserName, browserVersion, operatingSystem);
  }
}

const userAgentRegex = /^\s*(?<product>\S+)\s+\((?<platform>[^;)]+(;[^;)]+)*)\).*\s+(?<browserName>[^/]+)\/(?<browserVersion>\S+)$/;

/**
 * Infers a web browser's type from its User-Agent header.
 * @param {string} userAgentString - The User-Agent header value in an HTTP(S) request.
 * @returns {(Browser | null)}
 */
function detectBrowser(userAgentString){
  if(!(typeof userAgentString === 'string'))return null;

  const match = userAgentString.match(userAgentRegex);
  if(!match)return null;

  const
  platform        = match.groups.platform.split(';').map(item => item.trim()),
  operatingSystem = platform[0],
  // isMobile        = !!platform.find(item => item.match(/mobile/i)),
  browserName     = match.groups.browserName,
  browserVersion  = match.groups.browserVersion;

  if (browserName === 'Chrome' && operatingSystem.match(/Windows|Mac|X11|Wayland/i)) { // X11|Wayland means Linux
    return new ChromeDesktop(userAgentString,browserName,browserVersion,operatingSystem);
  } else if (browserName === 'Firefox' && operatingSystem.match(/Android/i)) {
    return new FirefoxAndroid(userAgentString,browserName,browserVersion,operatingSystem);
  } else if (browserName === 'Safari' && operatingSystem.match(/iPhone|iPad/i)) {
    return new SafariMobile(userAgentString,browserName,browserVersion,operatingSystem);
  } else {
    return new Browser(userAgentString,browserName,browserVersion,operatingSystem);
  }

}



export {
  detectBrowser,
  Browser, ChromeDesktop, FirefoxAndroid, SafariMobile
};
