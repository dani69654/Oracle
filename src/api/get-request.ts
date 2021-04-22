import { fetch } from 'fetch-h2';

export class GetRequest {

  private baseUrl: string;
  private path: string;
  private jsonFormat: [];

  constructor (_baseUrl: string, _path: string, _jsonFormat: []) {
    this.baseUrl = _baseUrl;
    this.path = _path;
    this.jsonFormat = _jsonFormat;
  }

  /**
   * New get request.
   * 
   */
  public async get() {
    try{
      const response = await fetch(`${this.baseUrl}${this.path}`,
    {
      method: 'GET'
    });
    let data = await response.json();
      if(this.jsonFormat) {
        for(let i = 0; i < this.jsonFormat.length; i++) {
          if(data.hasOwnProperty(this.jsonFormat[i])) {
            data = data[this.jsonFormat[i]];
          } else {
            throw('failed fetch data')
          }
        }
      }
    if(data !== undefined) return data;
    } catch (error) {
      throw ('error endpoint')
    }
  }
}