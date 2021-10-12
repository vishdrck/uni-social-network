enum Environments {
  LOCAL_WINDOWS = 'win',
  DEV_SERVER = 'dev',
  QA_SERVER = 'qa',
  PROD_SERVER = 'prod'
}
class ConstantsService {
  private readonly env: Environments;
  private readonly port = 2521;
  private readonly host = 'https://www.yaatter.xyz/';
  constructor(env: Environments) {
    this.env = env;
  }
  public getAPIUrl(): string {
    let url = `http://localhost:${this.port}/`;
    if(this.env === Environments.PROD_SERVER) {
        url = `${this.host}api/`;
    }
    return url;
  }

  public getWebUrl(endPoint: string | null = null): string {
    return this.host;
  }

  public getURL(endpoint: string | null = null): string {
    let url = this.getAPIUrl();
    if (endpoint) {
      url += endpoint;
    }
    return url;
  }
}

export default new ConstantsService(Environments.LOCAL_WINDOWS);
