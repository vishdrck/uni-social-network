enum Environments {
  LOCAL_WINDOWS = 'win',
  DEV_SERVER = 'dev',
  QA_SERVER = 'qa',
  PROD_SERVER = 'prod'
}

enum HostedPath {
  LOCAL_WINDOWS = './log',
  DEV_SERVER = '/var/www/dev.yatter.xyz/api/log',
  QA_SERVER = '/var/www/qa.yatter.xyz/api/log',
  PROD_SERVER = '/var/www/yatter.xyz/api/log'
}

class Environment {
  private environment: string;
  private debugMode = false;

  constructor(environment: string, mode: boolean) {
    this.environment = environment;
    this.debugMode = mode;
  }

  /**
   *
   * @returns API log path
   */
  getAPILogPath(): string|null {
    let path = null;
    if (this.environment === Environments.LOCAL_WINDOWS) {
      path = HostedPath.LOCAL_WINDOWS;
    }
    if (this.environment === Environments.DEV_SERVER) {
      path = HostedPath.DEV_SERVER;
    }
    if (this.environment === Environments.QA_SERVER) {
      path = HostedPath.QA_SERVER;
    }
    if (this.environment === Environments.PROD_SERVER) {
      path = HostedPath.PROD_SERVER;
    }
    return path;
  }

  /**
   *
   * @returns port number
   */
  getPort(): number {
    return 2521;
  }

  /**
   *
   * @returns Database name
   */
  getDBName(): string {
    let dbName = 'db_yatter_local';
    if (this.environment === Environments.DEV_SERVER) {
      dbName = 'db_yatter_dev';
    }
    if (this.environment === Environments.QA_SERVER) {
      dbName = 'db_yatter_qa';
    }
    if (this.environment === Environments.PROD_SERVER) {
      dbName = 'db_yatter_prod';
    }
    return dbName;
  }

  getDebugMode() {
    return this.debugMode;
  }

  /**
   *
   * @param path Optional: Router path of the url
   * @returns Full site url with given path
   */
  getUrl(path: string = ''): string {
    let siteName = 'http://localhost:4200/';
    if (this.environment === Environments.DEV_SERVER) {
      siteName = 'https://dev.yatter.xyz/';
    }
    if (this.environment === Environments.QA_SERVER) {
      siteName = 'https://qa.yatter.xyz/';
    }
    if (this.environment === Environments.PROD_SERVER) {
      siteName = 'https://yatter.xyz/';
    }
    return (siteName + path);
  }

  getIamUrl(prefix: string): string {
    return `http://localhost:2520/${prefix}`;
  }
}

export default new Environment(Environments.PROD_SERVER,false);
