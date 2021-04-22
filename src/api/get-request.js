const { fetch } = require('fetch-h2');

class GetRequest {

  constructor (_baseUrl, _path, _jsonFormat) {
    this.baseUrl = _baseUrl;
    this.path = _path;
    this.jsonFormat = _jsonFormat;
  }


  /**
   * New get request.
   * 
   */
  async get() {
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

module.exports = GetRequest;