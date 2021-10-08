class ConstantsService {
  public getAPIUrl(): string {
    return 'http://localhost:2521/';
  }

  public getURL(endpoint: string | null = null): string {
    let url = this.getAPIUrl();
    if (endpoint) {
      url += endpoint;
    }
    return url;
  }
}

export default new ConstantsService();
